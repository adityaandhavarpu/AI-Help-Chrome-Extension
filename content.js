const aiHelpImgURL = chrome.runtime.getURL("assets/ai-help-white.png");
let problemId = "";

function extractProblemId() {
  const url = window.location.href;
  const start = url.indexOf("problems/") + "problems/".length;
  const end = url.indexOf("?", start);
  return end === -1 ? url.substring(start) : url.substring(start, end);
}

function addAIHelpButton() {
  if (document.getElementById("ai-help-button")) return;
  const askButton = document.querySelector(".coding_ask_doubt_button__FjwXJ");
  if (!askButton) return;

  const aiBtn = document.createElement("img");
  aiBtn.id = "ai-help-button";
  aiBtn.src = aiHelpImgURL;
  aiBtn.style = "height: 40px; width: 40px; cursor: pointer;";
  askButton.parentNode.insertAdjacentElement("afterend", aiBtn);

  aiBtn.addEventListener("click", openChatBox);
  problemId = extractProblemId();
}

function openChatBox() {
  if (document.getElementById("ai-chat-box")) return;

  const chat = document.createElement("div");
  chat.id = "ai-chat-box";
  chat.style = `
    position: fixed; bottom: 20px; right: 20px; width: 400px; height: 400px;
    background: #1e2736; color: white; border-radius: 10px; z-index: 1000;
    display: flex; flex-direction: column; box-shadow: 0 0 10px rgba(0,0,0,0.2);
  `;

  chat.innerHTML = `
    <div style="background:#2b384e; padding:10px; border-top-left-radius:10px; border-top-right-radius:10px;">
      AI Help
      <button id="close-chat-box" style="float:right; background:none; border:none; color:white; font-size:20px;">&times;</button>
    </div>
    <div id="chat-body" style="flex:1; padding:10px; overflow-y:auto;"></div>
    <div style="display:flex; padding:10px; gap:10px;">
      <input id="chat-input" style="flex:1; padding:10px; border-radius:5px; border:none; background:#2b384e; color:white;" placeholder="Ask something..." />
      <button id="send-button" style="padding:10px; background:#2b384e; border:none; color:white; border-radius:5px;">Send</button>
    </div>
  `;

  document.body.appendChild(chat);
  document.getElementById("close-chat-box").onclick = () => chat.remove();
  document.getElementById("send-button").onclick = sendMessage;

  loadHistory();
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const prompt = `You are an AI assistant helping users with coding challenges on AlgoZenith. The problem ID is: ${problemId}. Help them thoughtfully. Be concise.`;

  getAIResponse(`${prompt}\n\nUser: ${message}`).then((reply) => {
    addMessage("ai", reply);
    saveHistory("ai", reply);
  });

  saveHistory("user", message);
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.style.textAlign = sender === "ai" ? "left" : "right";
  div.style.margin = "5px";
  div.innerHTML = sender === "ai" ? marked.parse(text) : text;
  document.getElementById("chat-body").appendChild(div);
}

function saveHistory(sender, message) {
  chrome.storage.local.get({ chatHistories: {} }, (res) => {
    const history = res.chatHistories;
    if (!history[problemId]) history[problemId] = [];
    history[problemId].push({ sender, message });
    chrome.storage.local.set({ chatHistories: history });
  });
}

function loadHistory() {
  chrome.storage.local.get({ chatHistories: {} }, (res) => {
    const history = res.chatHistories[problemId] || [];
    history.forEach(({ sender, message }) => addMessage(sender, message));
  });
}

function getAIResponse(userInput) {
  return new Promise((resolve, reject) => {
    const port = chrome.runtime.connect({ name: "aiHelpPort" });
    port.postMessage({ action: "getAIResponse", message: userInput });
    port.onMessage.addListener((response) => {
      resolve(response.response || "No response.");
      port.disconnect();
    });
  });
}

if (window.location.pathname.startsWith("/problems/")) {
  const observer = new MutationObserver(addAIHelpButton);
  observer.observe(document.body, { childList: true, subtree: true });
  addAIHelpButton();
}
