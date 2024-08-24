<!doctype html>
<html lang=en>
<head>
    <meta charset=utf-8>
    <title>Gate Project</title>
    <!-- link to javascript -->
    <script type ="text/javascript" src = 'gateInterface.js'></script>
 
    <!-- link to css stylesheet -->
    <link href='gateInterfaceCSS.css' rel = 'stylesheet' type='text/css'>

    <!-- put in stylesheet one day -->
    <style>
        h2 {text-align: center}
        label{
            width: 240px;
            display:inline-block;
            text-align: right;      
        }
        
    </style>

</head>

<body>
    <div id = "heading">
        <h1>The Gate Project</h1>

    
    </div>
    <h2>Login</h2>
    
    <!-- put a invalid email or password box here which appears if data not valid -->
    
    <!-- figure out how to center these inputs -->
    <label for="company">Company Name:</label>
    <input type="text" id="company" name="company" size=30><br><br>
    <label for="password">Password:</label>
    <input type="password" id="companyPassword" name="password" size=30>
    <input type="checkbox" onclick = show()>Show Password
    <br><br>

    <div style = "text-align:center;">
        <button type="button" onclick = getInfo()>Submit</button>
    </div>
    
    <!-- messing around with encryption keys (Blowfish) -->
    <?PHP
        $salt = "";
        $salt_chars = array_merge(range('A','Z'), range('a','z'), range(0,9));
        for($i=0; $i < 22; $i++) {
        $salt .= $salt_chars[array_rand($salt_chars)];
        }
        $password_hash = crypt("ZoomerZach2002", sprintf('$2a$%02d$', 5) . $salt);
        echo $password_hash
    ?>

    <!-- figuring out connecting to the database -->
    <?php
        $dbName = "gateProject";
        $userName = "db_user";
        $password = "gateOpenPass1";
        $conn = mysqli_connect("localhost", $userName, $password, $dbName); // Establishing Connection with Server
          
        $sql = "SELECT * FROM company";
        $result = $conn->query($sql);
          
        // if ($result->num_rows > 0) {
        // // output data of each row
        // while($row = $result->fetch_assoc()) {
        //     echo "id: " . $row["companyID"]. " - Name: " . $row["company"]. " " . $row["password"]. "<br>";
        // }
        // } else {
        // echo "0 results";
        // }

        
        // if(crypt(password, $password_hash) == $password_hash) {
        //     echo "yay this works";
        // }

        mysqli_close($conn);
    ?>
    <p class="yes">the best pink floyd album is the wall for its continous riff found throughout the playlist along with its great story, however dark side of the moon was the one that bought them to fame in 1972 and so deserves recognition as one of the greats.</p>
    <p class="no"></p>

    <script>
    $.ajax({
        method: "POST",
        url: "login.php",
        data: { text: $("yes").text() }
    })
        .done(function( response ) {
            $("no").html(response);
    });
    </script>
        
</body>
</html>

<!-- python3 -m http.server -->