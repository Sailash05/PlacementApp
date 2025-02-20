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
    let navBar = document.querySelector('nav');
    if(navBar.style.backgroundColor == 'rgb(18, 18, 18)') {
        if(window.innerWidth < 480) {
            navBar.style.backgroundColor = '#24244e';
            document.querySelector('nav > h1').style.color = 'white';
        }
        else {
            navBar.style.backgroundColor = 'rgb(238, 238, 238)';
            document.querySelector('nav > h1').style.color = '#416aff';
        }
    }
    let mainBar = document.querySelector('.main-bar');
    switch(choice) {
        case 1:
            mainBar.innerHTML = `
            <div class="home-window">
                <div class="welcome-msg">
                <h1 id="home-welcome-message">Welcome <span id="username-placeholder">Loading...</span> 👋</h1>
                <img src="https://terotam.com/wp-content/uploads/2021/10/Spotless-Work-Order-Management.png" alt="" class="corner-image">
                </div>
            <section id="home-tab-event-section">
                <h2 class="event-heading">🔥 Exclusive Events Just for You!</h2>
                <div class="home-tab-event">
                    <img src="../Resource/Event icons/event.jpeg" alt="">
                    <h2>Hackathon</h2>
                    <p>This is exciting event of hackathon</p>
                </div>
                <button class="event-view-more-btn" onClick="toggleMainBar(5)">View More →</button>
            </section>
            <div class="home-tab-assessment">
                <h2>Your Assessment</h2>
                <div class="home-tab-assessment-container">
                    <h3>Check your tasks and schedules!</h3>
                    <img src="https://www.postgrid.co.uk/wp-content/uploads/2024/01/patient-engagement-strategies-in-healthcare-1024x576.jpeg" alt="">
                    <p><span>Latest Question:</span> Java mcq</p>
                <button type="button" onClick="toggleMainBar(2)">Today's Task-></button>
                </div>
            </div>
            </div>
            `;
            homeTab();
            break;
        
        case 2: 
            mainBar.innerHTML = `
            <div class="assessment-tab">
                <div class="title"><h2>Assessments</h2></div>
                <div class="extra-content">
                    <div class="assessment-stats">
                    <h2>Your Performance</h2>
                    <div class="stat-items-container">
                        <div class="stat-item" id="avg-score">
                            <h3>Average Score</h3>
                            <p>0%</p>
                        </div>
                    
                        <div class="stat-item" id="best-score">
                            <h3>Best Score</h3>
                            <p>0%</p>
                        </div>
                    
                        <div class="stat-item" id="recent-score">
                            <h3>Most Recent Score</h3>
                            <p>0%</p>
                        </div>
                    </div>
                </div>
                <div class="progress-container">
                    <h3>Assignment Progress</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill" style="width: 0%;">0%</div>
                    </div>
                    <p id="progress-text">0 / 0 Assignments Completed</p>
                </div>
            </div>
                <div class="assessment-list">
                    <div class="incomplete-assessment">
                        
                    </div>
                    <div class="complete-assessment">
                        
                    </div>
                </div>
            </div>
            `;
            assessmentTab();
            break;

            case 3:
                navBar.style.backgroundColor = '#121212';
                document.querySelector('nav > h1').style.color = 'white';
                mainBar.innerHTML = `<div class="placement">
                <header class="hero">
      <h1>Your Success Story Begins Here!</h1>
      <p>Join hundreds who've landed their dream jobs</p>
      <button onClick="openPlacementRecord()" class="cta-button">Explore Success Stories</button>
    </header>

    <!-- Filters-->
    <section class="filters">
      <div class="filter-buttons">
        <button data-filter="all" class="active">Departments</button>
        <button data-filter="CSE">CSE</button>
        <button data-filter="Mechanical">MECH</button>
        <button data-filter="Geo Informatics">GEO</button>
        <button data-filter="ECE">ECE</button>
        <button data-filter="AIDS">AIDS</button>
      </div>
    </section>

    <!-- Success Stories-->
    <section class="success-stories" id="success-stories">
      <h2>Our Top Acheivers</h2>
      <div class="story-container">
        <div class="story-card fade-in" data-company="Zoho">
          <img src="../Resource/Success Assets/Nishanth.jpg" alt="Student1" />
          <h3>Nishanth R</h3>
          <p>Placed at <strong>Zoho</strong> | &#8377;8.4 LPA</p>
        </div>
        <div class="story-card fade-in" data-company="Wipro">
          <img src="../Resource/Success Assets/SubaElakkiya.jpg" alt="Student2" />
          <h3>Suba Elakkiya</h3>
          <p>Placed at <strong>Wipro</strong> | &#8377;4 LPA</p>
        </div>
        <div class="story-card fade-in" data-company="Infosys">
          <img src="../Resource/Success Assets/Molija.jpg" alt="Student3" />
          <h3>Molija</h3>
          <p>Placed at <strong>Infosys</strong> | &#8377;3.6 LPA</p>
        </div>
        <div class="story-card fade-in" data-company="TCS">
          <img src="../Resource/Success Assets/janani.jpg" alt="Student4" />
          <h3>Janani</h3>
          <p>Placed at <strong>TCS</strong> | &#8377;3.6 LPA</p>
      </div>
    </section>


    <!--Placement Statistics-->
    <section class="placement-stats">
      <h2>Placement Statistics</h2>
      <div class="stats-container">
        <div class="stat-box fade-in">
            <h3>100+</h3>
            <p>Students Placed</p>
        </div>
        <div class="stat-box fade-in">
            <h3>50+</h3>
            <p>Companies Visited</p>
        </div>
        <div class="stat-box fade-in">
            <h3>&#8377;8.4 LPA</h3>
            <p>Highest Package</p>
        </div>
        </div>
    </section>

    <!-- Our Top Recruiters-->
    <section class="recruiters">
      <h2>Our Top Recruiters</h2>
      <div class="recruiter-container">
        <div class="marquee-content">
          <img src="../Resource/Success Assets/Zoho.jpg" alt="Zoho" class="recruiter-logo" />
        
        
          <img src="../Resource/Success Assets/WIPRO.jpg" alt="Wipro" class="recruiter-logo" />
        
        
          <img src="../Resource/Success Assets/infosys-logo-infosys-icon-free-free-vector.jpg" alt="Infosys" class="recruiter-logo" />
          <img src="../Resource/Success Assets/TCS-Logo-Tata-consultancy-service.png" alt="TCS" class="recruiter-logo" />
        
      </div>
      </div>
      </section>
      </div>`;
                break;
            case 4:
                mainBar.innerHTML = `<div class="job-post-container"></div>`;
                getJobPost(-1);
                break;
            case 5:
                mainBar.innerHTML = `<div class="event-container">
                </div>`;
                getEvents(-1);
                break;
            case 6:
                mainBar.innerHTML = `
                <div class="settings">
                    <h2>Settings</h2>
                        <div class="notification-setting">
                        <div class="details">
                            <h3>Notification</h3>
                            <p>Allow notifications</p>
                        </div>
                        <div class="toggle-container">
                            <label class="switch">
                                <input type="checkbox" id="toggle" onclick="notificationSettingsSwitch()">
                                <span class="slider"></span>
                            </label>
                            <span id="status">Off</span>
                        </div>
                        </div>
                    </div>  
                `;
                checkNotificationSubscriptionStatus();
                break;
            case 7:
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

async function homeTab() {
    document.querySelector('#username-placeholder').textContent = student.name;

    try {
        const response = await fetch(domain+`event/getevent?offset=${0}`, {
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
        if(data.datas.length != 0) {
            document.querySelector('.home-tab-event h2').textContent = data.datas[0].eventTitle;
            document.querySelector('.home-tab-event p').textContent = data.datas[0].eventDescription || 'This thrilling event promises an exciting blend of innovation, collaboration, and cutting-edge technology!';

            let eventImg = document.querySelector('.home-tab-event img');
            
            if(eventImg && data.datas[0].eventFiles.length!=0) {
                eventImg.src = `${domain}event/getimage/${data.datas[0].eventFiles[0]}`;
            }
        }

        const assessmentResponse = await fetch(domain+'questions/getquestionstitle', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt_token}`, 
                'Content-type':'application/json'
            }
        });
        const assessmentData = await assessmentResponse.json();
        const questionsList = assessmentData.datas;
        document.querySelector('.home-tab-assessment-container > p').innerHTML = `<span>Latest Question:</span> ${questionsList[0].name}`;
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
}

async function assessmentTab() {
    try {
        const unfinishedResponse = await fetch(domain+`answers/getunfinished?rollno=${JSON.parse(localStorage.getItem('student')).rollno}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${jwt_token}`
            }
        });
        const unfinishedData = await unfinishedResponse.json();

        const finishedResponse = await fetch(domain+`answers/getmark?rollno=${JSON.parse(localStorage.getItem('student')).rollno}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt_token}`
            }
        });
        const finishedData = await finishedResponse.json();

        let incompleteAssessmentList = document.querySelector('.assessment-list .incomplete-assessment');
        incompleteAssessmentList.innerHTML = `<h3>Incomplete Assessments</h3>`;
        unfinishedData.datas.forEach(element => {
            incompleteAssessmentList.innerHTML += `<div class="assessments">
                <div>
                    <h4>${element.name}</h4>
                    <p>Due : ${element.dateTime.substring(8,10)}-${element.dateTime.substring(5,7)}-${element.dateTime.substring(0,4)} ${changeTimeFormat(element.dateTime.substring(11))}</p>
                </div>
                <button type="button" onClick="takeTest(${element.questionId}, '${element.name}')">Take Test</button>
            </div>`;
        })

        let maxScore = 0;
        let totalScore = 0;
        let completedAssessmentList = document.querySelector('.assessment-list .complete-assessment');
        completedAssessmentList.innerHTML = `<h3>Previous Assessments</h3>`;
        finishedData.datas.forEach(element => {
            maxScore = Math.max(maxScore, element.markpercentage);
            totalScore += element.markpercentage;
            completedAssessmentList.innerHTML += `
                        <div class="assessments-completed">
                            <h4>${element.questionName}</h4>
                            <p>Your Score : <span>${element.markpercentage.toFixed(2)}%</span></p>
                        </div>`;
        });

        if(finishedData.datas.length >0) {
            document.querySelector('.stat-items-container #avg-score p').textContent = `${(totalScore/finishedData.datas.length).toFixed(2)}`;
            document.querySelector('.stat-items-container #best-score p').textContent = `${maxScore.toFixed(2)}`;
            document.querySelector('.stat-items-container #recent-score p').textContent = `${finishedData.datas[0].markpercentage.toFixed(2)}`;
        }
        

        document.getElementById('progress-fill').style.width = `${finishedData.datas.length / (finishedData.datas.length+unfinishedData.datas.length) * 100}%`;
        document.getElementById('progress-fill').textContent = `${(finishedData.datas.length / (finishedData.datas.length+unfinishedData.datas.length) * 100).toFixed(2)}%`;
        document.getElementById('progress-text').textContent = `${finishedData.datas.length} / ${finishedData.datas.length+unfinishedData.datas.length} Assignments Completed`
    }
    catch(error) {

    }
}
let questions = [];
let currentQuestionIndex = 0;
let selectedAnswers = {};

async function takeTest(questionid, name) {
    questions = [];
    currentQuestionIndex = 0;
    selectedAnswers = {};
    try {
        const response = await fetch(domain+`questions/getquestions?questionid=${questionid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${jwt_token}`
            }
        });
        const data = await response.json();
        questions = data.datas;       
    }
    catch(error) {

    }
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `<div class="assessment-question-tab">
        <h2 class="assessment-heading">Assessment Quiz</h2>
        <div class="assessment-navigation"></div>
        <div class="assessment-container">
            <h3 class="assessment-title">${name}</h3>
            <div class="assessment-question"></div>
            <div class="assessment-options"></div>
            <div class="assessment-btn">
                <button type="button" class="previous-btn">Previous</button>
                <button type="button" class="next-button">Next</button>
            </div>
            <p class="question-no"></p>
        </div>
    </div>`;
    document.querySelector('.previous-btn').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    });
    
    document.querySelector('.next-button').addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        }
    });
    assessmentQuestionFunction();
}




function assessmentQuestionFunction() {
    let assessmentNavigation = document.querySelector('.assessment-question-tab .assessment-navigation');
    assessmentNavigation.innerHTML = '';
    
    for (let i = 0; i < questions.length; i++) {
        let navItem = document.createElement('p');
        navItem.textContent = i + 1;
        navItem.onclick = () => loadQuestion(i);
        assessmentNavigation.appendChild(navItem);
    }
    loadQuestion(0);
}

function loadQuestion(questionIndex) {
    if(questionIndex == questions.length-1) {
        let assessmentButton = document.querySelector('.assessment-question-tab .assessment-btn');
        if(assessmentButton.childElementCount == 2) {
            let submitButton = document.createElement('button');
            submitButton.setAttribute('type','button');
            submitButton.setAttribute('class','submit-btn');
            submitButton.setAttribute('onClick','calculateAnswer()');
            submitButton.textContent = 'Submit';
            assessmentButton.appendChild(submitButton);
        }
    }
    else {
        let assessmentButton = document.querySelector('.assessment-question-tab .assessment-btn');
        if(assessmentButton.childElementCount == 3) {
            assessmentButton.removeChild(assessmentButton.lastChild);
        }
    }
    currentQuestionIndex = questionIndex;
    let question = document.querySelector('.assessment-question');
    question.innerHTML = `<pre>${questions[questionIndex].question}</pre>`

    let assessmentOption = document.querySelector('.assessment-question-tab .assessment-options');

    if(questions[questionIndex].type === 'MCQ') {
        let a = `<button type="button" class="option option-a" data-value="${questions[questionIndex].a}">${questions[questionIndex].a}</button>`;
        let b = `<button type="button" class="option option-b" data-value="${questions[questionIndex].b}">${questions[questionIndex].b}</button>`;
        let c = `<button type="button" class="option option-c" data-value="${questions[questionIndex].c}">${questions[questionIndex].c}</button>`;
        let d = `<button type="button" class="option option-d" data-value="${questions[questionIndex].d}">${questions[questionIndex].d}</button>`;
        assessmentOption.innerHTML = '';
        assessmentOption.innerHTML += a;
        assessmentOption.innerHTML += b;
        assessmentOption.innerHTML += c;
        assessmentOption.innerHTML += d;       
    }
    else {
        let textInput = document.createElement('input');
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('placeholder', 'Enter your answer');
        textInput.value = selectedAnswers[questionIndex] || '';
        textInput.addEventListener('input', (event) => {
            selectedAnswers[currentQuestionIndex] = event.target.value;
        });
        assessmentOption.innerHTML = '';
        assessmentOption.appendChild(textInput);
    }
    document.querySelector('.question-no').textContent = `Question ${questionIndex + 1} of ${questions.length}`;
    if(questions[questionIndex].type === 'MCQ') {
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (event) => {
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected-ans'));
                event.target.classList.add('selected-ans');
                selectedAnswers[questionIndex] = event.target.getAttribute('data-value');
            });

            if (selectedAnswers[questionIndex] === option.getAttribute('data-value')) {
                option.classList.add('selected-ans');
            }
        });
    }
}

async function calculateAnswer() {
    let score = 0;
    for(let i=0; i<questions.length; i++) {
        if(selectedAnswers[i] != undefined) {
            if(selectedAnswers[i] == questions[i].answer) {
                score++;
            }
        }
    }
    let markpercentage = score/questions.length * 100;
    try {
        const response = await fetch(domain+`answers/addmark`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': `Bearer ${jwt_token}`
            },
            body: JSON.stringify({
                student: {
                    rollno: student.rollno
                },
                questionid: questions[0].questionid,
                markpercentage: markpercentage,
                correct: score,
                wrong: questions.length-score
            })
        });
        const data = await response.json();
        if(response.status == 201) {
            showSuccessMessage("Success", data.message, "");
            toggleMainBar(2);
        }
        else if(response.status == 400) {
            showFailMessage("Failed", data.message, "");
            toggleMainBar(2);
        }
    }
    catch(error) {
        showFailMessage("Error", "Internal Server Again", "Please try again later");
        toggleMainBar(2);
    }
}








let placedStudentsList = [];
async function openPlacementRecord() {
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `<div class="placement-records">
    <div class="bg-animation"></div>
    <header>
      <h1>Placement Records</h1>
    </header>

    <div class="marquee">
      <p>
        2025 Placements: Infosys, Wipro, TCS, Zoho! Highest Package: 8.4 LPA,
        Average Package: 5 LPA! Top Recruiter: Infosys, 50+ Students Placed!
      </p>
    </div>
    <div class="nav">
      <ul>
        <li onClick="showPlacedStudentsList('ALL')"><p>All</p></li>
        <li onClick="showPlacedStudentsList('CSE')"><p>CSE</p></li>
        <li onClick="showPlacedStudentsList('MECH')"><p>MECH</p></li>
        <li onClick="showPlacedStudentsList('ECE')"><p>ECE</p></li>
        <li onClick="showPlacedStudentsList('AIDS')"><p>AIDS</p></li>
        <li onClick="showPlacedStudentsList('GEO')"><p>GEO</p></li>
      </ul>
    </div>

    <section class="animated-section">
      <h2>All Placements</h2>
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Student Name</th>
            <th>Company</th>
            <th>Package</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </section>
    <footer>
      <p>&copy; Anna University Regional Campus, Tirunelveli</p>
    </footer>
    </div>`;

    try {
        const response = await fetch(domain + `placement/getplacedstudents?year=2027`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt_token}`, 
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();
        placedStudentsList = data.datas;
        showPlacedStudentsList('ALL');
    }
    catch(error) {
        console.log(error.message);
    }
}


function showPlacedStudentsList(department) {
    let table = document.querySelector('.placement-records table tbody');
    let serialNumber = 1;
    table.innerHTML = '';
    placedStudentsList.forEach(placedStudent => {
        if(department == 'ALL' || placedStudent.department == department) {
            table.innerHTML += ` <tr>
                <td>${serialNumber++}</td>
                <td>${placedStudent.name}</td>
                <td>${placedStudent.companyName}</td>
                <td>${placedStudent.lpa} LPA</td>
                <td>${placedStudent.department}</td>
            </tr>`;
        }
    });
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
                    "Authorization": `Bearer ${jwt_token}`, 
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
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
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



async function getStudent(rollNo) { 
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


async function getStudentLoc() {
    try {
        const studentData = await getStudent(userName);
        studentLoc(studentData);
        setProfile();
        toggleMainBar(1);
    }
    catch {
        console.error('An error occurred:', error.message);
    }
}
getStudentLoc();

function setProfile() {
    let profileName = [];
    let sname = student.name.split(" ");
    if(sname.length === 1) {
        profileName.push(sname[0].charAt(0));
        profileName.push(sname[0].charAt(1));
    }
    else if(sname.length === 2) {
        profileName.push(sname[0].charAt(0));
        profileName.push(sname[1].charAt(0));
    }
    else {
        let num = 0;
        sname.forEach(i => {
            if(i.length >= 3) {
                num++;
            }
        });
        if(num >= 2) {
            sname.forEach(i => {
                if(i.length >= 3 && profileName.length <2) {
                    profileName.push(i.charAt(0));
                }
            })
        }
        else {
            profileName.push(sname[0].charAt(0));
            profileName.push(sname[1].charAt(0));
        }
    }
    let name = profileName.join("");
    name = name.toUpperCase();
    document.querySelector('.side-bar> .head> div> h2').textContent = name;
    document.querySelector('.side-bar> .head> #name').textContent = student.name;
    document.querySelector('.side-bar> .head> #rollno').textContent = student.rollno;
}






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
    eventContainer.innerHTML = `<h1>Upcoming Events</h1>`;
    eventData.forEach(element=> {
        let a = `
            <div class="event" onClick="openEvent(event)">
                <h2 class="event-title">${element.eventTitle}</h2>
                <img src="${element.eventFiles.length!=0?domain+"event/getimage/"+element.eventFiles[0]:''}" alt="">
                <div class="event-info">
                ${(element.eventDateFrom=="" && element.eventDateTo=="" && element.eventTimeFrom=="" && element.eventTimeTo=="")?"":`<div class="event-date-time">
                        <img src="../Resource/Event icons/calendar.png" alt="Calendar Icon">
                        <p>

                        ${element.eventDateFrom!="" ? element.eventDateFrom.substring(8,10)+"-"+element.eventDateFrom.substring(5,7)+"-"+element.eventDateFrom.substring(0,4):""}

                        ${element.eventTimeFrom!="" ? changeTimeFormat(element.eventTimeFrom) :""}

                        ${(element.eventDateTo!="" || element.eventTimeTo!="") ? " - ":""}

                        ${element.eventDateTo!="" ? element.eventDateTo.substring(8,10)+"-"+element.eventDateTo.substring(5,7)+"-"+element.eventDateTo.substring(0,4):""}

                        ${element.eventTimeTo!="" ? changeTimeFormat(element.eventTimeTo) : ""}

                        </p>

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
    eventContainer.innerHTML += `<button onClick="getEvents(1)">More</button>`;
}


function wrapLinks(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
}
function link(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    return url
}
function changeTimeFormat(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
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
    ${(eventData[index].eventDateFrom==""&&eventData[index].eventDateTo==""&&eventData[index].eventTimeFrom==""&&eventData[index].eventTimeTo==""&&eventData[index].eventLocation=="")?"":`<div class="event-in-info">
                <h3>Date and Location</h3>
                ${(eventData[index].eventDateFrom=="" && eventData[index].eventDateTo=="" && eventData[index].eventTimeFrom=="" && eventData[index].eventTimeTo=="")?"":`<div class="event-in-date-time">
                        <img src="../Resource/Event icons/calendar.png" alt="Calendar Icon">
                        <p>

                        ${eventData[index].eventDateFrom!="" ? eventData[index].eventDateFrom.substring(8,10)+"-"+eventData[index].eventDateFrom.substring(5,7)+"-"+eventData[index].eventDateFrom.substring(0,4):""} 
                        
                        ${eventData[index].eventTimeFrom!="" ? changeTimeFormat(eventData[index].eventTimeFrom):""} 
                        
                        ${(eventData[index].eventDateTo!="" || eventData[index].eventTimeTo!="") ? " - ":""}
                        
                        ${eventData[index].eventDateTo!="" ? eventData[index].eventDateTo.substring(8,10)+"-"+eventData[index].eventDateTo.substring(5,7)+"-"+eventData[index].eventDateTo.substring(0,4):""} 
                        
                        ${eventData[index].eventTimeTo!="" ? changeTimeFormat(eventData[index].eventTimeTo) : ""}

                        </p>
                    </div>`}

                    ${eventData[index].eventLocation!="" ? `<div class="event-in-location">
                        <img src="../Resource/Event icons/location.png" alt="Location Icon">
                        <p>${eventData[index].eventLocation}</p>
                    </div>`:""}</div>
                `}
                ${eventData[index].applyLink!=""?`<a href="${link(eventData[index].applyLink)}" target="_blank">Apply</a>`:""}
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
        const response = await fetch(domain+`jobpost/getjobpost?offset=${jobPostData.length}`, {
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
    jobPostContainer.innerHTML = `<h1>Upcoming Jobs</h1>`;
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
    jobPostContainer.innerHTML += `<button onClick="getJobPost(1)">More</button>`;
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
    
                ${jobPostData[index].applyLink!=""?`<a href="${link(jobPostData[index].applyLink)}" target="_blank">Apply</a>`:""}
            <p class="job-post-author"><span>Posted by : </span> ${jobPostData[index].postedBy}</p>
        </div>
    `;
} 



function notificationSettingsSwitch() {
    const toggle = document.getElementById("toggle");
    if (toggle.checked) {
        subscribeForNotification();
        
    } else {
        unsubscribeForNotification();
    }
}

const publicVapidKey = "BCwlkvIYRB_GS_2KpjEeCRUl2W5PQQsww_gkRahGGRczg68POnTYuYFH3MUQTie1vCuqg0_d_7ua_psD59_ejbA";
function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}
async function checkNotificationSubscriptionStatus() {

    if (Notification.permission === "denied") {
        notificationSettingOff();
        return;
    }
    if (Notification.permission === "default") {
        notificationSettingOff();
        return;
    }

    const registration = await navigator.serviceWorker.ready;
    const currentSubscription = await registration.pushManager.getSubscription();

    if (!currentSubscription) {
        notificationSettingOff();
        return;
    }

    const authKey = currentSubscription.getKey("auth");
    const p256dhKey = currentSubscription.getKey("p256dh");

    if (!authKey || !p256dhKey) {
        notificationSettingOff();
        return;
    }

    const subscriptionDetails = {
        endpoint: currentSubscription.endpoint,
        keys: {
            auth: arrayBufferToBase64(authKey),
            p256dh: arrayBufferToBase64(p256dhKey)
        }
    };

    try {
        const response = await fetch(domain + "notification/checksubscription", {
            method: "POST",
            body: JSON.stringify(subscriptionDetails),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if(response.status === 200 && data.message == "Already Subscribed") {
            notificationSettingOn();
        }
        else if(response.status === 200 && data.message == "Have not yet subscribed") {
            notificationSettingOff();
        }
    } catch (error) {
        notificationSettingOff();
    }
}
    
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    return btoa(String.fromCharCode.apply(null, bytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function subscribeForNotification() {

    if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            notificationSettingOff();
            showFailMessage("Failed","Please turn on the notification","in the browser settings");
            return;
        }
    }
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        const response = await fetch(domain + "notification/subscribe/STUDENT", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if(data.condition=="Success") {
            notificationSettingOn();
        }
    } catch (error) {
        notificationSettingOff();
        showFailMessage("Error","Internal Sever Error","Please try again later");
    }
}

async function unsubscribeForNotification() {
    const registration = await navigator.serviceWorker.ready;
    const currentSubscription = await registration.pushManager.getSubscription();
    if (!currentSubscription) {
        notificationSettingOff();
    }
    try {
        const response = await fetch(domain + `notification/unsubscribe?endpoint=${encodeURIComponent(currentSubscription.endpoint)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
    
        const data = await response.json();
        if(data.condition=="Success") {
            notificationSettingOff();
        }
    }
    catch {
    }
}

function notificationSettingOff() {
    const toggle = document.getElementById("toggle");
    const status = document.getElementById("status");
    toggle.checked = false;
    status.textContent = "Off";
}
function notificationSettingOn() {
    const toggle = document.getElementById("toggle");
    const status = document.getElementById("status");
    toggle.checked = true;
    status.textContent = "On";
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
