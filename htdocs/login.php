<?php
$compIP = $_GET['comp'];
$passIP = $_GET['pass'];
$found = 0;

// $mysqli = new mysqli("localhost", "db_user", "gateOpenPass1", "gateProject");
$con=mysqli_connect("localhost","db_user","gateOpenPass1","gateProject");
// Check connection
if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$result = mysqli_query($con,"SELECT * FROM company");


while($row = mysqli_fetch_array($result)){
    if ($row['compName'] === $compIP){
        if (crypt($passIP, $row['compPass']) == $row['compPass']) {
            if ($row['companyID'] == 1){
                $found =  1;
                echo "http://192.168.64.2/upMain.html";
            }
            else{
                $found = 1;
                echo "http://192.168.64.2/nMain.html";
            }
        }
    }
}
if ($found == 0){
    echo "company or password is incorrect, please try again";
}

mysqli_close($con);
?>