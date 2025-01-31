let domain = "http://192.168.1.5:8080/";

let jwt_token = JSON.parse(localStorage.getItem('token')).jwt_token;
let userName = JSON.parse(localStorage.getItem('userName'));

let faculty = {
    name:null,
    department:null,
    mobileno:null,
	email:null
}

function toggleSideBar() {
    let sideBar = document.querySelector('.side-bar');
    let hamburgerButton = document.querySelector('.hamburger-btn');
    let xButton = document.querySelector('.x-btn');

    if(sideBar.style.display === 'none') {
        sideBar.style.display = 'flex';
        xButton.style.width = '20px';
        xButton.style.height = '20px';
        hamburgerButton.style.width = '0px';
        hamburgerButton.style.height = '0px';
    }
    else {
        sideBar.style.display = 'none';
        hamburgerButton.style.width = '25px';
        hamburgerButton.style.height = '25px';
        xButton.style.width = '0px';
        xButton.style.height = '0px';
    }
}

async function toggleMainBar(choice) {
    let mainBar = document.querySelector('.main-bar');
    switch(choice) {
        case 1:
            mainBar.innerHTML = `
            <h1>Home Tab is under development</h1>
            `;
            break;
        case 2:
            mainBar.innerHTML = `
            <form class="post-assessment">
            <h2>Post Assesment</h2>
            <input type="text" name="" id="name" placeholder="Assessment Name" class="question-title">
            <input type="file" name="" id="file" class="question-file">
            <button onclick="postQuestion()">Post</button>
        </form>



        <div class="Assesment-details">
            <p>Total Assesment : 4</p>
        </div>
        <p class="ufa-head">Previous Assessment</p>
        <div class="assessment-tab">
            <div class="assessment">
                <p>1.Java MCQ</p>
                <button>View Questions</button>
            </div>
        </div>
            `;
            await getQuestionTitle();
            break;
        
        case 3:
            mainBar.innerHTML = `<h1>Students Mark</h1>
        <div class="filter-container">
            <h3>Filter : </h3>
            <form action="" class="filter">
                <select name="departmentSelect" id="departmentSelect">
                    <option value="" disabled selected>Department</option>
                    <option value="ALL">ALL</option>
                    <option value="CSE">CSE</option>
                    <option value="AIDS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="GEO">GEO</option>
                </select>
                <br>
                <select name="year" id="year">
                    <option value="" disabled selected>Year</option>
                    <option value="0">ALL</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fouth Year</option>
                </select>
                <br>
                <input type="number" name="questionid" id="questionid" placeholder="Question Id" value="0">
                <br>
                <select name="topr" id="top">
                    <option value="" disabled selected>Top</option>
                    <option value="3">Top 3</option>
                    <option value="10">Top 10</option>
                    <option value="20">Top 20</option>
                    <option value="30">Top 30</option>
                    <option value="0">All</option>
                </select>
                <button type="button" onclick="getMarkFilter()">Filter</button>
            </form>
        </div>
        <div class="mark-list">
        </div>`;
        await getMarkFilter();
        break;

        case 4:
            mainBar.innerHTML = `<h1>Defaulters List</h1>
        <div class="filter-container">
            <h3>Filter : </h3>
            <form action="" class="filter">
                <select name="departmentSelect" id="departmentSelect">
                    <option value="" disabled selected>Department</option>
                    <option value="ALL">ALL</option>
                    <option value="CSE">CSE</option>
                    <option value="AIDS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="GEO">GEO</option>
                </select>
                <br>
                <select name="year" id="year">
                    <option value="" disabled selected>Year</option>
                    <option value="0">ALL</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fouth Year</option>
                </select>
                <br>
                <input type="number" name="questionid" id="questionid" placeholder="Question Id" value="0">
                <button type="button" onclick="getDefaulters()">Filter</button>
            </form>
        </div>
        <div class="mark-list">
        </div>`;
        await getDefaulters();
        break;
        case 5:
                mainBar.innerHTML = `<div class="event-container">
            
        </div>`;
        getEvents(-1);
                break;
        case 6:
                mainBar.innerHTML = `
                <div class="profile-container">
            <h2>Your Account</h2>
            <form id="profileForm">
                <div class="profile-field">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" readonly value="${faculty.name}">
                </div>
    
    
                <div class="profile-field">
                    <label for="department">Department:</label>
                    <select name="department" id="department" disabled>
                        <option value="CSE">Computer Science and Engineering</option>
                        <option value="ECE">Electronics and Communication Engineering</option>
                        <option value="GEO">Geo-Informatics</option>
                        <option value="MECH">Mechanical Engineering</option>
                        <option value="AIDS">Artificial Intelligence and Data Science</option>
                    </select>
                </div>
    
                <div class="profile-field">
                    <label for="email">Email Address:</label>
                    <input type="email" id="email" name="email" placeholder="Your E-mail" readonly value="${faculty.email==null?"":faculty.email}">
                </div>
    
                <div class="profile-field">
                    <label for="phone">Phone Number:</label>
                    <input type="number" id="phone" name="phone" placeholder="Your Mobile Number" readonly value="${faculty.mobileno==0?"":faculty.mobileno}">
                </div>
            </form>
            <button class="edit-button" onclick="editProfile()">Edit Profile</button>
        </div>
                `;
            let options = document.querySelectorAll('.profile-field select option');
            switch(faculty.department) {
                case 'CSE': options[0].selected = true; break;
                case 'ECE': options[1].selected = true; break;
                case 'GEO': options[2].selected = true; break;
                case 'MECH': options[3].selected = true; break;
                case 'AIDS': options[4].selected = true; break;
            }
    break;

    }
    if(window.innerWidth <= 480) {
        toggleSideBar();
    }
}

async function postQuestion() {
    let questionTitle = document.querySelector('.question-title').value;
    let questionFile = document.querySelector('.question-file');
    if(questionFile.files.lenght<=0) {
        console.log("No file selected");
    }
    else {
        let file = questionFile.files[0];
        const formData = new FormData();
        formData.append('name', questionTitle);
        formData.append('questions', file);
        try {
            const response = await fetch(domain+'questions/addquestionsfile',{
                method: 'POST',
                body: formData
            });
            if(!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
        }
        catch(error) {
            console.error('An error occurred:', error.message);
        }
    }
}

async function getQuestionTitle() {
    try {
        const response = await fetch(domain+'questions/getquestionstitle');
        if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        document.querySelector('.Assesment-details').querySelector('p').textContent = `Total Assesment : ${data.datas.length}`;

        let assessmentTab = document.querySelector('.assessment-tab');
        assessmentTab.innerHTML = '';
        for(let i=0; i<data.datas.length; i++) {
            assessmentTab.innerHTML += `
            <div class="assessment">
                <p>${i+1}.${data.datas[i].name}</p>
                <p class="qid">${data.datas[i].questionid}</p>
                <button>View Questions</button>
            </div>
            `;
        }
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}


async function getMarkFilter() {
    let dept = document.querySelector('#departmentSelect').value;
    let year = document.querySelector('#year').value;
    let qid = document.querySelector('#questionid').value;
    let topno = document.querySelector('#top').value;
    dept = dept || "ALL";  
    year = year || "0";    
    qid = qid || "0";    
    topno = topno || "0"; 
    try {
        const response = await fetch(domain+`answers/getmarkfilter?dept=${dept}&year=${year}&qid=${qid}&top=${topno}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        
        let markList = document.querySelector('.mark-list');
        markList.innerHTML = '';

        for(let i=0; i<data.datas.length; i++) {
            markList.innerHTML += `
            <div class="marks">
                <div class="left">
                    <p><strong>Name:</strong> ${data.datas[i].name}</p>
                    <p><strong>Rollno:</strong> ${data.datas[i].rollno}</p>
                    <p><strong>Dept:</strong> ${data.datas[i].department}</p>
                </div>
                <div class="right">
                    <p><strong>Year:</strong> ${data.datas[i].year}</p>
                    <p class="mark">Mark: ${data.datas[i].markPercentage}%</p>
                    <p><strong>Question id:</strong> ${data.datas[i].questionid}</p>
                </div>
            </div>
            `;
        }
        
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

async function getDefaulters() {
    let dept = document.querySelector('#departmentSelect').value;
    let year = document.querySelector('#year').value;
    let qid = document.querySelector('#questionid').value;
    dept = dept || "ALL";  
    year = year || "0";    
    qid = qid || "0";    
    try {
        const response = await fetch(domain+`answers/getdefaulters?dept=${dept}&year=${year}&qid=${qid}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        let markList = document.querySelector('.mark-list');
        markList.innerHTML = '';

        for(let i=0; i<data.datas.length; i++) {
            markList.innerHTML += `
            <div class="marks">
                <div class="left">
                    <p><strong>Name:</strong> ${data.datas[i].name}</p>
                    <p><strong>Rollno:</strong> ${data.datas[i].rollno}</p>
                    <p><strong>Dept:</strong> ${data.datas[i].department}</p>
                </div>
                <div class="right">
                    <p><strong>Year:</strong> ${data.datas[i].year}</p>
                    <p class="nomark">Mark: 0%</p>
                    <p><strong>Question id:</strong> ${data.datas[i].questionId}</p>
                </div>
            </div>
            `;
        }
        
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}







/* 
async function viewQuestions(event) {

    let qid = event.target.parentElement.querySelector('.qid').textContent;
    let testTitle = event.target.parentElement.querySelector('.test-title').textContent;

    let data = await getQuestions(qid);

}


async function getQuestions(qid) {
    try {
        const response = await fetch(domain+`questions/getquestions?questionid=${qid}`);
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


 */







async function getFaculty(mobileno, token) {
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
}


function facultyLoc(facultyData) {
    faculty.name = facultyData.datas.name;
    faculty.department = facultyData.datas.department;
    faculty.mobileno = facultyData.datas.mobileno;
	faculty.email = facultyData.datas.email;
    localStorage.setItem('faculty',JSON.stringify(faculty));
}


function editProfile() {
    const inputs = document.querySelectorAll('#profileForm input, #profileForm select');
    
    // Enable editing by setting readOnly and disabled properties to false
    inputs.forEach(input => {
      input.style.color = "black";
      input.readOnly = false;
      input.disabled = false; // Enables the select element as well
    });
  
    // Change button text to "Save Changes"
    const editButton = document.querySelector('.edit-button');
    editButton.textContent = "Save Changes";
    editButton.setAttribute('onclick', 'saveProfile()');
}

async function saveProfile() {
    const inputs = document.querySelectorAll('#profileForm input, #profileForm select');
    try {
        const response = await fetch(domain+'faculty/updatefaculty', {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${jwt_token}`, 
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                'name': inputs[0].value,
                'department': inputs[1].value,
                'mobileno': inputs[3].value,
                'email': inputs[2].value
            })
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const ansData = await response.json();
         // Disable editing by setting readOnly and disabled properties to true
        inputs.forEach(input => {
        input.style.color = "rgb(93, 93, 93)";
        input.readOnly = true;
        input.disabled = true; // Disables the select element
        });

        const userData = await getFaculty(inputs[3].value);
        facultyLoc(userData);
    
        // Change button text back to "Edit"
        const editButton = document.querySelector('.edit-button');
        editButton.textContent = "Edit Profile";
        editButton.setAttribute('onclick', 'editProfile()');
    
        alert('Profile updated successfully!');
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
  }



  async function getFacultyLoc() {
    try {
        const facultyData = await getFaculty(userName);
        facultyLoc(facultyData);
    }
    catch {
        console.error('An error occurred:', error.message);
    }
}

getFacultyLoc();





function addEventOpen() {
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `
    <form class="add-event-form">
            <h2>Add Event</h2>
            <div class="add-event-field">
                <label for="event-title">Event Title : </label>
                <input type="text" id="event-title" name="event-title">
            </div>

            <div class="add-event-field">
                <label for="event-description">Event Description : </label>
                <input type="text" id="event-description" name="event-description">
            </div>

            <div class="add-event-field">
                <label for="event-location">Event Location : </label>
                <input type="text" id="event-location" name="event-location">
            </div>

            <div class="add-event-field add-event-field-date">
                <p>Event Date</p>
                <label for="event-date-from">From: </label>
                <input type="date" id="event-date-from" name="event-date-from">
                <label for="event-date-to">To:(optional) </label>
                <input type="date" id="event-date-to" name="event-date-to">
            </div>
            <div class="add-event-field add-event-field-time">
                <p>Event Time</p>
                <label for="event-time-from">From: </label>
                <input type="time" id="event-time-from" name="event-time-from">
                <label for="event-time-to">To:(optional) </label>
                <input type="time" id="event-time-to" name="event-time-to">
            </div>

            <div class="add-event-field">
                <label for="event-apply-link">Apply Link : </label>
                <input type="text" id="event-apply-link" name="event-apply-link">
            </div>

            <div class="add-event-field">
                <p>Event Content : </p>
                <textarea name="event-content" id="event-content"></textarea>
            </div>
            <div class="add-event-field">
                <label for="event-images">Event Images : </label>
                <input type="file" id="event-images" name="event-images" multiple>
            </div>
            <div class="buttons">
                <button class="cancel-btn" onClick="toggleMainBar(5)">Cancel</button>
                <button class="add-event-btn" onClick="addEvent(event)">Add Event</button>
            </div>
        </form>
    `;
}


// Function to handle form submission
async function addEvent(event) {
    event.preventDefault(); 
    const form = document.querySelector('.add-event-form');
    const formData = new FormData(form);
    formData.append("posted-by", faculty.name);

    try {
        const response = await fetch(domain+'event/addevent',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt_token}`
            },
            body: formData
        });
        if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
    toggleMainBar(5);
}

function openImage(event) {
    let image;
    if (event.target.tagName === 'IMG') {
        image = event.target;
    } else {
        image = event.target.querySelector('img');
    }
    imageSource = image.src;
    imageOpen = document.createElement('div');
    imageOpen.classList.add('image-open');

    imageOpen.innerHTML = `
    <div class="x-btn" onclick="closeImage()">X</div>
    <img src="${imageSource}" alt="">
    `;
    document.body.appendChild(imageOpen);
}
function closeImage() {
    document.querySelector('.image-open').remove();
}


var eventData = [];
async function getEvents(value) {
    if(value === -1) {   //reset
        eventData = [];
    }
    try {
        const response = await fetch(domain+`event/getevent?offset=${eventData.length}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt_token}`, 
                'Content-type':'application/json'
            }
        });
        if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        let temp = data.datas;
        if(temp!=null) {
            for(let i=0; i < temp.length; i++) {
                eventData.push(temp[i]);
            }
        }
        eventContainerFunc(eventData);
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

function eventContainerFunc(eventData) {
    let eventContainer = document.querySelector('.event-container');
    eventContainer.innerHTML = `<h1>Upcoming Events</h1> <p onclick="addEventOpen()">+ New Event</p>`;
    eventData.forEach(element=> {
        let a = `
        <div class="event" onClick="openEvent(event)">
                <h2 class="event-title">${element.eventTitle}</h2>
                <img src="${element.eventFiles.length!=0?domain+"event/getimage/"+element.eventFiles[0]:''}" alt="">
                <div class="event-info">
                    <div class="event-date-time">
                        <img src="../Resource/Event icons/calendar.png" alt="Calendar Icon">
                        <p>${element.eventDateFrom} ${element.eventTimeFrom} - ${element.eventDataTo} ${element.eventTimeTo}</p>
                    </div>
                    <div class="event-location">
                        <img src="../Resource/Event icons/location.png" alt="Location Icon">
                        <p>${element.eventLocation}</p>
                    </div>
                </div>
                <p class="event-description">
                    ${element.eventDescription}
                </p>
                <p class="event-author"><span>Posted by:</span> ${element.postedBy}</p>
            </div>
        `;
        eventContainer.innerHTML += a;
        
    });
    eventContainer.innerHTML += `<button onClick="getEvents(1)">More</button>`;
}

function openEvent(event) {
    let mainBar = document.querySelector('.main-bar');
    let eventContainer = document.querySelector('.event-container');
    let currentEvent = event.currentTarget;
    let index = Array.from(eventContainer.children).indexOf(currentEvent)-2;
    mainBar.innerHTML = `
            <div class="event-in">
            <h2>${eventData[index].eventTitle}</h2>
            <div class="event-image-container"> 
            </div>
            </div>`;
    
    eventData[index].eventFiles.forEach(name => {
        document.querySelector('.event-image-container').innerHTML += `
        <button onclick="openImage(event)"><img src="${domain+"event/getimage/"+name}" alt=""></button>
        `;
    })

    document.querySelector('.event-in').innerHTML += `</div> <pre> ${eventData[index].eventContent} </pre>
    <div class="event-in-info">
                <h3>Date and Location</h3>
                <div class="event-in-date-time">
                    <img src="../Resource/Event icons/calendar.png" alt="Calendar Icon">
                    <p>${eventData[index].eventDateFrom} ${eventData[index].eventTimeFrom} - ${eventData[index].eventDateTo} ${eventData[index].eventTimeTo}</p>
                </div>
                <div class="event-in-location">
                    <img src="../Resource/Event icons/location.png" alt="Location Icon">
                    <p>${eventData[index].eventLocation}</p>
                </div>
            </div>
            <a href="${eventData[index].applyLink}" target="_blank">Apply</a>
            <p class="event-author"><span>Posted by : </span> ${eventData[index].postedBy}</p>
        </div>
    `;
} 






function logOut() {
    localStorage.clear();
    window.location.href = "../index.html";
}