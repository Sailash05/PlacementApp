// Get All Students

async function getAll() {
    const response = await fetch('http://localhost:8080/student/getall');
    const data = await response.json();
    console.log(data);
}


// Add Student

/* const rollNo = 950023104024
const sname = 'Sailash'
const year = 2027
const department = 'CSE'
const password = 'Sailash1234' */

async function addStudent() {
    const response = await fetch('http://localhost:8080/student/addstudent',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rollno: rollNo,
            name: sname,
            year: year,
            department: department,
            password: password
        })
    });
    const data = await response.json();
    console.log(data);
}



// Longin student

/* const rollNo = 950023104024;
const password = 'Sailash1234'; */

async function loginStudent() {
    const response = await fetch('http://localhost:8080/student/loginstudent',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rollno: rollNo,
            password: password
        })
    });
    const data = await response.json();
    console.log(data);
}

// Get Student

//const rollNo = 950023104024;

async function getStudent() {
    const response = await fetch('http://localhost:8080/student/getStudent',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rollno: rollNo
        })
    });
    const data = await response.json();
    console.log(data);
}

// Get Questions Title

async function getQuestionsTitle() {
    const response = await fetch('http://localhost:8080/questions/getquestionstitle');
    const data = await response.json();
    console.log(data);
}

// Add Question File

// Add Question File


/* 

<form id="questionForm">
        <label for="name">Name:</label>
        <input id="name" type="text" name="name" required><br><br>
    
        <label for="abcd">Add file here:</label>
        <input id="abcd" type="file" name="questions" required><br><br>
    
        <button type="button" onclick="addQuestionFile()">Submit</button>
    </form>

 */

async function addQuestionFile() {
    const formData = new FormData();
    const name = document.getElementById("name").value;
    const fileInput = document.getElementById("abcd").files[0];
    formData.append("name", name);
    formData.append("questions", fileInput);
    try {
        const response = await fetch('http://localhost:8080/questions/addquestionsfile', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Get questions

//const questionId = 1;

async function getQuestions() {
    const response = await fetch('http://localhost:8080/questions/getquestions',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            questionid:questionId
        })
    });
    const data = await response.json();
    console.log(data);
}

// Add Mark

/* const rollNo = 950023104024;
const questionId = 2;
const markPercentage = 97.4;
const correct = 18;
const wrong = 2; */

async function addMark() {
    const response = await fetch('http://localhost:8080/answers/addmark',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rollno:rollNo,
            questionid:questionId,
            markpercentage:markPercentage,
            correct:correct,
            wrong:wrong
        })
    });
    const data = await response.json();
    console.log(data);
}

// Get marks

//const rollNo = 950023104024;

async function getMark() {
    const response = await fetch('http://localhost:8080/answers/getmark',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rollno: rollNo
        })
    });
    const data = await response.json();
}