function getInfo(){
    var company = document.getElementById('company').value;
    var password = document.getElementById('companyPassword').value;

    // this code sends the company and password to the php file to validate
    if (company!= "" && password!= "") {
      var xhttp;    
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("errorBar").innerHTML = this.responseText;
          if (document.getElementById('errorBar').innerHTML == "company or password is incorrect, please try again"){
            errorFunc();
          }
          var link = document.getElementById('errorBar').innerHTML;
          if (link.includes("http://192.168.64.2/")){
            window.location.replace(link);
          }
        }
      };
      xhttp.open("GET", "login.php?comp="+company+"&pass="+password, true);
      xhttp.send();
    }

    // make box red if data missing
    if (company == ""){
      document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
      var x = document.getElementById('company');
      x.style.borderColor="#FF0000";
      x.style.backgroundColor="#FEF6F7";
      if (password ==""){
        document.getElementById("errorBar").innerHTML = "please enter company and password"
      }
      else{
        document.getElementById("errorBar").innerHTML = "please enter company"
      }
    }
    if (password == ""){
      document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
      var x = document.getElementById('companyPassword');
      x.style.borderColor="#FF0000";
      x.style.backgroundColor="#FEF6F7";
      if (company ==""){
        document.getElementById("errorBar").innerHTML = "please enter company and password"
      }
      else{
        document.getElementById("errorBar").innerHTML = "please enter password"
      }
    }
}

function show(){
  var x = document.getElementById("companyPassword");
  if (x.type === "password") {
    x.type = "text";
  } 
  else {
    x.type = "password";
  }
}

function errorFunc(){
  document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
  var x = document.getElementById('company');
  var y = document.getElementById('companyPassword');
  x.style.borderColor="#FF0000";
  x.style.backgroundColor="#FEF6F7";
  x.value = "";
  y.style.borderColor="#FF0000";
  y.style.backgroundColor="#FEF6F7";
  y.value = "";
}

