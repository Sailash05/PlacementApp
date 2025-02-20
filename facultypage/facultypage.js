let domain = "http://192.168.1.5:8080/";

let jwt_token = JSON.parse(localStorage.getItem('token')).jwt_token;
let userName = JSON.parse(localStorage.getItem('userName'));

let faculty = {
    name:null,
    department:null,
    mobileno:null,
	email:null
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

async function toggleMainBar(choice) {
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
                <h2></h2>
                <p></p>
              </div>
              <button class="event-view-more-btn">View More →</button>
          </section>
          <div class="home-tab-assessment">
            <h2>Your Assessment</h2>
            <div class="home-tab-assessment-container">
                <h3>Check your tasks and schedules!</h3>
                <img src="https://www.postgrid.co.uk/wp-content/uploads/2024/01/patient-engagement-strategies-in-healthcare-1024x576.jpeg" alt="">
                <p><span>Latest Question:</span> Java mcq</p>
              <button type="button">Today's Task-></button>
            </div>
          </div>
        </div>
            `;
            homeTab();
            break;
        case 2:
            mainBar.innerHTML = `
            <div class="assessment-tab">
            <h2>Assessments</h2>
            <p onclick="openAssessmentPostForm()" class="post-assessment-btn">+ Post Assessment</p>
            <div class="assessment-list">
                <h2>Assessment List</h2>
            </div>
        </div>
            `;
            await assessmentTab();
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
        
        /* case 3:
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
        break; */
        
        
    navElement[choice-1].classList.add('side-bar-element-active');
    if(window.innerWidth <= 480) {
        closeSideBar();
    }
}

async function homeTab() {
    document.querySelector('#username-placeholder').textContent = faculty.name;

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
        const response = await fetch(domain+'questions/getquestionstitle', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt_token}`, 
                'Content-type':'application/json'
            }
        });
        const data = await response.json();
        const questionsList = data.datas;
        let assessmentList = document.querySelector('.assessment-tab .assessment-list');
        assessmentList.innerHTML = `<h2>Assessment List</h2>`;
        questionsList.forEach(element => {
            assessmentList.innerHTML += `
            <div class="assessment">
                    <h3>${element.name}</h3>
                    <p class="mark-btn" onClick="getAssessmentsMark(${element.questionid})">Marks</p>
                    <p class="defaulter-btn" onClick="getAssessmentsDefaulters(${element.questionid})">Defaulters</p>
                    <p class="delete-btn" onClick="deleteAssessmentOpen(${element.questionid})"><img src="../Resource/Event icons/delete.png" alt=""></p>
                </div>`;
        });
        
    }
    catch(error) {

    }
}
async function openAssessmentPostForm() {
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `<form class="add-assessment-form">
            <h2>Add Assessment</h2>
            <div class="add-assessment-field">
                <label for="assessment-name">Name </label>
                <input type="text" id="assessment-name" name="assessment-name">
            </div>

            <div class="add-assessment-field add-assessment-field-date">
                <label for="assessment-date">Due Date </label>
                <input type="date" id="assessment-date" name="assessment-date">
            </div>
            <div class="add-assessment-field add-assessment-field-time">
                <label for="assessment-time">Due Time </label>
                <input type="time" id="assessment-time" name="assessment-time">
            </div>

            <div class="add-assessment-field">
                <label for="assessment-file">Question File </label>
                <input type="file" id="assessment-file" name="assessment-file">
            </div>
            <div class="buttons">
                <button class="cancel-btn" onClick="toggleMainBar(2)">Cancel</button>
                <button class="add-assessment-btn" onClick="addAssessment(event)">Add Assessment</button>
            </div>
        </form>`;
}

async function addAssessment(event) {
    event.preventDefault();

    const form = document.querySelector('.add-assessment-form');
    const formData = new FormData();

    const name = document.getElementById('assessment-name').value;
    const date = document.getElementById('assessment-date').value;
    const time = document.getElementById('assessment-time').value;
    const file = document.getElementById('assessment-file').files[0];

    if(!name) {
        showFailMessage('Failed','Please Enter the Name','and try again');
    }
    else if(!date) {
        showFailMessage('Failed','Please Enter the date','and try again');
    }
    else if(!time) {
        showFailMessage('Failed','Please Enter the time','and try again');
    }
    else if(!file) {
        showFailMessage('Failed','Please submit the file','and try again');
    }
    else {
        const dateTime = `${date}T${time}:00`;
        formData.append('name', name);
        formData.append('dateTime', dateTime);
        formData.append('questions', file);

        try {
            const response = await fetch(domain+'questions/addquestionsfile', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${jwt_token}`
                },
                body: formData
            });
            const data = await response.json();
            if(response.status === 201) {
                showSuccessMessage("Success","Questions Added","");
                toggleMainBar(2);
            }
            else if(response.status === 400) {
                showFailMessage("Failed","Failed to add");
                toggleMainBar(2);
            }
        }
        catch(error) {
            showFailMessage("Error","Internal Server Error","Please Try again later!");
            toggleMainBar(2);
        }
    }
}
function getAssessmentsMark(questionid) {
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `
    <div class="assessment-mark-tab">
            <div class="assessment-mark-filter">
                <h3>Filter</h3>
                <div class="department">
                    <p>Department</p>
                    <select name="" id="">
                        <option value="ALL" selected>ALL</option>
                        <option value="CSE">CSE</option>
                        <option value="AIDS">AIDS</option>
                        <option value="ECE">ECE</option>
                        <option value="MECH">MECH</option>
                        <option value="GEO">GEO</option>
                    </select>
                </div>
                <div class="year">
                    <p>Year</p>
                    <input type="number" min="1" max="4">
                </div>
                <div class="top">
                    <p>Top Students</p>
                    <select name="" id="">
                        <option value="0" selected>ALL</option>
                        <option value="3">Top 3</option>
                        <option value="10">Top 10</option>
                        <option value="20">Top 20</option>
                        <option value="50">Top 50</option>
                    </select>
                </div>
                <button type="button" onClick="getMarkFilter(${questionid})">Filter</button>
            </div>
            <div class="assessment-mark-list">
                <table border="1">
                    <thead>
                        <tr>
                        <th>Serial No.</th>
                        <th>Student Name</th>
                        <th>Rollno</th>
                        <th>Dept</th>
                        <th>Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    `;
    getMarkFilter(questionid);
}
async function getMarkFilter(questionid) {
    let dept = document.querySelector('.assessment-mark-filter > .department > select').value;
    let year = document.querySelector('.assessment-mark-filter > .year > input').value;
    let top =  document.querySelector('.assessment-mark-filter > .top > select').value;
    let assessmentTable = document.querySelector('.assessment-mark-list > table > tbody');
    assessmentTable.innerHTML = '';
    if(year < 0 || year > 4) {
        showFailMessage("Failed","Please Enter The Correct Year","");
    }
    else {
        try {
            const response = await fetch(domain+`answers/getmarkfilter?dept=${dept}&year=${year||0}&qid=${questionid}&top=${top}`, {
                method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${jwt_token}`,
                        'Content-type': 'application/json'
                    }
            });
            const data = await response.json();
            let serialNo = 0;
            data.datas.forEach(element => {
                assessmentTable.innerHTML += `<tr>
                                <td>${++serialNo}</td>
                                <td>${element.name}</td>
                                <td>${element.rollno}</td>
                                <td>${element.department}</td>
                                <td>${element.markPercentage.toFixed(2)}%</td>
                            </tr>`;
            });
            if(data.datas.length === 0) {
                assessmentTable.parentElement.parentElement.innerHTML = '<p style="text-align: center;">No students</p>'
            }
        }
        catch(error) {
            
        }
    }
}
function getAssessmentsDefaulters(questionid) {
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `
    <div class="assessment-mark-tab">
            <div class="assessment-defaluters-filter">
                <h3>Filter</h3>
                <div class="department">
                    <p>Department</p>
                    <select name="" id="">
                        <option value="ALL" selected>ALL</option>
                        <option value="CSE">CSE</option>
                        <option value="AIDS">AIDS</option>
                        <option value="ECE">ECE</option>
                        <option value="MECH">MECH</option>
                        <option value="GEO">GEO</option>
                    </select>
                </div>
                <div class="year">
                    <p>Year</p>
                    <input type="number" min="1" max="4">
                </div>
                <button type="button" onClick="getDefaultersFilter(${questionid})">Filter</button>
            </div>
            <div class="assessment-mark-list">
                <table border="1">
                    <thead>
                        <tr>
                        <th>Serial No.</th>
                        <th>Student Name</th>
                        <th>Rollno</th>
                        <th>Dept</th>
                        <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    `;
    getDefaultersFilter(questionid);
}
async function getDefaultersFilter(questionid) {
    let dept = document.querySelector('.assessment-defaluters-filter > .department > select').value;
    let year = document.querySelector('.assessment-defaluters-filter > .year > input').value;
    let assessmentTable = document.querySelector('.assessment-mark-list > table > tbody');
    assessmentTable.innerHTML = '';
    if(year < 0 || year > 4) {
        showFailMessage("Failed","Please Enter The Correct Year","");
    }
    else {
        try {
            const response = await fetch(domain+`answers/getdefaulters?dept=${dept}&year=${year||0}&qid=${questionid}`, {
                method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${jwt_token}`,
                        'Content-type': 'application/json'
                    }
            });
            const data = await response.json();
            let serialNo = 0;
            data.datas.forEach(element => {
                assessmentTable.innerHTML += `<tr>
                                <td>${++serialNo}</td>
                                <td>${element.name}</td>
                                <td>${element.rollno}</td>
                                <td>${element.department}</td>
                                <td>${element.year}</td>
                            </tr>`;
            });
            if(data.datas.length === 0) {
                assessmentTable.parentElement.parentElement.innerHTML = '<p style="text-align: center;">No defaulters</p>'
            }
        }
        catch(error) {
            
        }
    }
}
function deleteAssessmentOpen(questionid) {
    let logOutMenuMasterContainer = document.createElement('div');
    logOutMenuMasterContainer.classList.add('log-out-menu-master-container');    //used log out template
    logOutMenuMasterContainer.innerHTML = `<div class="log-out-menu-container">
        <div class="box">
            <img src="../Resource/pop up menu icons/exclamation-mark.jpg" alt="!!!" class="logo">
            <p>Are you sure you want to delete this assessment?</p>
            <div class="buttons">
                <button class="ok-btn" onClick="deleteAssessment(${questionid})">Yes</button>
                <button class="cancel-btn" onClick="closeLogOutMenu()">Cancel</button>
            </div>
        </div>
    </div>`;
    if(window.innerWidth <= 480) {
        closeSideBar();
    }
    document.querySelector('body').appendChild(logOutMenuMasterContainer);
}
async function deleteAssessment(questionid) {
    try {
        const respones = await fetch(domain+`questions/deleteassessment?questionid=${questionid}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${jwt_token}`,
                'Content-type': 'application/json'
            }
        });
        if(respones.status === 200) {
            closeLogOutMenu();
            toggleMainBar(2);
        }
    }
    catch(error) {
        closeLogOutMenu();
        toggleMainBar(2);
        showFailMessage("Error","Internal Server Error","Please try again later!");
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

     <div class="button-container">
      <button class="add-student-btn" type="button" onClick="openAddPlacedStudentForm()">Add Student</button>
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
function openAddPlacedStudentForm() {
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

    mainBar.innerHTML = `
    <div class="placement-entry-form">
            <h2>PLACEMENT ENTRY</h2>
            <form>
                <label for="studentName">Student Name</label>
                <input type="text" id="studentName" placeholder="Enter Student Name">
    
                <label for="rollNumber">Roll Number</label>
                <input type="text" id="rollNumber" placeholder="Enter Roll Number">
    
                <label for="department">Department</label>
                <select id="department">
                    <option disabled selected>Select Department</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="AIDS">Artificial Inteligence and Data Science</option>
                    <option value="ECE">Electronics & Communication Engineering</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="GEO">Geo Informatics</option>
                </select>
    
                <label for="passingYear">Passing Year</label>
                <input type="number" id="passingYear" placeholder="Enter Passing Year">
    
                <label for="companyName">Company Name</label>
                <input type="text" id="companyName" placeholder="Enter Company Name">
    
                <label for="salary">Salary (LPA)</label>
                <input type="text" id="salary" placeholder="Enter Salary in LPA">
    
                <button type="button" onclick="addPlacedStudent()">SUBMIT</button>
            </form>
        </div>
    `;
}
async function addPlacedStudent() {
    const placedStudentData = {
        rollno: document.getElementById("rollNumber").value,
        name: document.getElementById("studentName").value,
        department: document.getElementById("department").value,
        passedOutYear: document.getElementById("passingYear").value,
        companyName: document.getElementById("companyName").value,
        lpa: document.getElementById("salary").value
    };
    try {
        const response = await fetch(domain+`placement/addplacedstudent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(placedStudentData)
        });
        const data = await response.json();
        if(response.status === 201) {
            showSuccessMessage("Success",data.message,"");
        }
        else if(response.status === 404) {
            showFailMessage("Failed",data.message,"");
        }
    } catch (error) {
        showFailMessage("Error","Internal Server Error","Please Try Again Later!");
    }
}

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
    if(inputs[0].value.trim().length === 0) {
        showFailMessage("Error","Please Enter Your Name.","Try again!!");
    }
    else if(inputs[3].value.length != 10) {
        showFailMessage("Error","Please Enter the Correct Mobile Number.","Try again!!");
    }
    else if(inputs[2].value.trim().length === 0) {
        showFailMessage("Error","Please Enter Your Email.","Try again!!");
    }
    else {
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
            const data = await response.json();
            if(response.status === 200) {
                showSuccessMessage("Success",data.message,"");
                const userData = await getFaculty(inputs[3].value);
                facultyLoc(userData);
            }
            else if(response.status === 404) {
                showFailMessage("Error",data.message,"Please Enter the Correct Mobile Number");
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



async function getFacultyLoc() {
    try {
        const facultyData = await getFaculty(userName);
        facultyLoc(facultyData);
        setProfile();
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
    toggleMainBar(1);
}
getFacultyLoc();

function setProfile() {
    let profileName = [];
    let sname = faculty.name.split(" ");
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
    document.querySelector('.side-bar> .head> #name').textContent = faculty.name;
    document.querySelector('.side-bar> .head> #rollno').textContent = faculty.mobileno;
}


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
        const data = await response.json();
        if(response.status === 201) {
            showSuccessMessage("Success",data.message,"");
        }
        else if(response.status === 400) {
            showFailMessage("Failed",data.message,"");
        }
        else if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    }
    catch(error) {
        showFailMessage("Error","Internal Server Error","Please try again!");
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
    eventContainer.innerHTML = `<h1>Upcoming Events</h1> <p onclick="addEventOpen()">+ New Event</p>`;
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
    let index = Array.from(eventContainer.children).indexOf(currentEvent)-2;
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
                <p onClick="deleteEventOpen(${eventData[index].eventid})" class="delete-btn">Delete Event</p>
            <p class="event-author"><span>Posted by : </span> ${eventData[index].postedBy}</p>
        </div>
    `;
} 
function deleteEventOpen(eventid) {
    let logOutMenuMasterContainer = document.createElement('div');
    logOutMenuMasterContainer.classList.add('log-out-menu-master-container');    //used log out template
    logOutMenuMasterContainer.innerHTML = `<div class="log-out-menu-container">
        <div class="box">
            <img src="../Resource/pop up menu icons/exclamation-mark.jpg" alt="!!!" class="logo">
            <p>Are you sure you want to delete this event?</p>
            <div class="buttons">
                <button class="ok-btn" onClick="deleteEvent(${eventid})">Yes</button>
                <button class="cancel-btn" onClick="closeLogOutMenu()">Cancel</button>
            </div>
        </div>
    </div>`;
    if(window.innerWidth <= 480) {
        closeSideBar();
    }
    document.querySelector('body').appendChild(logOutMenuMasterContainer);
}
async function deleteEvent(eventid) {
    try {
        const response = await fetch(domain + `event/deleteevent/${eventid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();
        closeLogOutMenu();
        toggleMainBar(5);
    }
    catch(error) {
        console.log(error.message);
    }
}


function addJobPostOpen() {
    let mainBar = document.querySelector('.main-bar');
    mainBar.innerHTML = `
    <form class="add-job-post-form">
            <h2>Add Job Post</h2>
            <div class="add-job-post-field">
                <label for="job-post-title">Job Title : </label>
                <input type="text" id="job-post-title" name="job-post-title">
            </div>

            <div class="add-job-post-field">
                <label for="job-post-description">Job Description : </label>
                <input type="text" id="job-post-description" name="job-post-description">
            </div>

            <div class="add-job-post-field">
                <label for="job-post-apply-link">Apply Link : </label>
                <input type="text" id="job-post-apply-link" name="job-post-apply-link">
            </div>

            <div class="add-job-post-field">
                <p>Job Post Content : </p>
                <textarea name="job-post-content" id="job-post-content"></textarea>
            </div>
            <div class="add-job-post-field">
                <label for="job-post-images">Job Post Images : </label>
                <input type="file" id="job-post-images" name="job-post-images" multiple>
            </div>
            <div class="buttons">
                <button class="cancel-btn-job-post" onClick="toggleMainBar(4)">Cancel</button>
                <button class="add-job-post-btn" onClick="addJobPost(event)">Add Job Post</button>
            </div>
        </form>
    `;
}
async function addJobPost(event) {
    event.preventDefault(); 
    const form = document.querySelector('.add-job-post-form');
    const formData = new FormData(form);
    formData.append("posted-by", faculty.name);

    try {
        const response = await fetch(domain+'jobpost/addjobpost',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt_token}`
            },
            body: formData
        });
        const data = await response.json();
        if(response.status === 201) {
            showSuccessMessage("Success",data.message,"");
        }
        else if(response.status === 400) {
            showFailMessage("Failed",data.message,"");
        }
        else if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    }
    catch(error) {
        showFailMessage("Error","Internal Server Error","Please try again!");
    }
    toggleMainBar(4);
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
    jobPostContainer.innerHTML = `<h1>Upcoming Jobs</h1> <p onclick="addJobPostOpen()">+ New Job Post</p>`;
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
    let index = Array.from(jobPostContainer.children).indexOf(currentJobPost)-2;
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
                <p onClick="deleteJobPostOpen(${jobPostData[index].jobPostid})" class="delete-btn">Delete Post</p>
            <p class="job-post-author"><span>Posted by : </span> ${jobPostData[index].postedBy}</p>
        </div>
    `;
} 
function deleteJobPostOpen(jobPostid) {
    let logOutMenuMasterContainer = document.createElement('div');
    logOutMenuMasterContainer.classList.add('log-out-menu-master-container');
    logOutMenuMasterContainer.innerHTML = `<div class="log-out-menu-container">
        <div class="box">
            <img src="../Resource/pop up menu icons/exclamation-mark.jpg" alt="!!!" class="logo">
            <p>Are you sure you want to delete this post?</p>
            <div class="buttons">
                <button class="ok-btn" onClick="deleteJobPost(${jobPostid})">Yes</button>
                <button class="cancel-btn" onClick="closeLogOutMenu()">Cancel</button>
            </div>
        </div>
    </div>`;
    if(window.innerWidth <= 480) {
        closeSideBar();
    }
    document.querySelector('body').appendChild(logOutMenuMasterContainer);
}
async function deleteJobPost(jobPostid) {
    try {
        const response = await fetch(domain + `jobpost/deletejobpost/${jobPostid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();
        closeLogOutMenu();
        toggleMainBar(4);
    }
    catch(error) {
        console.log(error.message);
    }
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
        const response = await fetch(domain + "notification/subscribe/FACULTY", {
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

