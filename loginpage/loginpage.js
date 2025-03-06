let domain = "http://192.168.1.7:8080/";


//const publicVapidKey = "BCwlkvIYRB_GS_2KpjEeCRUl2W5PQQsww_gkRahGGRczg68POnTYuYFH3MUQTie1vCuqg0_d_7ua_psD59_ejbA"; // Replace with your actual public VAPID key

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/service-worker.js")
		.then(reg => console.log("Service Worker Registered"))
		.catch(err => console.log("Service Worker Registration Failed", err));
}
console.log(Notification.permission);
if (Notification.permission !== "granted") {
	Notification.requestPermission().then(permission => {
		if (permission === "granted") {
			console.log("Notification permission granted");
		}
	});
}

console.log(Notification.permission);

        // Handle subscribe button click event
/* document.getElementById("subscribe").addEventListener("click", async () => {
	const registration = await navigator.serviceWorker.ready;

	// Subscribe to push notifications
	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
	});

	console.log("Subscription:", subscription);

	await fetch(domain+"api/push/subscribe", {
		method: "POST",
		body: JSON.stringify(subscription),
		headers: {
			"Content-Type": "application/json"
		}
	});

	alert("Subscribed to notifications!");
}); */

/* function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
} */


let container = document.querySelector(".container");

let token = {
	jwt_token: null,
};

function change(choice) {
	switch (choice) {
		case 1:
			container.innerHTML = `
            <h1>Student Log in</h1>
            <form action="/student/addstudent" method="POST" class="studentLogInForm studentSignInForm">
                <input type="number" placeholder="Roll Number" class="rollno"><br>
                <input type="password" placeholder="Password" class="password">
                <br>
				<p class="forgot-password"><span onClick="studentResetPassword()">Forgot Password?</span></p>
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
			document.querySelector(".studentBtn").classList.add("underLine");
			document.querySelector(".facultyBtn").classList.remove("underLine");
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
			document.querySelector(".studentBtn").classList.remove("underLine");
			document.querySelector(".facultyBtn").classList.add("underLine");
			break;

		case 4:
			container.innerHTML = `
            <h1>Faculty Log in</h1>
            <form action="/student/addstudent" method="POST" class="studentLogInForm studentSignInForm">
                <input type="number" placeholder="Mobile Number" class="mobileNo"><br>
                <input type="password" placeholder="Password" class="password">
                <br>
				<p class="forgot-password"><span onClick="facultyResetPassword()">Forgot Password?</span></p>
                <button type="button" class="submitBtn" onClick="loginFaculty()">Log in</button>
            </form>
            <p class="changeToLoginS">New here? <span onClick="change(3)">Sign up</span></p>
            `;
			break;
	}
}

async function addStudent() {
	const name = document.querySelector(".userName").value.trim();
	const rollno = document.querySelector(".rollno").value;
	const year = document.querySelector(".year").value;
	const department = document.querySelector("#departmentSelect").value;
	const password = document.querySelector(".password").value;

	if(name.length === 0) {
		showFailMessage("Error","Please Enter Your Name.","Try again!!");
	}
	else if(rollno.length != 12) {
		showFailMessage("Error","Please Enter the Correct Register Number.","Try again!!");
	}
	else if(year < 1 || year > 4) {
		showFailMessage("Error","Please Enter the correct year.","Try again!!");
	}
	else if(department === "") {
		showFailMessage("Error","Please select the department.","Try again!!");
	}
	else if(password.trim() === "") {
		showFailMessage("Error","Please Enter the Password","Try again!!");
	}
	else {
		//document.querySelector('#loading-screen').style.display = 'flex';
		try {
			const response = await fetch(domain + "student/addstudent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					rollno: rollno,
					name: name,
					year: year,
					department: department,
					password: password,
				}),
			});
	
			const data = await response.json();
			if(response.status === 201) {
				//document.querySelector('#loading-screen').style.display = 'none';
				showSuccessMessage("Success","Account Created",data.message);
			}
			else if(response.status === 409) {
				//document.querySelector('#loading-screen').style.display = 'none';
				showFailMessage("Error",data.message,"Please Log In!");
			}
			else if (!response.ok) {
				throw new Error(data.message);
			}
	
			change(1);
		} 
		catch (error) {
			//document.querySelector('#loading-screen').style.display = 'none';
			showFailMessage("Error","Internal Server Error","Please try again!");
		}
	}
}

async function loginStudent() {
	const rollno = document.querySelector(".rollno").value;
	const password = document.querySelector(".password").value;

	if(rollno.length != 12) {
		showFailMessage("Error","Please Enter the Correct Register Number.","Try again!!");
	}
	else if(password.trim() === "") {
		showFailMessage("Error","Please Enter the password","");
	}
	else {
		try {
			const response = await fetch(domain + "student/loginstudent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					rollno: rollno,
					password: password,
				}),
			});
			const data = await response.json();
	
			if(response.status === 404) {
				showFailMessage("Error",data.message,"Please Enter the Correct Register Number.");
			}
			else if(response.status === 401) {
				showFailMessage("Error",data.message,"Please Enter the Correct Password");
			}
			else if(response.status === 200) {
				token.jwt_token = data.datas;
				localStorage.setItem("token", JSON.stringify(token));
				localStorage.setItem("userName", rollno);
				window.location.href = "./studentpage/studentpage.html";
			}
			else if (!response.ok) {
				throw new Error(data.message);
			}
			
		} 
		catch (error) {
			showFailMessage("Error","Internal Server Error","Please try again!");
		}
	}
	
}


async function addFaculty() {
	const name = document.querySelector(".userName").value.trim();
	const mobileno = document.querySelector(".mobileNo").value;
	const department = document.querySelector("#departmentSelect").value;
	const password = document.querySelector(".password").value;

	if(name.length === 0) {
		showFailMessage("Error","Please Enter Your Name.","Try again!!");
	}
	else if(mobileno.length != 10) {
		showFailMessage("Error","Please Enter the Valid Mobile Number.","Try again!!");
	}
	else if(department === "") {
		showFailMessage("Error","Please select the department.","Try again!!");
	}
	else {
		try {
			const response = await fetch(domain + "faculty/addfaculty", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name,
					mobileno: mobileno,
					department: department,
					password: password,
				}),
			});
			const data = await response.json();
			if(response.status === 201) {
				showSuccessMessage("Success","Account Created",data.message);
			}
			else if(response.status === 409) {
				showFailMessage("Error",data.message,"Please Log In!");
			}
			else if (!response.ok) {
				throw new Error(data.message);
			}
			
			change(4);
		} 
		catch (error) {
			showFailMessage("Error","Internal Server Error","Please try again!");
		}
	}	
}

async function loginFaculty() {
	const mobileno = document.querySelector(".mobileNo").value;
	const password = document.querySelector(".password").value;

	if(mobileno.length != 10) {
		showFailMessage("Error","Please Enter the Valid Mobile Number.","Try again!!");
	}
	else if(password.trim() === "") {
		showFailMessage("Error","Please Enter the password","");
	}
	else {
		try {
			const response = await fetch(domain + "faculty/loginfaculty", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					mobileno: mobileno,
					password: password,
				}),
			});

			const data = await response.json();

			if(response.status === 404) {
				showFailMessage("Error",data.message,"Please Enter the Correct Mobile Number.");
			}
			else if(response.status === 401) {
				showFailMessage("Error",data.message,"Please Enter the Correct Password");
			}
			else if(response.status === 200) {
				token.jwt_token = data.datas;
				localStorage.setItem("token", JSON.stringify(token));
				localStorage.setItem("userName", mobileno);
				window.location.href = "./facultypage/facultypage.html";
			}
			else if (!response.ok) {
				throw new Error(data.message);
			}
		} 
		catch (error) {
			showFailMessage("Error","Internal Server Error","Please try again!");
		}
	}
}

async function tokenValid() {
	if (localStorage.getItem("token")) {
		token = localStorage.getItem("token");
		token = JSON.parse(token);
		try {
			const response = await fetch(domain + "validate/token", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token.jwt_token}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(
					`Error: ${response.status} - ${response.statusText}`
				);
			}
			const data = await response.json();
			if (data.datas.role == "student") {
				localStorage.setItem("userName", data.datas.userName);
				window.location.href = "./studentpage/studentpage.html";
			} else if (data.datas.role == "faculty") {
				localStorage.setItem("userName", data.datas.userName);
				window.location.href = "./facultypage/facultypage.html";
			}
		} catch (error) {
			localStorage.clear();
		}
	}
}

function showFailMessage(title, message1, message2) {
	let popUpContainer = document.createElement('div');
	popUpContainer.classList.add('pop-up-container');
	let innerContent = `<div class="logo">
            <img src="./Resource/pop up menu icons/cross.png" alt="Logo">
        </div>
        <h1>${title} :(</h1>
        <p> ${message1} <br> ${message2}</p>
        <form>
            <button type="button" class="button" onClick="hideFailMessage()">TRY AGAIN</button>
        </form>`;
	popUpContainer.innerHTML = innerContent;
	document.querySelector('body').appendChild(popUpContainer);
}
function hideFailMessage() {
	let popUpContainer = document.querySelector('.pop-up-container');
	popUpContainer.remove();
}

function showSuccessMessage(title, message1, message2) {
	let popUpContainer = document.createElement('div');
	popUpContainer.classList.add('pop-up-container1');
	let innerContent = `<div class="logo">
            <img src="./Resource/pop up menu icons/tick.png" alt="Logo">
        </div>
        <h1>${title}!</h1>
        <p> ${message1} <br> ${message2}</p>
        <form>
            <button type="button" class="button" onClick="hideSuccessMessage()">Okay</button>
        </form>`;
	popUpContainer.innerHTML = innerContent;
	document.querySelector('body').appendChild(popUpContainer);
}
function hideSuccessMessage() {
	let popUpContainer = document.querySelector('.pop-up-container1');
	popUpContainer.remove();
}


tokenValid();


function studentResetPassword() {
	let resendContainerMaster = document.createElement('div');
	resendContainerMaster.classList.add('resend-container-master');
	resendContainerMaster.innerHTML = `<div class="resend-container">
        <button class="resend-close-btn" onClick="closeStudentResetPassword()">X</button>
        
        <h2 class="resend-title">Password Reset</h2>
        
        <form class="resend-form">
            <label for="reg-number" class="resend-label">Register Number:</label>
            <input type="number" id="reg-number" name="reg-number" class="resend-input" required>
            <label for="email" class="resend-label">Email Address:</label>
            <input type="email" id="email" name="email" class="resend-input" required>
            <div class="resend-button-container">
                <button type="button" class="resend-send-btn" onClick="sendStudentResetRequest()">Send</button>
                <button type="button" class="resend-cancel-btn" onClick="closeStudentResetPassword()">Cancel</button>
            </div>
        </form>
    </div>`;
	document.querySelector('body').appendChild(resendContainerMaster);
}
function closeStudentResetPassword() {
	document.querySelector('.resend-container-master').remove();
}


async function sendStudentResetRequest() {
	const regNo = document.querySelector('.resend-form #reg-number').value;
	const email = document.querySelector('.resend-form #email').value;
	if(regNo.length != 12) {
		showFailMessage("Error","Please Enter the Correct Register Number.","Try again!!");
	}
	else if(email.trim() === "") {
		showFailMessage("Error","Please Enter the Correct Email Address.","Try again!!");
	}
	else {
		try {
			const response = await fetch(domain + 'student/resetrequest', {
				method: 'PUT',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					rollno: regNo,
					email: email
				})
			});
			const data = await response.json();
			if(response.status === 200) {
				showSuccess("Success",data.message,"");
			}
			else if(response.status === 404) {
				showFailMessage("Failed",data.message,"Please try again!");
			}
			else if (!response.ok) {
				throw new Error(data.message);
			}
		}
		catch(error) {
			showFailMessage("Error","Internal Server Error","Please try again!");
		}
	}
}


function showSuccess(title, message1, message2) {
	let popUpContainer = document.createElement('div');
	popUpContainer.classList.add('pop-up-container1');
	let innerContent = `<div class="logo">
            <img src="./Resource/pop up menu icons/tick.png" alt="Logo">
        </div>
        <h1>${title}!</h1>
        <p> ${message1} <br> ${message2}</p>
        <form>
            <button type="button" class="button" onClick="hideSuccess()">Okay</button>
        </form>`;
	popUpContainer.innerHTML = innerContent;
	document.querySelector('body').appendChild(popUpContainer);
}
function hideSuccess() {
	window.location.reload();
}




function facultyResetPassword() {	
	let resendContainerMaster = document.createElement('div');
	resendContainerMaster.classList.add('resend-container-master');
	resendContainerMaster.innerHTML = `<div class="resend-container">
        <button class="resend-close-btn" onClick="closeStudentResetPassword()">X</button>
        
        <h2 class="resend-title">Password Reset</h2>
        
        <form class="resend-form">
            <label for="reg-number" class="resend-label">Mobile Number:</label>
            <input type="number" id="reg-number" name="reg-number" class="resend-input" required>
            <label for="email" class="resend-label">Email Address:</label>
            <input type="email" id="email" name="email" class="resend-input" required>
            <div class="resend-button-container">
                <button type="button" class="resend-send-btn" onClick="sendFacultyResetRequest()">Send</button>
                <button type="button" class="resend-cancel-btn" onClick="closeFacultyResetPassword()">Cancel</button>
            </div>
        </form>
    </div>`;
	document.querySelector('body').appendChild(resendContainerMaster);
}
function closeFacultyResetPassword() {
	document.querySelector('.resend-container-master').remove();
}



async function sendFacultyResetRequest() {
	const mobileno = document.querySelector('.resend-form #reg-number').value;
	const email = document.querySelector('.resend-form #email').value;
	if(mobileno.length != 10) {
		showFailMessage("Error","Please Enter the Correct Mobile Number.","Try again!!");
	}
	else if(email.trim() === "") {
		showFailMessage("Error","Please Enter the Correct Email Address.","Try again!!");
	}
	else {
		try {
			const response = await fetch(domain + 'faculty/resetrequest', {
				method: 'PUT',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					mobileno: mobileno,
					email: email
				})
			});
			const data = await response.json();
			if(response.status === 200) {
				showSuccess("Success",data.message,"");
			}
			else if(response.status === 404) {
				showFailMessage("Failed",data.message,"Please try again!");
			}
			else if (!response.ok) {
				throw new Error(data.message);
			}
		}
		catch(error) {
			showFailMessage("Error","Internal Server Error","Please try again!");
		}
	}
}

