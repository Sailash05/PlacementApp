const quizForm = document.getElementById('quizForm');

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const question = document.getElementById('question').value;

    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value
    ];

    const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;
    console.log({
        question,
        options,
        correctAnswer
    });

    alert('✨ Question saved successfully! ✨');

    quizForm.reset();
});






/* 

{
    "name": "test",
    "due": "2025-02-13T20:16:00",
    "questions": [
        {
            "question": "What is the value of 5+6?",
            "a": "10.0",
            "b": "9.0",
            "c": "11.0",
            "d": "12.0",
            "answer": "11.0",
            "type": "MCQ"
        },
        {
            "question": "What is the output of Math.pow(2,3)?",
            "a": "6.0",
            "b": "7.0",
            "c": "14.0",
            "d": "8.0",
            "answer": "8.0",
            "type": "MCQ"
        }
    ]
}


 */