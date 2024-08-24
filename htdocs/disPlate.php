<?php
$company = strval("'".$_GET['comp']."'");
$conn = mysqli_connect("localhost", "db_user","gateOpenPass1","gateProject");

$sql = "SELECT companyID FROM company WHERE compName = $company";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $max_public_id = mysqli_fetch_row($result);
}
$compID = intval($max_public_id[0]);

$sql = "SELECT * FROM validNumberPlates WHERE companyID = $compID";
$result = $conn->query($sql);

echo "<table style='width:100%'>";
echo "<tr>";
echo "<th>Number Plate</th>";
echo "<th>Valid</th>";
echo "</tr>";

while($row = $result->fetch_assoc()) {
    $plate = $row['numberPlate'];
    echo "<tr>";
    echo "<td width=90%> ".$plate. " </td>";
    if ($row["valid"] == TRUE){
        echo "<td> <input type='checkbox' id=$plate name=$plate onclick='validate(\"$plate\",\"invalid\")' checked> </td>";
    }
    // figure out how to make the validate function work
    else{
        echo "<td> <input type='checkbox' id=$plate name=$plate onclick='validate(\"$plate\",\"valid\")' > </td>";
    }
    echo "</tr>";
}

echo "</table>";
echo "<div id = check></div>";
$conn->close();
?>
<!-- <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"> -->
<script type="text/javascript" src="upMain.js"></script>