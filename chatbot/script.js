// Get Elements
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWidget = document.getElementById("chatbot-widget");
const closeChatbotButton = document.getElementById("close-chatbot");
const popupMessagesContainer = document.createElement("div");
const predefinedQuestionsContainer = document.createElement("div");
const messagesContainer = document.createElement("div");

// Ensure Proper IDs
popupMessagesContainer.id = "popup-messages";
messagesContainer.id = "chatbot-messages";
predefinedQuestionsContainer.id = "predefined-questions";

// Append Containers Inside Chatbot
chatbotWidget.appendChild(messagesContainer);
chatbotWidget.appendChild(predefinedQuestionsContainer);
document.body.appendChild(popupMessagesContainer);


// Function to Show Popup Messages with Smooth Delay
function showPopupMessages() {
  popupMessagesContainer.innerHTML = ""; // Clear previous messages
  popupMessagesContainer.style.display = "flex"; // ✅ Make sure it appears!
  popupMessagesContainer.style.opacity = "1"; // ✅ Smooth fade-in

  // Create First Message
  setTimeout(() => {
    const message1 = document.createElement("div");
    message1.className = "popup-message";
    message1.innerText = "Hi, Infra Here!";
    popupMessagesContainer.appendChild(message1);
  }, 100); // Short delay for the first message

  // Create Second Message with Smoother Delay
  setTimeout(() => {
    const message2 = document.createElement("div");
    message2.className = "popup-message";
    message2.innerText = "How can I help you today?";
    popupMessagesContainer.appendChild(message2);
  }, 400); // Faster transition for a smooth experience
}

// Ensure pop-up messages appear when hovering
chatbotToggle.addEventListener("mouseenter", showPopupMessages);

// Hide pop-ups smoothly when mouse leaves
chatbotToggle.addEventListener("mouseleave", () => {
  popupMessagesContainer.style.opacity = "0"; // ✅ Smooth fade-out
  setTimeout(() => {
    popupMessagesContainer.style.display = "none"; // Hides after fade-out
  }, 300); // Delay should match fade-out time
});




// Close Chatbot on Button Click
closeChatbotButton.addEventListener("click", () => {
  chatbotWidget.classList.remove("open");
  setTimeout(() => (chatbotWidget.style.display = "none"), 500);
});

// Handle Chatbot Toggle Click
chatbotToggle.addEventListener("click", () => {
  popupMessagesContainer.innerHTML = ""; // Remove pop-up messages when clicked
  if (!chatbotWidget.classList.contains("open")) {
    chatbotWidget.style.display = "flex";
    setTimeout(() => chatbotWidget.classList.add("open"), 10);
    setTimeout(() => loadPredefinedQuestions(), 300); // Ensure questions load properly
  } else {
    chatbotWidget.classList.remove("open");
    setTimeout(() => (chatbotWidget.style.display = "none"), 500);
  }
});

// Function to Load Predefined Question Categories
function loadPredefinedQuestions() {
  predefinedQuestionsContainer.innerHTML = ""; // Clear previous content
  predefinedQuestionsContainer.classList.add("question-container");

  // Define categories and their respective questions
  const categories = {
    "Products & Services": [
      "What products or solutions do you offer?",
      "Can you provide details about your specific product/service?",
      "What are the key benefits of using your solutions?",
      "Do you offer customized solutions?",
      "What technologies do you use in your products/services?"
    ],
    "Pricing & Quotes": [
      "How can I get a price quote?",
      "Do you offer free consultations or demos?",
      "Are there any discounts for bulk orders?",
      "What payment methods do you accept?"
    ],
    "Support & Troubleshooting": [
      "How can I get technical support?",
      "What is your warranty policy?",
      "Do you provide on-site support or remote assistance?",
      "Where can I find product manuals or guides?"
    ],
    "Partnerships & Careers": [
      "How can I become a partner or distributor?",
      "Are you hiring?",
      "How can I apply for a job at Einfratech?"
    ]
  };

  // Create category buttons
  Object.keys(categories).forEach(category => {
    let categoryBtn = document.createElement("button");
    categoryBtn.className = "category-btn";
    categoryBtn.textContent = category;
    categoryBtn.onclick = () => showQuestions(category, categories[category]); // Show questions on click
    predefinedQuestionsContainer.appendChild(categoryBtn);
  });
}

// Function to Show Questions for a Selected Category
function showQuestions(category, questions) {
  predefinedQuestionsContainer.innerHTML = ""; // Clear previous content

  // Back Button to Go Back to Categories
  let backBtn = document.createElement("button");
  backBtn.className = "category-btn back-btn";
  backBtn.textContent = "← Back to Categories";
  backBtn.onclick = loadPredefinedQuestions; // Reload categories on click
  predefinedQuestionsContainer.appendChild(backBtn);

  // Display category questions as buttons
  questions.forEach(q => {
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
    "what support services do you offer?": "We provide 24x7 global customer care. Call +1 800.331.2008 (US), +91 892.904.2908 (India), or +44 808.189.1871 (UK).",
    "what products or solutions do you offer?": "We offer a range of products and services, including global connectivity tools, AV equipment rentals, expert electrical repairs, AV investment protection, seamless device integration, and user training for facility tools.",
    "can you provide details about your specific product/service?": "Certainly! Please specify which product or service you're interested in, and I'll provide more detailed information.",
    "what are the key benefits of using your solutions?": "Our solutions offer seamless integration, tailored designs to meet specific needs, cutting-edge technology, and reliable performance, enhancing communication and operational efficiency.",
    "do you offer customized solutions?": "Yes, we provide tailored solutions designed to meet your specific requirements and anticipate future demands.",
    "what technologies do you use in your products/services?": "We integrate cutting-edge video, voice, and data technologies to create innovative and reliable digital experiences.",
    "how can i get a price quote?": "To obtain a price quote, please contact us at sales@einfratech.com or call 080-4377 3134.",
    "do you offer free consultations or demos?": "Yes, we offer free consultations and demos. Visit our Contact Us page to schedule a session with our team.",
    "are there any discounts for bulk orders?": "We do offer discounts for bulk orders. Please reach out to our sales team at sales@einfratech.com for detailed information.",
    "what payment methods do you accept?": "We accept various payment methods. For specific details, please contact our billing department at sales@einfratech.com.",
    "how can i get technical support?": "For technical support, call us at 080-4377 3134 or email sales@einfratech.com.",
    "what is your warranty policy?": "Our products come with a standard warranty. For detailed terms, please contact our support team.",
    "do you provide on-site support or remote assistance?": "We offer both on-site support and remote assistance to cater to your specific needs.",
    "where can i find product manuals or guides?": "Product manuals and guides are available upon request. Please contact our support team to obtain the necessary documents.",
    "how can i become a partner or distributor?": "To explore partnership or distributorship opportunities, please email us at sales@einfratech.com.",
    "are you hiring?": "Yes, we have current openings. Visit our Careers page for more information.",
    "how can i apply for a job at einfratech?": "To apply for a position, please visit our Careers page and submit your application."
  };
  return replies[userText.toLowerCase()] || "I'm here to help!";
}
