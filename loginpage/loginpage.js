let domain = 'http://192.168.1.4:8080/';

let container = document.querySelector('.container');
/* 
let student = {
    name:null,
    rollno:null,
    year:null,
    semester:null,
    department:null,
	email:null,
	mobileno:null
} */
/* let faculty = {
    name:null,
    department:null,
    mobileno:null,
	email:null
} */
let token = {
	jwt_token:null
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
            <p class="changeToLoginS">New User? <span onClick="change(2)">Sign up</span></p>
            `;
            break;
        
        case 2:
            container.innerHTML = `
            <h1>Student Sign up</h1>
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
                <button type="button" class="submitBtn" onclick="addStudent()">Sign up</button>
            </form>
            <p class="changeToLoginS">Already have an account? <span onclick="change(1)">Log in</span></p>
            `;
            document.querySelector('.studentBtn').classList.add('underLine');
            document.querySelector('.facultyBtn').classList.remove('underLine');
            break;

        case 3:
            container.innerHTML = `
            <h1>Faculty Sign up</h1>
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
                <button type="button" class="submitBtn" onClick="addFaculty()">Sign up</button>
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
            <p class="changeToLoginS">New here? <span onClick="change(3)">Sign up</span></p>
            `;
            break;
    }
}

// add student to local storage
/* function studentLoc(userData) {
    student.name = userData.datas.name;
    student.rollno = userData.datas.rollno;
    student.year = userData.datas.year;
    student.semester = userData.datas.semester;
    student.department = userData.datas.department;
	student.email = userData.datas.email;
	student.mobileno = userData.datas.mobileno;
    localStorage.setItem('student', JSON.stringify(student));
} */

// add faculty to local storage
/* function facultyLoc(facultyData) {
    faculty.name = facultyData.datas.name;
    faculty.department = facultyData.datas.department;
    faculty.mobileno = facultyData.datas.mobileno;
	faculty.email = facultyData.datas.email;
    localStorage.setItem('faculty',JSON.stringify(faculty));
} */

// Get student details
/* async function getStudent(rollNo, token) {
    const jwt_token = token; 
    try {
        const response = await fetch(domain + `student/getstudent?rollno=${rollNo}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt_token}`, 
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('An error occurred:', error.message);
    }
} */


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
		change(1);
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
		token.jwt_token = data.datas;
		localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('userName', rollno);
        window.location.href = "./studentpage/studentpage.html";
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}


/* async function getFaculty(mobileno, token) {
	const jwt_token = token; 
    try {
        const response = await fetch(domain+`faculty/getfaculty?mobileno=${mobileno}`, {
			method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt_token}`, 
                "Content-Type": "application/json"
            }
		});
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
} */

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
		change(4);
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

// Faculty Log in
async function loginFaculty() {

    const mobileno = document.querySelector('.mobileNo').value;
    const password = document.querySelector('.password').value;

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
		token.jwt_token = data.datas;
		localStorage.setItem('token',JSON.stringify(token));
        localStorage.setItem('userName',mobileno);
        window.location.href = "./facultypage/facultypage.html";
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

async function tokenValid() {
	if(localStorage.getItem("token")) {
		token = localStorage.getItem("token");
		token = JSON.parse(token);
		try {
			const response = await fetch(domain + 'validate/token', {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token.jwt_token}`, 
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				throw new Error(`Error: ${response.status} - ${response.statusText}`);
			}
			const data = await response.json();
			if(data.datas.role == "student") {
                localStorage.setItem('userName',data.datas.userName);
        		window.location.href = "./studentpage/studentpage.html";
			}
			else if(data.datas.role=="faculty") {
                localStorage.setItem('userName',data.datas.userName);
                window.location.href = "./facultypage/facultypage.html";
			}
		}
		catch (error) {
			console.error('An error occurred:', error.message);
		}
	}
}
tokenValid();
