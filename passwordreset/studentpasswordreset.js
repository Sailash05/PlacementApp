domain = 'http://192.168.1.5:8080/';

async function changePassword() {
    let rollno = document.querySelector('#Register-no').value;
    let password = document.querySelector('#new-password').value;
    let confirmPassword = document.querySelector('#re-enter-password').value;

    const url = window.location.href;
    const urlParams = new URL(url);
    const token = urlParams.searchParams.get("token");

    if(password.trim() != confirmPassword.trim()) {
        showFailMessage("Error","Password must be same as confirm password", "Try Again!!");
    }
    else if(rollno.length != 12) {
        showFailMessage("Error","Please Enter the Valid Register Number" ,"Try Again");
    }
    else {
        try {
            const response = await fetch(domain + 'student/resetpassword', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rollno: rollno,
                    password: password
                })
            });
            const data = await response.json();
            if(response.status === 201) {
                showSuccessMessage("Success",data.message,"");
            }
            else if(response.status === 403) {
                showFailMessage("Failed",data.message,"Please Enter the Correct Register Number");
            }
            else if(!response.ok) {
                throw new Error(data.message);
            }
        }
        catch(error) {
            showFailMessage("Error","Internal Server Error","Please try again!");
        }
    }
}


function showFailMessage(title, message1, message2) {
	let popUpContainer = document.createElement('div');
	popUpContainer.classList.add('pop-up-container');
	let innerContent = `<div class="logo">
            <img src="../Resource/pop up menu icons/cross.png" alt="Logo">
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
            <img src="../Resource/pop up menu icons/tick.png" alt="Logo">
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
	window.close();
}
