// Get Elements
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWidget = document.getElementById("chatbot-widget");
const closeChatbotButton = document.getElementById("close-chatbot");
const popupMessagesContainer = document.createElement("div");
const predefinedQuestionsContainer = document.createElement("div");
const messagesContainer = document.createElement("div");

// Set up Pop-up Messages Container
popupMessagesContainer.id = "popup-messages";
document.body.appendChild(popupMessagesContainer);

// Set up Messages Container (Now Placed Above Questions)
messagesContainer.id = "chatbot-messages";
chatbotWidget.appendChild(messagesContainer);

// Set up Predefined Questions Container (Now Below Messages)
predefinedQuestionsContainer.id = "predefined-questions";
chatbotWidget.appendChild(predefinedQuestionsContainer);

// Function to Show Pop-up Messages on Hover
function showPopupMessages() {
  popupMessagesContainer.innerHTML = ""; // Clear previous messages

  // First message
  const message1 = document.createElement("div");
  message1.className = "popup-message";
  message1.innerText = "Hi Infra Here";
  popupMessagesContainer.appendChild(message1);

  // Second message appears after 0.5 seconds
  setTimeout(() => {
    const message2 = document.createElement("div");
    message2.className = "popup-message";
    message2.innerText = "How can I help you today?";
    popupMessagesContainer.appendChild(message2);
  }, 500);
}

// Show messages on hover
chatbotToggle.addEventListener("mouseenter", showPopupMessages);

// Remove messages when leaving the toggle button
chatbotToggle.addEventListener("mouseleave", () => {
  popupMessagesContainer.innerHTML = "";
});

// Ensure Chatbot is Hidden Initially
chatbotWidget.style.display = "none";

// Handle Chatbot Toggle Click
chatbotToggle.addEventListener("click", () => {
  popupMessagesContainer.innerHTML = ""; // Remove pop-up messages when clicked

  if (!chatbotWidget.classList.contains("open")) {
    chatbotWidget.style.display = "flex";
    setTimeout(() => chatbotWidget.classList.add("open"), 10);
    loadPredefinedQuestions(); // Load questions when chatbot opens
  } else {
    chatbotWidget.classList.remove("open");
    setTimeout(() => (chatbotWidget.style.display = "none"), 500);
  }
});

// Close Chatbot on Button Click
closeChatbotButton.addEventListener("click", () => {
  chatbotWidget.classList.remove("open");
  setTimeout(() => (chatbotWidget.style.display = "none"), 500);
});

// Function to Load Predefined Questions as Buttons (Now Below Chat Space)
function loadPredefinedQuestions() {
  predefinedQuestionsContainer.innerHTML = ""; // Clear previous questions
  predefinedQuestionsContainer.classList.add("question-container");

  const questions = [
    "What is Connected Workplace?",
    "Which industries do you serve?",
    "How can I schedule a demo?",
    "What support services do you offer?"
  ];

  questions.forEach((q) => {
    let btn = document.createElement("button");
    btn.className = "question-btn";
    btn.textContent = q;
    btn.onclick = () => {
      displayMessage(q, "user");
      setTimeout(() => displayMessage(generateBotReply(q), "bot"), 500);
    };
    predefinedQuestionsContainer.appendChild(btn);
  });
}



// Function to Display Messages in Chatbot
function displayMessage(text, sender) {
  let msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.innerText = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to Generate Bot Replies
function generateBotReply(userText) {
  const replies = {
    "what is connected workplace?": "Connected Workplace is our flagship solution handling facility management, space planning, corporate real estate, and more.",
    "which industries do you serve?": "We serve Healthcare, Public Sector, Retail, Life Sciences, and Education.",
    "how can i schedule a demo?": "Visit our Contact Us page to schedule a personalized demo with our team.",
    "what support services do you offer?": "We provide 24x7 global customer care. Call +1 800.331.2008 (US), +91 892.904.2908 (India), or +44 808.189.1871 (UK)."
  };
  return replies[userText.toLowerCase()] || "I'm here to help!";
}