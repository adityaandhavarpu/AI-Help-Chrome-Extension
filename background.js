chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "aiHelpPort") {
    port.onMessage.addListener(async (request) => {
      if (request.action === "getAIResponse") {
        try {
          const aiResponse = await fetchAIResponse(request.message);
          port.postMessage({ response: aiResponse });
        } catch (error) {
          console.error("API call failed:", error);
          port.postMessage({ response: "Failed to fetch AI response." });
        }
      }
    });
  }
});

async function fetchAIResponse(message) {
  const OPENAI_KEY = await new Promise((resolve, reject) => {
    chrome.storage.local.get(["openai-api-key"], (result) => {
      if (result["openai-api-key"]) resolve(result["openai-api-key"]);
      else reject("API key not found");
    });
  });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error("OpenAI API request failed");
  const data = await response.json();
  return data.choices[0].message.content.trim();
}
