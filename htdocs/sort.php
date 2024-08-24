<?php
    $choice = $_GET['choice'];
    // logs into database
    $conn = mysqli_connect("localhost", "db_user","gateOpenPass1","gateProject");
    
    if ($choice == "id"){
        $inserted = "SELECT * FROM company";
    }else{
        $inserted = "SELECT * FROM company ORDER BY compName";
    }

    $result = $conn->query($inserted);

    echo "<table style='width:100%'>";
    echo "<tr>";
    echo "<th>Company</th>";
    // echo "<th>Password</th>";
    echo "</tr>";

    while($row = $result->fetch_assoc()) {
        $company = $row["compName"];
        echo "<tr>";
        echo "<td onclick='platesDisplay(\"$company\")' width=90%> ". $company. " </td>";
        // echo "<td> ". $row["password"]. " </td>";
        echo "<td> <button class='btn' onclick='changePass(\"$company\")'><i class='fa fa-edit'></i></button>";
        echo "<td> <button class='btn' onclick='deleteComp(\"$company\")'><i class='fa fa-trash'></i></button>";
        echo "</tr>";
    }
    
    $conn->close();
?>