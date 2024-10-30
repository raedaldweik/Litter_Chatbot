// Temporarily paste your API key here for local testing
const API_KEY = 'AIzaSyB2tIin2bsBFA46XBk9dwtKwmEOCaUl7pE'; 

// Function to fetch email data and handle questions
async function handleQuestionSubmit() {
    const userQuestion = document.getElementById('userQuestion').value;
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = "Loading...";

    // Read and load email data from CSV file
    const emailData = await fetchEmails();

    // Construct prompt for the AI based on user question and email data
    const prompt = `Summarize the following emails based on the question "${userQuestion}":\n\n${emailData}`;

    // Send to Google Generative AI
    const response = await fetchAIResponse(prompt);
    responseContainer.innerHTML = response || "No answer could be generated.";
}

// Fetch email data from CSV file
async function fetchEmails() {
    const response = await fetch('data/emails.csv');
    const csvText = await response.text();
    return csvText;
}

// Fetch response from Google Generative AI
async function fetchAIResponse(prompt) {
    const response = await fetch('https://api.generativeai.googleapis.com/v1beta2/models/gemini-pro:generateText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();
    return data.candidates?.[0]?.output || "No response";
}
