let domain = "http://192.168.1.5:8080/";

let jwt_token = JSON.parse(localStorage.getItem('token')).jwt_token;
let userName = JSON.parse(localStorage.getItem('userName'));

let student = {
    name:null,
    rollno:null,
    year:null,
    semester:null,
    department:null,
	email:null,
	mobileno:null
}

function openSideBar() {
    let sideBar = document.querySelector('.side-bar');
    if(!sideBar.classList.contains('active')) {
        let hamburgerButton = document.querySelector('.hamburger-btn');
        let xButton = document.querySelector('.x-btn');
        sideBar.style.display = 'flex';
        setTimeout(() => { sideBar.classList.add('active'); }, 10); 
        xButton.style.width = '20px';
        xButton.style.height = '20px';
        hamburgerButton.style.width = '0px';
        hamburgerButton.style.height = '0px';
    }
}
function closeSideBar() {
    let sideBar = document.querySelector('.side-bar');
    if (sideBar.classList.contains('active')) {
        let hamburgerButton = document.querySelector('.hamburger-btn');
        let xButton = document.querySelector('.x-btn');
        sideBar.classList.remove('active');
        setTimeout(() => { sideBar.style.display = 'none'; }, 500); 
        hamburgerButton.style.width = '25px';
        hamburgerButton.style.height = '25px';
        xButton.style.width = '0px';
        xButton.style.height = '0px';
    }
}
function toggleMainBar(choice) {
    let navElement = document.querySelectorAll('.element');
    navElement.forEach(element=> {
        if(element.classList.contains('side-bar-element-active')) {
            element.classList.remove('side-bar-element-active');
        }
    });
    let mainBar = document.querySelector('.main-bar');
    switch(choice) {
        case 1:
            mainBar.innerHTML = `
            <h1>Home Tab is under development</h1>
            `;
            break;
        case 2:
            mainBar.innerHTML = `
            <div class="Assesment-details">
            <p>Total Assesment : 4</p>
            <p>Unfinished Assesment : 1</p>
        </div>
        <p class="ufa-head">Unfinished Assessment</p>
        <div class="assessment-tab">
        </div>
        <p class="ufa-head">Finished Assessment</p>
        <div class="assessment-tab">
        </div>
            `;
            assessmentCalculation();
            break;
            case 4:
                mainBar.innerHTML = <div class="job-post-container"></div>;
                getJobPost(-1);
                break;
            case 5:
                mainBar.innerHTML = `<div class="event-container">
                </div>`;
                getEvents(-1);
                break;
            case 6:
                mainBar.innerHTML = `<div class="profile-container">
            <h2>Your Account</h2>
            <form id="profileForm">
                <div class="profile-field">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" readonly value="${student.name}">
                </div>
    
                <div class="profile-field">
                    <label for="roll-number">Register Number:</label>
                    <input type="text" id="roll-number" name="roll-number" placeholder="Your Register Number"
                        readonly value="${student.rollno}">
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
                    <input type="email" id="email" name="email" placeholder="Your E-mail" readonly value="${student.email==null?"":student.email}">
                </div>
    
                <div class="profile-field">
                    <label for="phone">Mobile Number:</label>
                    <input type="number" id="phone" name="phone" placeholder="Your Mobile Number" readonly value="${student.mobileno==0?"":student.mobileno}">
                </div>
            </form>
            <button class="edit-button" onclick="editProfile()">Edit Profile</button>
        </div>
        
    `
    let options = document.querySelectorAll('.profile-field select option');
            switch(student.department) {
                case 'CSE': options[0].selected = true; break;
                case 'ECE': options[1].selected = true; break;
                case 'GEO': options[2].selected = true; break;
                case 'MECH': options[3].selected = true; break;
                case 'AIDS': options[4].selected = true; break;
            }
    break;
    }
    navElement[choice-1].classList.add('side-bar-element-active');
    if(window.innerWidth <= 480) {
        closeSideBar();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the username from localStorage
    let username = localStorage.getItem("username");

    // If a username is found, insert it into the placeholder, otherwise show a default message
    if (username) {
        document.getElementById("username-placeholder").textContent = username;
    } else {
        document.getElementById("username-placeholder").textContent = "Student";
    }

    // Attach click event listener to the bell button
    document.querySelector(".responsive-btn-bell").addEventListener("click", toggleMotionWindow);

    // Check for new announcements and update the red dot
    updateNotificationDot();

    // 🚀 New Code for Navigating to Assessment Page on "Today's Task" Click
    let todaysTaskButton = document.querySelector('.todays-task-btn'); // Update selector here
    if (todaysTaskButton) { 
        todaysTaskButton.addEventListener('click', function() {
            toggleMainBar(2); // Load the Assessment page
        });
    }
});

// Function to toggle the announcement window
function toggleMotionWindow() {
    const motionWindow = document.getElementById("motion-window");
    const overlay = document.getElementById("overlay");

    if (motionWindow.classList.contains("active")) {
        motionWindow.classList.remove("active");
        overlay.classList.remove("active");

        // Remove red dot when the user checks the announcements
        localStorage.setItem("newAnnouncements", "false");
        updateNotificationDot();
    } else {
        motionWindow.classList.add("active");
        overlay.classList.add("active");
    }
}

// Function to check and update the notification red dot
function updateNotificationDot() {
    const notificationDot = document.getElementById("notification-dot");
    const newAnnouncements = localStorage.getItem("newAnnouncements");

    if (newAnnouncements === "true") {
        notificationDot.style.display = "block"; // Show the red dot
    } else {
        notificationDot.style.display = "none"; // Hide the red dot
    }
}

// Function to simulate new announcements
function addNewAnnouncement() {
    console.log("New announcement added!"); // Debugging log
    localStorage.setItem("newAnnouncements", "true");
    updateNotificationDot();
}
// Function to fetch the latest event and display it in the event-box
async function loadLatestEvent() {
    try {
        // Fetch latest event
        const response = await fetch(domain + event/getevent?offset=0&limit=1, {
            method: 'GET',
            headers: {
                "Authorization": Bearer ${jwt_token}, 
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }

        const data = await response.json();
        if (!data.datas || data.datas.length === 0) {
            console.warn("No events found.");
            return;
        }

        let latestEvent = data.datas[0]; // Get the first event

        // Select event-box container
        const eventBox = document.querySelector(".event-box");
        if (!eventBox) {
            console.error("Error: .event-box not found");
            return;
        }

        // Create event poster image
        const posterImage = document.createElement("img");
        posterImage.src = latestEvent.eventFiles.length > 0 
            ? ${domain}event/getimage/${latestEvent.eventFiles[0]} 
            : "https://via.placeholder.com/500"; // Fallback image
        posterImage.alt = "Event Poster";
        posterImage.classList.add("event-poster");

        // Remove existing posters if any
        const existingPoster = eventBox.querySelector(".event-poster");
        if (existingPoster) {
            eventBox.removeChild(existingPoster);
        }

        // Insert the poster before the button
        const button = eventBox.querySelector(".responsive-btn");
        if (button) {
            eventBox.insertBefore(posterImage, button);
        } else {
            eventBox.appendChild(posterImage);
        }

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", loadLatestEvent);
async function loadLatestJobPostTitle() {
    try {
        const response = await fetch(domain + jobpost/getjobpost?offset=0, {
            method: 'GET',
            headers: {
                "Authorization": Bearer ${jwt_token}, 
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }

        const data = await response.json();

        // Check if job posts exist
        if (data.datas && data.datas.length > 0) {
            let latestJob = data.datas[0]; // Get the latest job post
            let jobTitleElement = document.getElementById("latest-job-title");
            let viewJobBtn = document.getElementById("view-job-btn");

            jobTitleElement.textContent = latestJob.jobTitle; // Insert job title
            viewJobBtn.style.display = "inline-block"; // Show the button

        } else {
            document.getElementById("latest-job-title").textContent = "No recent job posts.";
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        document.getElementById("latest-job-title").textContent = "Failed to load job post.";
    }
}

// Call function when the page loads
document.addEventListener("DOMContentLoaded", loadLatestJobPostTitle);

function assessmentDetails(unfinish, finish) {
    let assessmentDetail = document.querySelector('.Assesment-details');
    assessmentDetail.innerHTML = `
        <p>Total Assesment : ${unfinish.datas.length + finish.datas.length}</p>
        <p>Unfinished Assesment : ${unfinish.datas.length}</p>
    `;
}

function UnfinishedAssessmentTab(data) {
    let unfinishedTab = document.querySelector('.assessment-tab');
    unfinishedTab.innerHTML = '';
    for(let i=0; i<data.datas.length; i++) {
        unfinishedTab.innerHTML += `
        <div class="assessment">
                <p class="test-title">${i+1}.${data.datas[i].name}</p>
                <p class="qid">${data.datas[i].questionId}</p>
                <button onClick="takeTest(event)">Take Test</button>
            </div>
        `;
    }
}

function finishedAssessmentTab(data) {
    let finishedTab = document.querySelectorAll('.assessment-tab')[1];
    finishedTab.innerHTML = '';
    for(let i=0; i<data.datas.length; i++) {
        finishedTab.innerHTML += `
            <div class="assessment">
                <p>${i+1}.${data.datas[i].questionName}</p>
                <p>Your Mark : ${data.datas[i].markpercentage}%</p>
            </div>
        `;
    }
}
async function assessmentCalculation() {
    try {
        const unfinishedResponse = await fetch(domain+answers/getunfinished?rollno=${JSON.parse(localStorage.getItem('student')).rollno}, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Bearer ${jwt_token}
            }
        });

        if(!unfinishedResponse.ok) {
            
        }

        const unfinishedData = await unfinishedResponse.json();

        const answerResponse = await fetch(domain+answers/getmark?rollno=${JSON.parse(localStorage.getItem('student')).rollno})

        if(!answerResponse.ok) {
            
        }

        const answerData = await answerResponse.json();

        assessmentDetails(unfinishedData, answerData);
        UnfinishedAssessmentTab(unfinishedData);
        finishedAssessmentTab(answerData);
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

async function takeTest(event) {
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `
            <h1 class="exam-title"></h1>
        <p class="exam-no-of-questions">Total Question : 0</p>
        <form action="" class="questions-container">

            
        </form>
            `;
    
    let qid = event.target.parentElement.querySelector('.qid').textContent;
    let testTitle = event.target.parentElement.querySelector('.test-title').textContent;

    let data = await getQuestions(qid)

    document.querySelector('.exam-title').textContent = testTitle;
    document.querySelector('.exam-no-of-questions').textContent = Total Question : ${data.datas.length};

    let questionsContainer = document.querySelector('.questions-container');

    questionsContainer.innerHTML = '';

    for(let i=0; i<data.datas.length; i++) {
        if(data.datas[i].type === "MCQ") {
            questionsContainer.innerHTML += `
            <div class="questions-mcq">
                <h4>${i+1}. ${data.datas[i].question}</h4>
                <div class="options">
                    <input type="radio" name="${data.datas[i].uniqueid}" id="ansid${i+1}_1" value="${data.datas[i].a}">
                    <label for="ansid${i+1}_1">${data.datas[i].a}</label>
                    <input type="radio" name="${data.datas[i].uniqueid}" id="ansid${i+1}_2" value="${data.datas[i].b}">
                    <label for="ansid${i+1}_2">${data.datas[i].b}</label>
                    <input type="radio" name="${data.datas[i].uniqueid}" id="ansid${i+1}_3" value="${data.datas[i].c}">
                    <label for="ansid${i+1}_3">${data.datas[i].c}</label>
                    <input type="radio" name="${data.datas[i].uniqueid}" id="ansid${i+1}_4" value="${data.datas[i].d}">
                    <label for="ansid${i+1}_4">${data.datas[i].d}</label>
                </div>
            </div>
            `;
        }
        else if(data.datas[i].type === "FILLUP") {
            questionsContainer.innerHTML += `
            <div class="questions-fillup">
                <h4><pre><code>${i+1}. ${data.datas[i].question}</code></pre></h4>
                <input type="text" placeholder="Enter your answer" class="fillup-answer-text" name="${data.datas[i].uniqueid}">
            </div>
            `;
        }
    }
    questionsContainer.innerHTML += <button class="submit-test-btn" onClick="addAnswer()">Submit Test</button>;
}

async function getQuestions(qid) {
    try {
        const response = await fetch(domain+questions/getquestions?questionid=${qid});
        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }
        const data = await response.json();

        if(localStorage.getItem("question")) {
            localStorage.removeItem("question");
        }
        localStorage.setItem("question",JSON.stringify(data));

        return data;
        
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}
async function fetchLatestQuestion() {
    try {
        const response = await fetch(domain + questions/getlatest);
        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }
        
        const data = await response.json();
        if (!data || data.datas.length === 0) {
            console.warn("No questions available.");
            return;
        }

        // Extract the latest question (assuming the API returns them in chronological order)
        const latestQuestion = data.datas[data.datas.length - 1];

        // Select the activity container where the latest question should be displayed
        let activityContainer = document.querySelector('.activity-container');

        // Update the container with the latest question
        activityContainer.innerHTML = `
            <img src="https://www.postgrid.co.uk/wp-content/uploads/2024/01/patient-engagement-strategies-in-healthcare-1024x576.jpeg" alt="Activity Image" class="activity-image">
            <h2 class="assessment-side-head">Check your daily tasks and schedules!</h2>
            <p class="latest-question"><strong>Latest Question:</strong> ${latestQuestion.question}</p>
            <button class="assessment-btn todays-task-btn">Today's Task -></button>
        `;

        // Optionally store the latest question in localStorage
        localStorage.setItem("latestQuestion", JSON.stringify(latestQuestion));

    } catch (error) {
        console.error('An error occurred while fetching the latest question:', error.message);
    }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", fetchLatestQuestion);


async function addAnswer() {
    let data = JSON.parse(localStorage.getItem("question"));
    let form = document.querySelector('.questions-container');

    const answers = {};
    const radioGroups = new Set();
    const radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
        radioGroups.add(radio.name);
    });

    radioGroups.forEach((groupName) => {
        const selected = form.querySelector(input[name="${groupName}"]:checked);
        answers[groupName] = selected ? selected.value : null;
    });

    const textInputs = form.querySelectorAll('input[type="text"]');
    textInputs.forEach((input) => {
        answers[input.name] = input.value;
    });

    
    /* console.log(data);
    console.log(answers); */
    let correct = 0;
    for(let i=0; i<data.datas.length; i++) {
        if(data.datas[i].answer === answers[data.datas[i].uniqueid]) {
            correct++;
        }
    }
    let wrong = data.datas.length - correct;
    let markPercentage = (correct/data.datas.length)*100;

    try {
        const response = await fetch(domain+answers/addmark,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                'student':{'rollno':JSON.parse(localStorage.getItem("student")).rollno},
                "questionid":data.datas[0].questionid,
                "markpercentage":markPercentage,
                "correct":correct,
                "wrong":wrong
            })
        });
        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }
        const ansData = await response.json();
        console.log(ansData);
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
    
}

async function getStudent(rollNo) { 
    try {
        const response = await fetch(domain + student/getstudent?rollno=${rollNo}, {
            method: "GET",
            headers: {
                "Authorization": Bearer ${jwt_token}, 
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// add student to local storage
function studentLoc(userData) {
    student.name = userData.datas.name;
    student.rollno = userData.datas.rollno;
    student.year = userData.datas.year;
    student.semester = userData.datas.semester;
    student.department = userData.datas.department;
	student.email = userData.datas.email;
	student.mobileno = userData.datas.mobileno;
    localStorage.setItem('student', JSON.stringify(student));
}

// Function to enable editing of the profile form
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
  
  // Function to save profile after editing
async function saveProfile() {
    const inputs = document.querySelectorAll('#profileForm input, #profileForm select');
    if(inputs[0].value.trim().length === 0) {
        showFailMessage("Error","Please Enter Your Name.","Try again!!");
    }
    else if(inputs[1].value.length != 12) {
        showFailMessage("Error","Please Enter the Correct Register Number.","Try again!!");
    }
    else if(inputs[3].value.trim().length === 0) {
        showFailMessage("Error","Please Enter Your Email.","Try again!!");
    }
    else if(inputs[4].value.length != 10) {
        showFailMessage("Error","Please Enter Your Mobile Number.","Try again!!");
    }
    else {
        try {
            const response = await fetch(domain+'student/updatestudent', {
                method: 'PUT',
                headers: {
                    "Authorization": Bearer ${jwt_token}, 
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    'rollno': inputs[1].value,
                    'name': inputs[0].value.trim(),
                    'year': student.year,
                    'department': inputs[2].value,
                    'mobileno': inputs[4].value,
                    'email': inputs[3].value
                })
            });
            const data = await response.json();
            if(response.status === 200) {
                showSuccessMessage("Success",data.message,"");
                const userData = await getStudent(inputs[1].value);
                studentLoc(userData);
            }
            else if(response.status === 404) {
                showFailMessage("Error",data.message,"Please Enter the Correct Register Number");
            }
            else if (!response.ok) {
                throw new Error(Error: ${response.status} - ${response.statusText});
            }
            
            inputs.forEach(input => {
            input.style.color = "rgb(93, 93, 93)";
            input.readOnly = true;
            input.disabled = true;
            });
    
            
        
            const editButton = document.querySelector('.edit-button');
            editButton.textContent = "Edit Profile";
            editButton.setAttribute('onclick', 'editProfile()');
        }
        catch(error) {
            showFailMessage("Error","Internal Server Error","Please try again!");
        }
    }
}



async function getStudentLoc() {
    try {
        const studentData = await getStudent(userName);
        studentLoc(studentData);
    }
    catch {
        console.error('An error occurred:', error.message);
    }
}
getStudentLoc();








function openImage(event) {
    let image;
    if (event.target.tagName === 'IMG') {
        image = event.target;
    } else {
        image = event.target.querySelector('img');
    }
    imageSource = image.src;
    imageOpenMaster = document.createElement('div');
    imageOpenMaster.classList.add('image-open-master');
    imageOpenMaster.innerHTML = `<div class="image-open">
        <div class="x-btn" onclick="closeImage()">X</div>
        <img src="${imageSource}" alt="">
        </div>`

    document.body.appendChild(imageOpenMaster);
}
function closeImage() {
    document.querySelector('.image-open-master').remove();
}


var eventData = [];
async function getEvents(value) {
    if(value === -1) {   //reset
        eventData = [];
    }
    try {
        const response = await fetch(domain+event/getevent?offset=${eventData.length}, {
            method: 'GET',
            headers: {
                "Authorization": Bearer ${jwt_token}, 
                'Content-type':'application/json'
            }
        });
        if(!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
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
    eventContainer.innerHTML = <h1>Upcoming Events</h1>;
    eventData.forEach(element=> {
        let a = `
            <div class="event" onClick="openEvent(event)">
                <h2 class="event-title">${element.eventTitle}</h2>
                <img src="${element.eventFiles.length!=0?domain+"event/getimage/"+element.eventFiles[0]:''}" alt="">
                <div class="event-info">
                ${(element.eventDateFrom=="" && element.eventDateTo=="" && element.eventTimeFrom=="" && element.eventTimeTo=="")?"":`<div class="event-date-time">
                        <img src="../Resource/Event icons/calendar.png" alt="Calendar Icon">
                        <p>${element.eventDateFrom!="" ? element.eventDateFrom.substring(8,10)+"-"+element.eventDateFrom.substring(5,7)+"-"+element.eventDateFrom.substring(0,4):""} ${element.eventTimeFrom!="" ? element.eventTimeFrom.substring(0,2) <= 12?element.eventTimeFrom+"AM":(element.eventTimeFrom.substring(0,2)-12)+element.eventTimeFrom.substring(2)+"PM":""} - ${element.eventDateTo!="" ? element.eventDateTo.substring(8,10)+"-"+element.eventDateTo.substring(5,7)+"-"+element.eventDateTo.substring(0,4):""} ${element.eventTimeTo!="" ? element.eventTimeTo.substring(0,2) <= 12?element.eventTimeTo+"AM":(element.eventTimeTo.substring(0,2)-12)+element.eventTimeTo.substring(2)+"PM": ""}</p>
                    </div>`}
                    ${element.eventLocation!="" ? `<div class="event-location">
                        <img src="../Resource/Event icons/location.png" alt="Location Icon">
                        <p>${element.eventLocation}</p>
                    </div>`:""}
                </div>
                <p class="event-description">
                    ${element.eventDescription.trim()!=""?element.eventDescription:element.eventContent.substring(0,100)+"...<span id='read-more-txt'>(read-more)</span>"}
                </p>
                <p class="event-author"><span>Posted by:</span> ${element.postedBy}</p>
            </div>
        `;
        eventContainer.innerHTML += a;
        
    });
    eventContainer.innerHTML += <button onClick="getEvents(1)">More</button>;
}


function wrapLinks(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
}
function openEvent(event) {
    let mainBar = document.querySelector('.main-bar');
    let eventContainer = document.querySelector('.event-container');
    let currentEvent = event.currentTarget;
    let index = Array.from(eventContainer.children).indexOf(currentEvent)-1;

    mainBar.innerHTML = `
            <div class="event-in">
            <p class="event-in-exit-btn" onClick="toggleMainBar(5)"> X </p>
            <h2>${eventData[index].eventTitle}</h2>
            <div class="event-image-container"> 
            </div>
            </div>`;
    
    eventData[index].eventFiles.forEach(name => {
        document.querySelector('.event-image-container').innerHTML += `
        <button onclick="openImage(event)"><img src="${domain+"event/getimage/"+name}" alt=""></button>
        `;
    })

    document.querySelector('.event-in').innerHTML += `</div> <pre> ${wrapLinks(eventData[index].eventContent)} </pre>
    ${eventData[index].eventDateFrom==""&&eventData[index].eventDateTo==""&&eventData[index].eventTimeFrom==""&&eventData[index].eventTimeFrom==""?""&&eventData[index].eventLocation=="":`<div class="event-in-info">
                <h3>Date and Location</h3>
                ${(eventData[index].eventDateFrom=="" && eventData[index].eventDateTo=="" && eventData[index].eventTimeFrom=="" && eventData[index].eventTimeTo=="")?"":`<div class="event-date-time">
                        <img src="../Resource/Event icons/calendar.png" alt="Calendar Icon">
                        <p>${eventData[index].eventDateFrom!="" ? eventData[index].eventDateFrom.substring(8,10)+"-"+eventData[index].eventDateFrom.substring(5,7)+"-"+eventData[index].eventDateFrom.substring(0,4):""} ${eventData[index].eventTimeFrom!="" ? eventData[index].eventTimeFrom.substring(0,2) <= 12?eventData[index].eventTimeFrom+"AM":(eventData[index].eventTimeFrom.substring(0,2)-12)+eventData[index].eventTimeFrom.substring(2)+"PM":""} - ${eventData[index].eventDateTo!="" ? eventData[index].eventDateTo.substring(8,10)+"-"+eventData[index].eventDateTo.substring(5,7)+"-"+eventData[index].eventDateTo.substring(0,4):""} ${eventData[index].eventTimeTo!="" ? eventData[index].eventTimeTo.substring(0,2) <= 12?eventData[index].eventTimeTo+"AM":(eventData[index].eventTimeTo.substring(0,2)-12)+eventData[index].eventTimeTo.substring(2)+"PM": ""}</p>
                    </div>`}

                    ${eventData[index].eventLocation!="" ? `<div class="event-location">
                        <img src="../Resource/Event icons/location.png" alt="Location Icon">
                        <p>${eventData[index].eventLocation}</p>
                    </div>`:""}</div>
                `}
                ${eventData[index].applyLink!=""?<a href="${eventData[index].applyLink}" target="_blank">Apply</a>:""}
            <p class="event-author"><span>Posted by : </span> ${eventData[index].postedBy}</p>
        </div>
    `;
} 


var jobPostData = [];
async function getJobPost(value) {
    if(value === -1) {   //reset
        jobPostData = [];
    }
    try {
        const response = await fetch(domain+jobpost/getjobpost?offset=${jobPostData.length}, {
            method: 'GET',
            headers: {
                "Authorization": Bearer ${jwt_token}, 
                'Content-type':'application/json'
            }
        });
        if(!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }
        const data = await response.json();
        let temp = data.datas;
        if(temp!=null) {
            for(let i=0; i < temp.length; i++) {
                jobPostData.push(temp[i]);
            }
        }
        jobPostContainerFunc(jobPostData);
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}
function jobPostContainerFunc(jobPostData) {
    let jobPostContainer = document.querySelector('.job-post-container');
    jobPostContainer.innerHTML = <h1>Upcoming Jobs</h1>;
    jobPostData.forEach(element=> {
        let a = `
            <div class="job-post" onClick="openJobPost(event)">
                <h2 class="job-post-title">${element.jobPostTitle}</h2>
                 <img src="${element.jobPostFiles.length!=0?domain+"jobpost/getimage/"+element.jobPostFiles[0]:''}" alt=""> 
                
                <p class="job-post-description">
                    ${element.jobPostDescription.trim()!=""?element.jobPostDescription:element.jobPostContent.substring(0,100)+"...<span id='read-more-txt'>(read-more)</span>"}
                </p>
                <p class="job-post-author"><span>Posted by:</span> ${element.postedBy}</p>
            </div>
        `;
        jobPostContainer.innerHTML += a;
        
    });
    jobPostContainer.innerHTML += <button onClick="getJobPost(1)">More</button>;
}
function openJobPost(event) {
    let mainBar = document.querySelector('.main-bar');
    let jobPostContainer = document.querySelector('.job-post-container');
    let currentJobPost = event.currentTarget;
    let index = Array.from(jobPostContainer.children).indexOf(currentJobPost)-1;
    mainBar.innerHTML = `
            <div class="job-post-in">
            <p class="job-post-in-exit-btn" onClick="toggleMainBar(4)"> X </p>
            <h2>${jobPostData[index].jobPostTitle}</h2>
            <div class="job-post-image-container"> 
            </div>
            </div>`;
    
        jobPostData[index].jobPostFiles.forEach(name => {
        document.querySelector('.job-post-image-container').innerHTML += `
        <button onclick="openImage(event)"><img src="${domain+"jobpost/getimage/"+name}" alt=""></button>
        `;
    })

    document.querySelector('.job-post-in').innerHTML += `</div> <pre> ${wrapLinks(jobPostData[index].jobPostContent)} </pre>
    
                ${jobPostData[index].applyLink!=""?<a href="${jobPostData[index].applyLink}" target="_blank">Apply</a>:""}
            <p class="job-post-author"><span>Posted by : </span> ${jobPostData[index].postedBy}</p>
        </div>
    `;
} 




function showFailMessage(title, message1, message2) {
    let popUpMasterContainer = document.createElement('div');
    popUpMasterContainer.classList.add('pop-up-master-container');
	let innerContent = `<div class="pop-up-container">
            <div class="logo">
            <img src="../Resource/pop up menu icons/cross.png" alt="Logo">
        </div>
        <h1>${title} :(</h1>
        <p> ${message1} <br> ${message2}</p>
        <form>
            <button type="button" class="button" onClick="hideFailMessage()">TRY AGAIN</button>
        </form>
        </div>`;
    popUpMasterContainer.innerHTML = innerContent;
	document.querySelector('body').appendChild(popUpMasterContainer);
}
function hideFailMessage() {
	let popUpMasterContainer = document.querySelector('.pop-up-master-container');
	popUpMasterContainer.remove();
}
function showSuccessMessage(title, message1, message2) {
    let popUpMasterContainer = document.createElement('div');
    popUpMasterContainer.classList.add('pop-up-master-container1');
	let innerContent = `<div class="pop-up-container1">
            <div class="logo">
            <img src="../Resource/pop up menu icons/tick.png" alt="Logo">
        </div>
        <h1>${title}!</h1>
        <p> ${message1} <br> ${message2}</p>
        <form>
            <button type="button" class="button" onClick="hideSuccessMessage()">Okay</button>
        </form>
        </div>`;
    popUpMasterContainer.innerHTML = innerContent;
	document.querySelector('body').appendChild(popUpMasterContainer);
}
function hideSuccessMessage() {
	let popUpMasterContainer = document.querySelector('.pop-up-master-container1');
	popUpMasterContainer.remove();
}





function openLogOutMenu() {
    let logOutMenuMasterContainer = document.createElement('div');
    logOutMenuMasterContainer.classList.add('log-out-menu-master-container');
    logOutMenuMasterContainer.innerHTML = `<div class="log-out-menu-container">
        <div class="box">
            <img src="../Resource/pop up menu icons/exclamation-mark.jpg" alt="!!!" class="logo">
            <p>Are you sure you want to sign out?</p>
            <div class="buttons">
                <button class="ok-btn" onClick="logOut()">Ok</button>
                <button class="cancel-btn" onClick="closeLogOutMenu()">Cancel</button>
            </div>
        </div>
    </div>`;
    if(window.innerWidth <= 480) {
        closeSideBar();
    }
    document.querySelector('body').appendChild(logOutMenuMasterContainer);
}
function closeLogOutMenu() {
    let logOutMenu = document.querySelector('.log-out-menu-master-container');
    logOutMenu.remove();
}
function logOut() {
    localStorage.clear();
    window.location.href = "../index.html";
}