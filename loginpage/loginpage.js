window.records = {
    role: 'none',
    number: 950023104024
};

let container = document.querySelector('.container');

var _rollNo = 0;



function change(choice) {

    switch(choice) {
        case 1:
            container.innerHTML = `
            <h1>Student Log in</h1>
            <form action="/student/addstudent" method="POST" class="studentLogInForm studentSignInForm">
                <input type="number" placeholder="Roll Number" class="rollno"><br>
                <input type="password" placeholder="Password" class="password">
                <br>
                <button type="button" class="submitBtn" onClick="loginStudent()">Log in</button>
            </form>
            <p class="changeToLoginS">New User? <span onClick="change(2)">Sign in</span></p>
            `;
            break;
        
        case 2:
            container.innerHTML = `
            <h1>Student Sign in</h1>
            <form action="/student/addstudent" method="POST" class="studentSignInForm">
                <input type="text" placeholder="User Name" class="userName"><br>
                <input type="number" placeholder="Roll Number" class="rollno"><br>
                <input type="number" placeholder="Year" class="year"><br>
                <select name="departmentSelect" id="departmentSelect">
                    <option value="" disabled selected>Select a department</option>
                    <option value="CSE">CSE</option>
                    <option value="AIDS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="GEO">GEO</option>
                </select>
                <input type="password" placeholder="Set Password" class="password">
                <br>
                <button type="button" class="submitBtn" onclick="addStudent()">Sign in</button>
            </form>
            <p class="changeToLoginS">Already have an account? <span onclick="change(1)">Log in</span></p>
            `;
            document.querySelector('.studentBtn').classList.add('underLine');
            document.querySelector('.facultyBtn').classList.remove('underLine');
            break;

        case 3:
            container.innerHTML = `
            <h1>Faculty Sign in</h1>
            <form action="/student/addstudent" method="POST" class="studentSignInForm">
                <input type="text" placeholder="User Name" class="userName"><br>
                <input type="number" placeholder="Mobile Number" class="mobileNo"><br>
                <select name="departmentSelect" id="departmentSelect">
                    <option value="" disabled selected>Select a department</option>
                    <option value="CSE">CSE</option>
                    <option value="AIDS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="GEO">GEO</option>
                </select>
                <input type="password" placeholder="Set Password" class="password">
                <br>
                <button type="button" class="submitBtn" onClick="addFaculty()">Sign in</button>
            </form>
            <p class="changeToLoginS">Already have an account? <span onClick="change(4)">Log in</span></p>
            `;
            document.querySelector('.studentBtn').classList.remove('underLine');
            document.querySelector('.facultyBtn').classList.add('underLine');
            break;
            
        case 4:
            container.innerHTML = `
            <h1>Faculty Log in</h1>
            <form action="/student/addstudent" method="POST" class="studentLogInForm studentSignInForm">
                <input type="number" placeholder="Mobile Number" class="mobileNo"><br>
                <input type="password" placeholder="Password" class="password">
                <br>
                <button type="button" class="submitBtn" onClick="loginFaculty()">Log in</button>
            </form>
            <p class="changeToLoginS">New here? <span onClick="change(3)">Sign in</span></p>
            `;
            break;
    }
}

// Student Sign In
async function addStudent() {

    const name = document.querySelector('.userName').value.trim();
    const rollno = document.querySelector('.rollno').value;
    const year = document.querySelector('.year').value;
    const department = document.querySelector('#departmentSelect').value;
    const password = document.querySelector('.password').value;
    
    const response = await fetch('http://localhost:8080/student/addstudent',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rollno: rollno,
            name: name,
            year: year,
            department: department,
            password: password
        })
    });

    const data = await response.json();

    records.role = "STUDENT";
    records.number = rollno;
    console.log(data);

    if(response.status === 201) {
        window.location.href = "./studentpage/studentpage.html";
    }
}

// Student Log In
async function loginStudent() {

    const rollno = document.querySelector('.rollno').value;
    const password = document.querySelector('.password').value;

    const response = await fetch('http://localhost:8080/student/loginstudent',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rollno: rollno,
            password: password
        })
    });

    const data = await response.json();
    records.role = "STUDENT";
    records.number = rollno;
    console.log(data);

    if(response.status === 201) {
        window.location.href = "./studentpage/studentpage.html";
    }
}

// Get student
async function getStudent() {

    const response = await fetch(`http://localhost:8080/student/getstudent?rollno=${_rollNo}`)

    const data = await response.json();
    console.log(data);
}


// Faculty Sign in
async function addFaculty() {

    const name = document.querySelector('.userName').value.trim();
    const mobileno = document.querySelector('.mobileNo').value;
    const department = document.querySelector('#departmentSelect').value;
    const password = document.querySelector('.password').value;

    const response = await fetch('http://localhost:8080/faculty/addfaculty',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            mobileno: mobileno,
            department: department,
            password: password
        })
    });

    const data = await response.json();

    records.role = "FACULTY";
    records.number = mobileno;

    console.log(data);
}


// Faculty Log in
async function loginFaculty() {

    const mobileno = document.querySelector('.mobileNo').value;
    const password = document.querySelector('.password').value;

    const response = await fetch('http://localhost:8080/faculty/loginfaculty',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            mobileno: mobileno,
            password: password
        })
    });

    const data = await response.json();

    console.log(data);
}
