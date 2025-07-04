# AI Help Extension


## About

The AI Help Extension is a Chrome extension designed to provide AI assistance on the maang.in platform. It helps users by offering AI-generated responses to their queries related to problems on the platform.


## Description

This extension integrates with the maang.in platform to provide AI assistance. Users can enter their API key to enable the extension, which then allows them to interact with an AI to get help with problems. The extension also includes features like copying text, downloading chat history, and more.


## Features

* **AI Assistance** : Provides AI-generated responses to user queries.
* **API Key Management** : Users can enter and save their API key.
* **Copy Button** : Allows users to copy text with a single click.
* **Download Chat History** : Users can download the chat history for offline reference.
* **Theme Support** : Supports both light and dark themes.
* **Draggable and resizable Chat Box** : The chat box can be moved around the screen and resized as per the need.
* **Persistent Chat History** : Saves and loads chat history for each problem.
* **Problem Context awareness** : The AI already has the problem details, hints, editorial code of the problem for better responses.


## How to Run the Project

### Prerequisites

* Google Chrome browser
* HTML, CSS, JS environment

### Steps

1. **Clone the Repository**

2. **Load the Extension in Chrome**

* Open Chrome and go to [chrome://extensions/].
* Enable "Developer mode" using the toggle switch in the top right corner.
* Click on "Load unpacked" and select the directory where you cloned the repository.

3. **Enter Your API Key**

* Click on the extension icon in the Chrome toolbar.
* Enter your API key in the input field and click "Save".

4. **Using the Extension**

* Navigate to the maang.in platform.
* The AI help button will appear next to the "Ask Doubt" button when you are on a problems page.
* Click the AI help button to open the chat box and start interacting with the AI.

## Some Screenshots
![image](https://github.com/user-attachments/assets/20b8b9b9-9686-446a-8224-24c5ab94985b)

Entering the API key when using the extension for the first time

![image](https://github.com/user-attachments/assets/54136ea0-fccd-4e24-a91b-8e57b9546166)

An initial message displayed for better appeal

![image](https://github.com/user-attachments/assets/b76ee72c-9f55-42c1-83e4-62a71564484e)

Drag anywwhere and resize as per the need

![image](https://github.com/user-attachments/assets/c342645d-1e22-41cf-b1a0-060d30173ddd)

You can also download the conversation for problems

![image](https://github.com/user-attachments/assets/32752212-d68a-4524-ba59-6b59127c2bbf)

Directly copy paste the response/code.


## Additional Information

* API Key: The extension requires an API key to fetch AI responses. You can obtain an API key for gemini (the model used for the extension)from: https://aistudio.google.com/app/apikey.
* Theme Detection: The extension automatically detects the theme (light or dark) of the maang.in platform and adjusts the button and chat box styles accordingly.
* Error Handling: The extension includes error handling for API calls and other operations to ensure a smooth user experience.


