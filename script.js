// Select elements
const outputDisplay = document.getElementById('outputDisplay');

// Helper to display output
function displayOutput(data) {
    outputDisplay.textContent = JSON.stringify(data, null, 2);
}

// Get All Students
document.getElementById('getAllStudents').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/student/getall');
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});

// Get Student
document.getElementById('getStudent').addEventListener('click', async () => {
    const rollNo = prompt('Enter Roll Number:');
    try {
        const response = await fetch('http://localhost:8080/student/getStudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollno: rollNo }),
        });
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});

// Add Student
document.getElementById('addStudent').addEventListener('click', async () => {
    const rollNo = prompt('Enter Roll Number:');
    const sname = prompt('Enter Student Name:');
    const year = prompt('Enter Year:');
    const department = prompt('Enter Department:');
    const password = prompt('Enter Password:');
    try {
        const response = await fetch('http://localhost:8080/student/addstudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollno: rollNo, name: sname, year, department, password }),
        });
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});

// Login Student
document.getElementById('loginStudent').addEventListener('click', async () => {
    const rollNo = prompt('Enter Roll Number:');
    const password = prompt('Enter Password:');
    try {
        const response = await fetch('http://localhost:8080/student/loginstudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollno: rollNo, password }),
        });
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});

// Get Questions Title
document.getElementById('getQuestionsTitle').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/questions/getquestionstitle');
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});

// Add Question File
document.getElementById('addQuestionFile').addEventListener('click', async () => {
    const formData = new FormData();
    const name = document.getElementById('name').value;
    const fileInput = document.getElementById('abcd').files[0];
    formData.append('name', name);
    formData.append('questions', fileInput);
    try {
        const response = await fetch('http://localhost:8080/questions/addquestionsfile', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});

// Get Marks
document.getElementById('getMarks').addEventListener('click', async () => {
    const rollNo = prompt('Enter Roll Number:');
    try {
        const response = await fetch('http://localhost:8080/answers/getmark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollno: rollNo }),
        });
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});

// Add Mark
document.getElementById('addMark').addEventListener('click', async () => {
    const rollNo = prompt('Enter Roll Number:');
    const questionId = prompt('Enter Question ID:');
    const markPercentage = prompt('Enter Mark Percentage:');
    const correct = prompt('Enter Correct Answers:');
    const wrong = prompt('Enter Wrong Answers:');
    try {
        const response = await fetch('http://localhost:8080/answers/addmark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollno: rollNo, questionid: questionId, markpercentage: markPercentage, correct, wrong }),
        });
        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        displayOutput({ error: error.message });
    }
});