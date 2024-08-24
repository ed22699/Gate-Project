import numpy as np
import argparse
import imutils
import time
import cv2
import os
¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬from PIL import Image
from picamera import PiCamera
from numberPlates import getPlate
import plateFormat

#defines camera name
camera = PiCamera()
# function crops the image using the coordinates of the bounding box found
# using this function means there is less image to search for the number plate helping the OCR

#-----------add back in when object recognition is reatrained 
# def cropping(x,y,w,h):
#     im = Image.open("vehicleWhole.jpeg")
#     im = im.crop((x, y, x+w, y+h)) #x,y,x+w,y+h
#     im.save("vehicle.jpeg")

# directs computer to the file where the object names are stored
# LABELS = open("yolo-coco/coco.names").read().strip().split("\n")
LABELS = open("darkflow-master/labels.txt").read().strip().split("\n")

# directs computer to the weights and config files
# weightsPath = "yolo-coco/yolov3.weights"
# configPath = "yolo-coco/yolov3.cfg"
weightsPath = "/home/pi/Desktop/gateProject/darkflow-master/darkflow/tiny-yolo-voc.weights"
configPath = "/home/pi/Desktop/gateProject/darkflow-master/cfg/tiny-yolo-voc-3c.cfg"

# loads the trained dataset
print("[INFO] loading YOLO from disk...")
net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)
ln = net.getLayerNames()
ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

# initializes camera -- not this will have to change when a raspberry camera is used
camera.capture('/home/pi/Desktop/image.jpg')


# this is a loop that keeps running till camera is turned off
while(True):
    cap = cv2.imread('/home/pi/Desktop/image.jpg')
#     ret, frame = cap.read()
    rgb = cv2.cvtColor(cap, cv2.COLOR_BGR2RGB)

    # sets the width and the hight of the frame to nothing
    (W, H) = (None, None)

    # read frame dimensions
    (height, width, _) = cap.shape

    # if the frame dimensions are empty, set the hight and width to those of the frame
    if W is None or H is None:
#         (H, W) = frame.shape[:2]
        H,W = height, width

    # construct a blob from the input frame and then perform a forward
    # pass of the YOLO object detector, giving the bounding boxes
    # and associated probabilities
    blob = cv2.dnn.blobFromImage(cap, 1 / 255.0, (416, 416),
        swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    end = time.time()

    # initialize our lists of detected bounding boxes, confidences,
    # and class IDs, respectively
    boxes = []
    confidences = []
    classIDs = []

    # loop over each of the layer outputs
    for output in layerOutputs:
        # loop over each of the detections
        for detection in output:
            # extract the class ID and confidence 
            # of the current object detection 
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            # filter out weak predictions by ensuring the detected
            # probability is greater than 0.6 certanty 
            if confidence > 0.9:
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                # use the center (x, y)-coordinates to derive the top
                # and and left corner of the bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                # update the list of bounding box coordinates,
                # confidences, and class IDs
                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)

    # apply non-maxima suppression to suppress weak, overlapping
    # bounding boxes, stopping multiple boxes from finding the same object
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, 0.6,
        0.3)

    # ensure at least one detection exists
    if len(idxs) > 0:
        # loop over the indexes we are keeping
        for i in idxs.flatten():
            # extract the bounding box coordinates
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])

            # set text as the name and certanty of the object found
            text = "{}: {:.4f}".format(LABELS[classIDs[i]],
                confidences[i])
            
            # detects if a vehicle is in the image,
            # saves that frame of the video as an image then uses the cropping funcion
            if "car" in text or "truck" in text or "motorbike" in text:
                print("vehicle present")
                cv2.imwrite("vehicleWhole.jpeg", cap)
                #finds the plate
                try:
                    plate = getPlate()
                    print(plate)
                    plateFormat.findAlternatives(plate)
                    # ----add link here to the formatting code------
                except:
                    print("no plate found")
                #cropping(x,y,w,h)   -----add back in when OR is retrained			    

    # this is the code which breakes the while loop 
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    
    cap = camera.capture('/home/pi/Desktop/image.jpg')
    print("next loop")

cap.release()
cv2.destroyAllWindows()
print("code finished")

##good hyperlink to fix frame rate problem quora.com/How-do-I-decrease-the-frames-per-second-in-OpenCV-python 
