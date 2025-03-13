let questions = [];
let currentQuestionIndex = 0;

document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const questionText = document.getElementById("question").value;
    const options = [
        document.getElementById("option1").value,
        document.getElementById("option2").value,
        document.getElementById("option3").value,
        document.getElementById("option4").value,
    ];
    const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;

    const newQuestion = {
        questionText,
        options,
        correctAnswer,
    };

    questions.push(newQuestion);
    renderSavedQuestions();
    clearForm();
});

function renderSavedQuestions() {
    const savedQuestionsDiv = document.getElementById("savedQuestions");
    savedQuestionsDiv.innerHTML = "";

    questions.forEach((q, index) => {
        const questionBox = document.createElement("div");
        questionBox.className = "question-box";
        
        questionBox.innerHTML = `
            <button class="delete-btn" onclick="deleteQuestion(${index})">Delete</button>
            <div>
                <h3 id="ques">${index + 1}. ${q.questionText}</h3>
                <ul>
                    <li id="crt-option">a) ${q.options[0]}</li>
                    <li>b) ${q.options[1]}</li>
                    <li>c) ${q.options[2]}</li>
                    <li>d) ${q.options[3]}</li>
                </ul>
            </div>
        `;
        /////////////////////////////////
        savedQuestionsDiv.appendChild(questionBox);
    });
}

function deleteQuestion(index) {
    questions.splice(index, 1);
    renderSavedQuestions();
    updateQuestionNumber()
}

function updateQuestionNumber() {
    document.getElementById("questionNumber").innerText = `${questions.length + 1}. Create a New Question`;
}

function clearForm() {
    document.getElementById("quizForm").reset();
    document.getElementById("questionNumber").innerText = `${questions.length + 1}. Create a New Question`;
}

function uploadQuestions() {
    if (questions.length === 0) {
        console.log("No questions to upload.");
        return;
    }

    const quizData = {
        name: document.getElementById("title").value || "Untitled Quiz",
        dateTime: new Date(
            document.getElementById("dueDate").value + "T" + document.getElementById("dueTime").value
        ).toISOString(),
        questions: questions.map(q => ({
            question: q.questionText,
            a: q.options[0],
            b: q.options[1],
            c: q.options[2],
            d: q.options[3],
            answer: q.options[q.correctAnswer.charCodeAt(0) - 97],
            type: "MCQ"
        }))
    };

    console.log(quizData);
}
