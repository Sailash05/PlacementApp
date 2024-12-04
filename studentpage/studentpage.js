let domain = 'http://192.168.1.8:8080/';

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

function toggleMainBar(choice) {
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
    }
    if(window.innerWidth <= 480) {
        toggleSideBar();
    }
}

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
        const unfinishedResponse = await fetch(domain+`answers/getunfinished?rollno=${JSON.parse(localStorage.getItem('student')).rollno}`);

        if(!unfinishedResponse.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const unfinishedData = await unfinishedResponse.json();

        const answerResponse = await fetch(domain+`answers/getmark?rollno=${JSON.parse(localStorage.getItem('student')).rollno}`)

        if(!answerResponse.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
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
    document.querySelector('.exam-no-of-questions').textContent = `Total Question : ${data.datas.length}`;

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
    questionsContainer.innerHTML += `<button class="submit-test-btn" onClick="addAnswer()">Submit Test</button>`;
}

async function getQuestions(qid) {
    try {
        const response = await fetch(domain+`questions/getquestions?questionid=${qid}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
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
        const selected = form.querySelector(`input[name="${groupName}"]:checked`);
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
        const response = await fetch(domain+`answers/addmark`,{
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
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const ansData = await response.json();
        console.log(ansData);
    }
    catch(error) {
        console.error('An error occurred:', error.message);
    }
    
}


function logOut() {
    window.location.href = "../index.html";
}