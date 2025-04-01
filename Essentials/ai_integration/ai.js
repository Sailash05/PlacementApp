const apiKey = 'your-api-key'; // Replace with your Gemini API key
const topic = 'Python'; // Topic for which you want to generate MCQs
const count = 5; // Number of questions to generate

const prompt = `Generate ${count} multiple-choice questions with 4 options for the topic '${topic}'. Include the question, 4 options (a, b, c, d), and specify the correct answer in json format.`;

const url = 'https://api.google.com/gemini/v2/models/generate-content'; // Example URL, replace with the actual Gemini endpoint URL

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

const data = {
  model: 'gemini-2.0-flash', // or the specific model you are using
  contents: prompt
};

// Making the HTTP request using fetch
fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    console.log('Generated Content:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
