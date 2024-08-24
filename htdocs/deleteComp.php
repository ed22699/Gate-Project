<?php
    $company = strval("'".$_GET['comp']."'");

    // logs into database
    $conn = mysqli_connect("localhost", "db_user","gateOpenPass1","gateProject");
    
    $inserted = "DELETE FROM company WHERE compName = $company";

    $conn->query($inserted);
    $conn->close();
?>
