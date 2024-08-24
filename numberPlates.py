def getPlate():
    import cv2
    from matplotlib import pyplot as plt
    import numpy as np
    import pytesseract
    import imutils
    from PIL import Image
    import re

    #gray scaling
    img = cv2.imread('vehicleWhole.jpeg')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    #edge detection
    bfilter = cv2.bilateralFilter(gray, 11, 17, 17) #noise reduction
    edged = cv2.Canny(bfilter, 30, 30) #edge detection

    #contour detection
    keypoints = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(keypoints)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

    #finding box
    location = None
    for contour in contours:
        approx = cv2.approxPolyDP(contour, 10, True)
        if len(approx) == 4:
            location = approx
            break

    #blocking out everything exept number plate
    mask = np.zeros(gray.shape, np.uint8)
    new_image = cv2.drawContours(mask, [location], 0, 225, -1)
    new_image = cv2.bitwise_and(img, img, mask=mask)

    #turns screenCnt into seperate coordinates
    num1 = [int(s) for s in re.findall(r'\b\d+\b', str(location[0]))]
    num2 = [int(s) for s in re.findall(r'\b\d+\b', str(location[1]))]
    num3 = [int(s) for s in re.findall(r'\b\d+\b', str(location[2]))]
    num4 = [int(s) for s in re.findall(r'\b\d+\b', str(location[3]))]

    x1,x2,x3,x4 = num1[0], num2[0], num3[0], num4[0]
    y1,y2,y3,y4 = num1[1], num2[1], num3[1], num4[1]

    top_x = min([x1,x2,x3,x4])
    left_y = min([y1,y2,y3,y4])
    bot_x = max([x1,x2,x3,x4])
    right_y = max([y1,y2,y3,y4])

    cropped_image = gray[left_y:right_y+1, top_x:bot_x+1]
    
    #plt.imshow(cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB))
    #plt.show()
    
    #reads number plate
    text = pytesseract.image_to_string(cropped_image, config='--psm 11')
    text = text[:-2]
    #print(text)
    return text
