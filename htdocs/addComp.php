<?php
    $choice = $_GET['choice'];
    $company = strval("'".$_GET['comp']."'");
    $pass = strval($_GET['pass']);

    // logs into database
    $conn = mysqli_connect("localhost", "db_user","gateOpenPass1","gateProject");
    // encrypts password
    if ($choice<=2){
        $salt = "";
        $salt_chars = array_merge(range('A','Z'), range('a','z'), range(0,9));
        for($i=0; $i < 22; $i++) {
        $salt .= $salt_chars[array_rand($salt_chars)];
        }
        $password_hash = crypt($pass, sprintf('$2a$%02d$', 5) . $salt);
        $pass = "'".$password_hash."'";

        
        if ($choice == 1){
            $sql = "SELECT companyID FROM company ORDER BY companyID DESC LIMIT 1";
            $result = mysqli_query($conn, $sql);
            if (mysqli_num_rows($result) > 0) {
                $max_public_id = mysqli_fetch_row($result);
            }
            $number = intval($max_public_id[0]);
            $number += 1;
            $inserted = "INSERT INTO company (companyID, compName, compPass) VALUES ($number, $company, $pass)";
        }

        else{
            $inserted = "UPDATE company SET compPass = $pass WHERE compName = $company";
        }
    }
    
    if ($choice >= 3 && $choice <= 4){
        $pass = "'".$pass."'";
        $sql = "SELECT numberID FROM validNumberPlates ORDER BY numberID DESC LIMIT 1";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $max_public_id = mysqli_fetch_row($result);
        }
        $isTouch = isset($max_public_id);
        if ($isTouch == false){
            $number = 1;
        }
    
        else{
            $number = $max_public_id[0];
            $number+=1;
        }

        $sql = "SELECT companyID FROM company WHERE compName = $company";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $max_public_id = mysqli_fetch_row($result);
        }
        $compID = intval($max_public_id[0]);

        if ($choice == 3){
            $inserted = "INSERT INTO validNumberPlates (numberID, numberPlate, companyID, valid) VALUES ($number, $pass, $compID, TRUE)";
        }
        if ($choice == 4){
            $inserted = "INSERT INTO validNumberPlates (numberID, numberPlate, companyID, valid) VALUES ($number, $pass, $compID, FALSE)";
        }      
    }

    else{
        if ($choice == 5){
            // validating code here
            $inserted = "UPDATE validNumberPlates SET valid = TRUE WHERE numberPlate = '$pass'";
        }
        if ($choice == 6){
            // unvalidating code here
            $inserted = "UPDATE validNumberPlates SET valid = FALSE WHERE numberPlate = '$pass'";
        }

    }
    if ($conn->query($inserted) === TRUE) {
        if ($choice<=4){
            echo "New record created successfully";
        }
      } 
    else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    // $conn->query($inserted);
    $conn->close();
?>
