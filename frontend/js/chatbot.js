// Detect chatbot type via HTML flag
const isAdmin = window.chatbotType === "admin";

const rasaURL = isAdmin
  ? "http://localhost:5006/webhooks/rest/webhook" // Admin Bot
  : "http://localhost:5005/webhooks/rest/webhook"; // User Bot

const senderID = isAdmin ? "admin_user" : "user_user";

// Ensure DOM is loaded before attaching events
document.addEventListener('DOMContentLoaded', function() {
  // Initialize chatbot if elements exist
  const chatButton = document.querySelector('.chat-button');
  const chatPopup = document.getElementById('chatPopup');
  
  if (chatButton && chatPopup) {
    console.log('Chatbot widget initialized successfully');
  } else {
    console.error('Chatbot elements not found in DOM');
  }
});

// Toggle the chat popup
function toggleChat() {
  const chat = document.getElementById("chatPopup");
  if (!chat) {
    console.error('Chat popup element not found');
    return;
  }
  
  if (chat.style.display === "flex") {
    chat.style.display = "none";
  } else {
    chat.style.display = "flex";
    chat.style.flexDirection = "column"; // Ensure vertical layout
    
    // Add greeting message if chat is empty
    const chatBody = document.getElementById("chatBody");
    if (chatBody && chatBody.children.length === 0) {
      const greetingMessage = isAdmin 
        ? "Hello Admin! How may I help you today?"
        : "Hello! Welcome to Walmart Assistant. How can I assist you?";
      
      appendMessage("Bot", greetingMessage, "bot");
    }
  }
}

// Handle Enter key
function handleKey(e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission
    sendMessage();
  }
}

// Send user message and get bot reply
function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");
  
  if (!input || !chatBody) {
    console.error('Required chatbot elements not found');
    return;
  }
  
  const msg = input.value.trim();
  if (msg === "") return;

  appendMessage("You", msg, "user");
  input.value = "";

  // 👉 Check for wallet balance intent
  const lowerMsg = msg.toLowerCase();
  const walletKeywords = [
    "wallet balance",
    "how much money",
    "check wallet",
    "my balance",
    "money in wallet",
  ];

  const isWalletQuery = walletKeywords.some((keyword) =>
    lowerMsg.includes(keyword)
  );

  if (isWalletQuery) {
    // Show typing indicator for wallet queries too
    showTyping();
    setTimeout(() => {
      hideTyping();
      const balance = localStorage.getItem("walletBalance") || "1200";
      const response = `Your wallet balance is ₹${parseFloat(balance).toFixed(
        2
      )}.`;
      appendMessage("Bot", response, "bot");
    }, 1000); // 1 second delay to simulate processing
    return; // 👈 Do NOT call Rasa
  }

  // Show typing indicator before making API call
  showTyping();

  // 👇 Proceed to Rasa if not wallet-related
  fetch(rasaURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: senderID,
      message: msg,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      hideTyping();
      if (data.length === 0) {
        appendMessage("Bot", "Sorry, I didn't understand that.", "bot");
      } else {
        data.forEach((res) =>
          appendMessage("Bot", res.text || "[No text response]", "bot")
        );
      }
    })
    .catch((err) => {
      hideTyping();
      appendMessage("Bot", "Error connecting to chatbot.", "bot");
      console.error(err);
    });
}

// Add message with timestamp
function appendMessage(sender, text, type) {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) {
    console.error('Chat body element not found');
    return;
  }
  
  const msgDiv = document.createElement("div");
  msgDiv.className = type === "user" ? "user-msg" : "bot-msg";

  const time = getCurrentTime();
  
  if (type === "user") {
    msgDiv.innerHTML = `${text}
      <div style="text-align: right; font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px;">${time}</div>`;
  } else {
    msgDiv.innerHTML = `${text}
      <div style="text-align: right; font-size: 11px; color: #a0aec0; margin-top: 4px;">${time}</div>`;
  }

  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Typing animation functions
function showTyping() {
  const chatBody = document.getElementById("chatBody");
  const typing = document.createElement("div");
  typing.className = "bot-msg";
  typing.id = "typingIndicator";
  typing.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

// Current time for timestamp
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Hide chat when clicking outside the popup
document.addEventListener("click", function (event) {
  const chatPopup = document.getElementById("chatPopup");
  const chatButton = document.querySelector(".chat-button");

  const isClickInsideChat = chatPopup.contains(event.target);
  const isClickOnButton = chatButton.contains(event.target);

  if (!isClickInsideChat && !isClickOnButton) {
    chatPopup.style.display = "none";
  }
});
