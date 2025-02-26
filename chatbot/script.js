// Get Elements
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWidget = document.getElementById("chatbot-widget");
const closeChatbotButton = document.getElementById("close-chatbot");
const messagesContainer = document.getElementById("chatbot-messages");
const predefinedQuestionsContainer = document.getElementById("predefined-questions");

// Ensure Chatbot is Hidden Initially
chatbotWidget.style.display = "none";

// Handle Chatbot Toggle
chatbotToggle.addEventListener("click", () => {
  if (!chatbotWidget.classList.contains("open")) {
    chatbotWidget.style.display = "flex";
    setTimeout(() => chatbotWidget.classList.add("open"), 10);
    greetUser();
  } else {
    chatbotWidget.classList.remove("open");
    setTimeout(() => (chatbotWidget.style.display = "none"), 500);
  }
});

// Close Chatbot
closeChatbotButton.addEventListener("click", () => {
  chatbotWidget.classList.remove("open");
  setTimeout(() => (chatbotWidget.style.display = "none"), 500);
});

// Display Greeting Message
function greetUser() {
  displayMessage("Hi! I'm Infra, your AI assistant. How can I assist you?", "bot");
  loadPredefinedQuestions();
}

// Load Predefined Questions
function loadPredefinedQuestions() {
  predefinedQuestionsContainer.innerHTML = "";
  const questions = [
    "What services do you offer?",
    "How can I contact EInfratech?",
    "Tell me about EInfratech.",
    "What industries do you serve?"
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

// Display Messages
function displayMessage(text, sender) {
  let msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.innerText = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Bot Replies
function generateBotReply(userText) {
  const replies = {
    "what services do you offer?": "We offer AI-driven workplace solutions.",
    "how can i contact einfratech?": "Email: info@einfratechsys.com.",
    "tell me about einfratech.": "We provide IoT, AI, and infrastructure solutions.",
    "what industries do you serve?": "Industries: Healthcare, Retail, Public Sector."
  };
  return replies[userText.toLowerCase()] || "I'm here to help!";
}
