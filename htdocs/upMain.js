function addCompany(){
    window.location = "http://192.168.64.2/addComp.html";
}

function addPlate(){
  window.location = "http://192.168.64.2/addPlate.html";
}

function viewData(){
    window.location = "http://192.168.64.2/viewData.html"
}

function viewCompany(){
    window.location = "http://192.168.64.2/viewComp.php"
}
// make sure you can actually go back
function show(){
    var x = document.getElementById("companyPassword");
    if (x.type === "password") {
      x.type = "text";
    } 
    else {
      x.type = "password";
    }
  }

function show2(){
    var x = document.getElementById("companyPasswordCheck");
    if (x.type === "password") {
        x.type = "text";
    } 
    else {
        x.type = "password";
    }
}

function goBack() {
  var element = document.getElementById("check");
  //If it isn't "undefined" and it isn't "null", then it exists.
  if(typeof(element) != 'undefined' && element != null){
      location.reload();
  } else{
      window.history.back();
  }
}

function getInfo(){
    var company = document.getElementById('company').value;
    var password = document.getElementById('companyPassword').value;
    var passwordConf = document.getElementById('companyPasswordCheck').value;
    if (password === passwordConf && password!="" && company != ""){
        // check for length and atleast 1 number
        var check = hasNumber(password);
        if (password.length <= 7 || check == false){
            document.getElementById("errorBar").innerHTML = "sorry, password invalid please enter a password of length 8 or greater and atleast one number"
            errorFunc()
        }
        else{
            var xhttp;    
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("errorBar").innerHTML = this.responseText;
                    document.getElementById("company").value = "";
                    document.getElementById("companyPassword").value = "";
                    document.getElementById("companyPasswordCheck").value = "";
                    document.getElementById("errorBar").innerHTML = "New Company Successfully Added";
                    document.getElementById("errorBar").style.backgroundColor="rgb(25, 173, 25)";
                }
            };
            xhttp.open("GET", "addComp.php?choice=1&pass="+password+"&comp="+company, true);
            xhttp.send();
        }
    }

    // below are all the validation checks to ensure all fields are entered
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
      if (passwordConf == ""){
        document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
        var x = document.getElementById('companyPasswordCheck');
        x.style.borderColor="#FF0000";
        x.style.backgroundColor="#FEF6F7";
        if (company ==""){
          document.getElementById("errorBar").innerHTML = "please enter company and password"
        }
        else{
          document.getElementById("errorBar").innerHTML = "please enter password"
        }
      }
      if (passwordConf != password){
        document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
        var x = document.getElementById('companyPasswordCheck');
        var y = document.getElementById('companyPassword');
        x.style.borderColor="#FF0000";
        x.style.backgroundColor="#FEF6F7";
        y.style.borderColor="#FF0000";
        y.style.backgroundColor="#FEF6F7";
        if (company ==""){
          document.getElementById("errorBar").innerHTML = "please enter company and ensure password and confirm passwords have the same input"
        }
        else{
          document.getElementById("errorBar").innerHTML = "sorry, password and confirm password have different inputs"
        }
        errorFunc()
      }
}

function addNumberPlate(){
  var company = document.getElementById('company').value;
  var password = document.getElementById('plate').value;
  var passwordConf = document.getElementById('plateCheck').value;
  if (password === passwordConf && password!="" && company != ""){
      // check for length and atleast 1 number
      if (password.length >= 8){
          document.getElementById("errorBar").innerHTML = "sorry, the number plates entered are too long"
          errorFunc()
      }
      else{
          var xhttp;    
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  document.getElementById("errorBar").innerHTML = this.responseText;
                  document.getElementById("company").value = "";
                  document.getElementById("plate").value = "";
                  document.getElementById("plateCheck").value = "";
                  document.getElementById("errorBar").innerHTML = "New Number Plate Successfully Added";
                  document.getElementById("errorBar").style.backgroundColor="rgb(25, 173, 25)";
              }
          };
          xhttp.open("GET", "addComp.php?choice=3&pass="+password+"&comp="+company, true);
          xhttp.send();
      }
  }

  // below are all the validation checks to ensure all fields are entered
  if (company == ""){
      document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
      var x = document.getElementById('company');
      x.style.borderColor="#FF0000";
      x.style.backgroundColor="#FEF6F7";
      if (password ==""){
        document.getElementById("errorBar").innerHTML = "please enter company and number plate"
      }
      else{
        document.getElementById("errorBar").innerHTML = "please enter company"
      }
    }
    if (password == ""){
      document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
      var x = document.getElementById('plate');
      x.style.borderColor="#FF0000";
      x.style.backgroundColor="#FEF6F7";
      if (company ==""){
        document.getElementById("errorBar").innerHTML = "please enter company and number plate"
      }
      else{
        document.getElementById("errorBar").innerHTML = "please enter number Plate"
      }
    }
    if (passwordConf == ""){
      document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
      var x = document.getElementById('plateCheck');
      x.style.borderColor="#FF0000";
      x.style.backgroundColor="#FEF6F7";
      if (company ==""){
        document.getElementById("errorBar").innerHTML = "please enter company and number plate"
      }
      else{
        document.getElementById("errorBar").innerHTML = "please enter number plate"
      }
    }
    if (passwordConf != password){
      document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
      var x = document.getElementById('plateCheck');
      var y = document.getElementById('plate');
      x.style.borderColor="#FF0000";
      x.style.backgroundColor="#FEF6F7";
      y.style.borderColor="#FF0000";
      y.style.backgroundColor="#FEF6F7";
      if (company ==""){
        document.getElementById("errorBar").innerHTML = "please enter company and ensure number plate and confirm number plate have the same input"
      }
      else{
        document.getElementById("errorBar").innerHTML = "sorry, number plate and confirm number plate have different inputs"
      }
      errorFunc()
    }
}

function changePass(comp){
    // issue, if password contains more than 1 interger even if it is below the length it is accepted
    let password = prompt("Please enter the new password for "+comp+":", "");
    if (password == null || password == "") {
    text = "User cancelled the prompt.";
    } 
    else {
        var check = hasNumber(password);
        if (password <= 7 || check == false){
            alert("unable to change password, new password is not of valid length or does not contain any numbers")
        }
        else{
            var xhttp;    
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("errorBar").innerHTML = this.responseText;
                // var link = document.getElementById('errorBar').innerHTML;
                }
            };
            xhttp.open("GET", "addComp.php?choice=2&pass="+password+"&comp="+comp, true);
            xhttp.send();
        }
    }
}

function deleteComp(comp){
    // change this line to Davids one number 1 in the database will always have control power
    if(comp == "test"){
        alert("sorry, this is a main user, cannot be deleted");
    }
    else{
        if (confirm("Are you sure you want to delete "+comp)) {
            var xhttp;    
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("errorBar").innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", "deleteComp.php?comp="+comp, true);
            xhttp.send();
            location.reload();
        }
    }  
}

function errorFunc(){
    document.getElementById('errorBar').style.backgroundColor="rgb(250, 125, 125)";
    var x = document.getElementById('companyPassword');
    var y = document.getElementById('companyPasswordCheck');
    x.style.borderColor="#FF0000";
    x.style.backgroundColor="#FEF6F7";
    x.value = "";
    y.style.borderColor="#FF0000";
    y.style.backgroundColor="#FEF6F7";
    y.value = "";
  }

// check if number is in string
function hasNumber(myString) {
    return /\d/.test(myString);
  }

function platesDisplay(comp){
  document.getElementById("tableName").innerHTML = "<h1 class = name>"+comp+"</h1>";
  var xhttp;    
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.getElementById("companyInfo").innerHTML = this.responseText;
      }
  };
  xhttp.open("GET", "disPlate.php?comp="+comp, true);
  xhttp.send();
  var select = document.getElementById("sorting");
  select.options[select.options.length] = new Option('Invalid', 'inval');
}

function validate(plate, choice){
  if (confirm("are you sure you make "+plate+" "+choice)) {
    var xhttp;    
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("errorBar").innerHTML = this.responseText;
        }
    };
    if (document.getElementById(plate).checked) {
      xhttp.open("GET", "addComp.php?choice=5"+"&pass="+plate+"&comp=''", true);
    }
    else{
      xhttp.open("GET", "addComp.php?choice=6"+"&pass="+plate+"&comp=''", true);
    }
    xhttp.send();
  }
  else{
    if (document.getElementById(plate).checked){
      document.getElementById(plate).checked = false;
    }
    else{
      document.getElementById(plate).checked = true;
    }
  }
}

function search(){
  var name = document.getElementById("search").value;
  var xhttp;    
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.getElementById("companyInfo").innerHTML = this.responseText;
      }
  };
  var element = document.getElementById("check");
  if(typeof(element) != 'undefined' && element != null){
    var company = document.querySelector(".name").textContent;
    xhttp.open("GET", "searchTable2.php?search="+name+"&comp="+company, true);
  }
  else{
    xhttp.open("GET", "searchTable.php?search="+name, true);
  }
  xhttp.send();
}

function sorted(){
  var sort = document.getElementById("sorting").value;
  var xhttp;    
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.getElementById("companyInfo").innerHTML = this.responseText;
      }
  };
  var element = document.getElementById("check");
  if(typeof(element) != 'undefined' && element != null){
    var company = document.querySelector(".name").textContent;
    xhttp.open("GET", "sort2.php?choice="+sort+"&comp="+company, true);
  }
  else{
    xhttp.open("GET", "sort.php?choice="+sort, true);
  }
  xhttp.send();
}