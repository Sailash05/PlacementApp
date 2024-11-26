let domain = 'http://192.168.1.6:8080/';

let container = document.querySelector('.container');

let student = {
    name:null,
    rollno:null,
    year:null,
    semester:null,
    department:null
}

let faculty = {
    name:null,
    department:null,
    mobileno:null
}


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

// add student to local storage
function studentLoc(userData) {
    student.name = userData.returnStudent.name;
    student.rollno = userData.returnStudent.rollno;
    student.year = userData.returnStudent.year;
    student.semester = userData.returnStudent.semester;
    student.department = userData.returnStudent.department;
    localStorage.setItem('student', JSON.stringify(student));
}

// add faculty to local storage
function facultyLoc(facultyData) {
    faculty.name = facultyData.returnFaculty.name;
    faculty.department = facultyData.returnFaculty.department;
    faculty.mobileno = facultyData.returnFaculty.mobileno;
    localStorage.setItem('faculty',JSON.stringify(faculty));
}

// Get student details
async function getStudent(rollNo) {

    try {
        const response = await fetch(domain+`student/getstudent?rollno=${rollNo}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Student Sign In
async function addStudent() {

    const name = document.querySelector('.userName').value.trim();
    const rollno = document.querySelector('.rollno').value;
    const year = document.querySelector('.year').value;
    const department = document.querySelector('#departmentSelect').value;
    const password = document.querySelector('.password').value;

    try {
        const response = await fetch(domain+'student/addstudent',{
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

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const userData = await getStudent(rollno);
        studentLoc(userData);
        window.location.href = "./studentpage/studentpage.html";
    }
    catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Student Log In
async function loginStudent() {

    const rollno = document.querySelector('.rollno').value;
    const password = document.querySelector('.password').value;

    try {
        const response = await fetch(domain+'student/loginstudent',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                rollno: rollno,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const userData = await getStudent(rollno);
        studentLoc(userData);
        
        window.location.href = "./studentpage/studentpage.html";
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

// GEt faculty
async function getFaculty(mobileno) {
    try {
        const response = await fetch(domain+`faculty/getfaculty?mobileno=${mobileno}`)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

// Faculty Sign in
async function addFaculty() {

    const name = document.querySelector('.userName').value.trim();
    const mobileno = document.querySelector('.mobileNo').value;
    const department = document.querySelector('#departmentSelect').value;
    const password = document.querySelector('.password').value;

    try {
        const response = await fetch(domain+'faculty/addfaculty',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                mobileno: mobileno,
                department: department,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const facultyData = await getFaculty(mobileno);
        facultyLoc(facultyData);
        window.location.href = "./facultypage/facultypage.html";
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}


// Faculty Log in
async function loginFaculty() {

    const mobileno = document.querySelector('.mobileNo').value;
    const password = document.querySelector('.password').value;
    console.log(mobileno);
    console.log(password);

    try {
        const response = await fetch(domain+'faculty/loginfaculty',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                mobileno: mobileno,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const facultyData = await getFaculty(mobileno);
        facultyLoc(facultyData);

        window.location.href = "./facultypage/facultypage.html";
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}
