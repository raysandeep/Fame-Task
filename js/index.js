// Check Login
function checkLogin() {
    var storedName = sessionStorage.getItem('TOKEN');
    var storeduser = sessionStorage.getItem('USER');
    console.log(storedName);
    if (storedName == null || storeduser ==null) {
        window.location.replace("/login.html");
    } else if(storeduser ==null){
        checkUserType();
    }
    else if(storedName ==null){
        logout();
    }
}

function checkTeacher(){
    checkLogin();
    var storeduser = sessionStorage.getItem('USER');
    if(storeduser=="Teacher"){
    }
    else{
        logout();
    }
}
function checkStudent(){
    checkLogin();
    var storeduser = sessionStorage.getItem('USER');
    if(storeduser=="Student"){
    }
    else{
        logout();
    }
}


// Check Login for login page
function checkLoginforLogin() {
    var storedName = sessionStorage.getItem('TOKEN');
    console.log(storedName);
    if (storedName == null) {} else {
        checkUserType();

    }
}


function login() {
    document.getElementById("loginBtn").disabled = true;

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = {
        "username": username,
        "password": password
    }
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://fame-task.herokuapp.com/auth/token/login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            sessionStorage.setItem("TOKEN", "Token " + data.auth_token);
            checkUserType();
            console.log(this.responseText);
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = data.detail;
            document.getElementById("loginBtn").disabled = false;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }

}

function checkUserType(){
    var xhr = new XMLHttpRequest();
    var storedToken = sessionStorage.getItem('TOKEN');
    xhr.open("GET", "https://fame-task.herokuapp.com/api/user/", true);
    xhr.setRequestHeader('Authorization', storedToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        console.log("check");
        console.log(this.responseText);
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            sessionStorage.setItem("USER", data.userType);
            if(data.userType=="Teacher"){
                window.location.replace("/");
            }
            else{
                window.location.replace("student.html");
            }
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = "Error!";
            document.getElementById("loginBtn").disabled = false;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }

}




function getStudents(){
    checkTeacher();
    var xhr = new XMLHttpRequest();
    var storedToken = sessionStorage.getItem('TOKEN');
    xhr.open("GET", "https://fame-task.herokuapp.com/api/student/", true);
    xhr.setRequestHeader('Authorization', storedToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        console.log("check");
        console.log(this.responseText);
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var tr = $('<tr/>');
                $(tr).append("<td>" + i+1 + "</td>");
                $(tr).append("<td>" + data[i].grade + "</td>");
                $(tr).append("<td>" + data[i].user.first_name+' '+data[i].user.last_name + "</td>");
                $(tr).append("<td>" + data[i].user.username + "</td>");
                $('#students').append(tr);
            }
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = "Error!";
            document.getElementById("loginBtn").disabled = false;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }

}



function registerStudent(){
    checkTeacher();
    var fname = document.getElementById("fname").value;
    var lanme = document.getElementById("lname").value;
    var grade = document.getElementById("class").value;
    var username = document.getElementById("regis").value;
    var password = document.getElementById("password").value;
    var data = {
        "username": username,
        "password": password,
        "first_name":fname,
        "last_name":lanme,
        "grade":grade
    }
    console.log(data);
    var xhr = new XMLHttpRequest();
    var storedToken = sessionStorage.getItem('TOKEN');
    xhr.open("POST", "https://fame-task.herokuapp.com/api/student/", true);
    xhr.setRequestHeader('Authorization', storedToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        if (this.status == 201) {
            var data = JSON.parse(this.responseText);
            console.log(this.responseText);
            window.location.replace("/");
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = data.detail;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }   
}


function getStudentsAttendance(){
    checkTeacher();
    var xhr = new XMLHttpRequest();
    var storedToken = sessionStorage.getItem('TOKEN');
    xhr.open("GET", "https://fame-task.herokuapp.com/api/student/", true);
    xhr.setRequestHeader('Authorization', storedToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        console.log("check");
        console.log(this.responseText);
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var tr = $('<tr/>');
                $(tr).append("<td>" + i+1 + "</td>");
                $(tr).append("<td>" + data[i].grade + "</td>");
                $(tr).append("<td>" + data[i].user.first_name+' '+data[i].user.last_name + "</td>");
                $(tr).append("<td>" + data[i].user.username + "</td>");
                $(tr).append("<td> <div class=\"select-group\"><select id=\""+ data[i].uuid +"\" name=\"markAtt\" required class=\"form-control\">\
                <option selected disabled>-----------</option><option value=\"absent\">Absent</option><option value=\"Present\">Present</option>\
                </select></div></td>");
                $('#student').append(tr);
            }
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = "Error!";
            document.getElementById("loginBtn").disabled = false;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }

}


function getDataReady(){
    checkTeacher();
    var mylist=[];
    var xhr = new XMLHttpRequest();
    var storedToken = sessionStorage.getItem('TOKEN');
    xhr.open("GET", "https://fame-task.herokuapp.com/api/student/", true);
    xhr.setRequestHeader('Authorization', storedToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        console.log("check");
        console.log(this.responseText);
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if(document.getElementById(data[i].uuid).value=="Present"){
                    mylist.push(data[i].uuid);
                }
                
            }
            post_attendance(mylist)
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = "Error!";
            document.getElementById("loginBtn").disabled = false;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }
}

function post_attendance(data){
    final_data={
        'students':data
    }
    console.log(final_data);
    var xhr = new XMLHttpRequest();
    var storedToken = sessionStorage.getItem('TOKEN');
    xhr.open("POST", "https://fame-task.herokuapp.com/api/attendance/", true);
    xhr.setRequestHeader('Authorization', storedToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(final_data));
    xhr.onload = function () {
        if (this.status == 201) {
            var data = JSON.parse(this.responseText);
            console.log(this.responseText);
            window.location.replace("/");
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = data.detail;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }   
}


function logout() {
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("USER");
    window.location.replace("login.html");
}


function getStudentView(){
    checkStudent();
    var xhr = new XMLHttpRequest();
    var storedToken = sessionStorage.getItem('TOKEN');
    xhr.open("GET", "https://fame-task.herokuapp.com/api/student/view/", true);
    xhr.setRequestHeader('Authorization', storedToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        console.log("check");
        console.log(this.responseText);
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var tr = $('<tr/>');
                $(tr).append("<td>" + i+1 + "</td>");
                $(tr).append("<td>" + data[i].date + "</td>");
                if(data[i].user.status==true){
                    $(tr).append("<td>Present</td>");
                }
                else{
                    $(tr).append("<td>Absent</td>");
                }
                $('#students').append(tr);
            }
        } else if (this.status == 401) {
            var data = JSON.parse(this.responseText);
            document.getElementById("errorHandler").innerHTML = "Error!";
            document.getElementById("loginBtn").disabled = false;

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong.";
        }
    }

}