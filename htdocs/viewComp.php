<!doctype html>
<html lang=en>
<head>
    <meta charset=utf-8>
    <title>Gate Project</title>
    <!-- link to javascript -->
    <script type ="text/javascript" src = 'upMain.js'></script>

    <!-- link to css stylesheet -->
    <link href='gateInterfaceCSS.css' rel = 'stylesheet' type='text/css'>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div id = "heading">
    <h1>Gate Project</h1>

    </div>

    <div class = "heading2">
        <div class="arrow" onclick=goBack()></div>
        <div id = "tableName"><h1>View Companies</h1> </div>
        <!-- figure out how to make button go in corner -->
    </div>

    <div class="topnav">
        <div class="sort">
            <label for="sorting">Sort By:</label>
            <select id="sorting" onchange = sorted()>
                <option value="id">Creation</option>
                <option value="alph">Alphbetical</option>
            </select>
        </div>

        <div class="search-container">
            <input type="text" placeholder="Search.." id="search">
            <button type="submit" onclick =search()><i class="fa fa-search"></i></button>
        </div>
    </div>
    <br></br>

    <div id="companyInfo">
        <?php
        $conn = mysqli_connect("localhost", "db_user","gateOpenPass1","gateProject");

        $sql = "SELECT * FROM company";

        $result = $conn->query($sql);

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
        echo "</table>";
        $conn->close();
        ?>
    </div>
    <div id="errorBar"></div>
</body>
</html>