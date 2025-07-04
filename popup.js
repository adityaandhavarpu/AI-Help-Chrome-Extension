document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");
    const chatBody = document.getElementById("chat-body");

    // new code
    const apiKeyInput = document.getElementById("api-key");
    const saveKeyButton = document.getElementById("save-key");
    const status = document.getElementById("status");
    
    // Load the saved API key if it exists
    chrome.storage.local.get(['apiKey'], (result) => {
        if (result.apiKey) {
            apiKeyInput.value = result.apiKey;
        }
    });

    // Save the API key to local storage
    saveKeyButton.addEventListener("click", () => {
        const apiKey = apiKeyInput.value;
        if (apiKey) {
            chrome.storage.local.set({ apiKey: apiKey }, () => {
                status.textContent = 'API key saved!';
                chrome.browserAction.setPopup({ popup: '' }); // Remove popup after saving API key
            });
        } else {
            status.textContent = 'Please enter a valid API key.';
        }
    });

    sendButton.addEventListener("click", async () => {
        const userMessage = chatInput.value;
        if (userMessage.trim() === "") return;

        addMessageToChat("user", userMessage);
        chatInput.value = "";

        const aiResponse = await getAIResponse(userMessage);
        addMessageToChat("ai", aiResponse);
    });
});

function addMessageToChat(sender, message) {
    const chatBody = document.getElementById("chat-body");
    const messageElement = document.createElement("div");
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
}

async function getAIResponse(userMessage) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "getAIResponse", message: userMessage }, (response) => {
            resolve(response.response);
        });
    });
}