function reqPlate(){
    window.location = "http://192.168.64.2/reqPlate.html";
  }

function goBack() {
    window.history.back();  
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
            xhttp.open("GET", "addComp.php?choice=4&pass="+password+"&comp="+company, true);
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