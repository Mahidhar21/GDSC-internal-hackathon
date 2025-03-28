function displayMessage(text, isUser) {
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement("div");
    message.classList.add("message");
    message.classList.add(isUser ? "user" : "bot");
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getResponse() {
    const query = document.getElementById("querybox").value;
    if (!query) return;
    displayMessage(query, true);
    document.getElementById("query").value = "";
    displayMessage("Fetching response...", false);

    try {
        const response = await fetch(`https://api.cricapi.com/v1/statistics?query=${encodeURIComponent(query)}&apikey=YOUR_API_KEY`);
        const data = await response.json();
        if (data && data.response) {
            displayMessage(data.response, false);
        } else {
            displayMessage("Sorry, I couldn't find an answer. Please try a different question.", false);
        }
    } catch (error) {
        displayMessage("Error fetching data. Please check your internet connection.", false);
    }
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  
        getResponse();
        document.getElementById("querybox").value = ""; 
    }
}