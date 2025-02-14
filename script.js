// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase App and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Modal Elements
const authModal = document.getElementById("authModal");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.getElementById("closeModal");
const authForm = document.getElementById("authForm");
const authSubmit = document.getElementById("authSubmit");
const signUpButton = document.querySelector(".sign-up-button");
const loginButton = document.querySelector(".login-button");

// Open Modal
function openModal(isSignUp) {
  modalTitle.textContent = isSignUp ? "Sign Up" : "Login";
  authSubmit.textContent = isSignUp ? "Sign Up" : "Login";
  authModal.classList.remove("hidden");
}

// Close Modal
function closeModalHandler() {
  authModal.classList.add("hidden");
}

// Handle Form Submission
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Store user info in Firestore
    await addDoc(collection(db, "users"), { email, password });
    alert("Success! Account created or logged in.");
    closeModalHandler();
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
    alert("Error occurred. Please try again.");
  }
});

// Event Listeners
signUpButton.addEventListener("click", () => openModal(true));
loginButton.addEventListener("click", () => openModal(false));
closeModal.addEventListener("click", closeModalHandler);

let firstMessageSent = false;

document.getElementById("sendMessage").addEventListener("click", () => {
  const message = document.getElementById("userMessage").value;
  const image = document.getElementById("imageUpload").files[0]; // Get the uploaded image if any

  if (message || image) {
    if (!firstMessageSent) {
      // Remove the active chat image once the first message is sent
      document.getElementById("activeChatImage").style.display = "none";
      firstMessageSent = true;
    }

    // Display user message
    displayMessage(message, "user", image);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `AI Response to: ${message}`; // Replace with actual AI logic
      displayMessage(aiResponse, "ai");
    }, 1000);

    // Clear the input and image upload fields
    document.getElementById("userMessage").value = "";
    document.getElementById("imageUpload").value = "";
  }
});

function displayMessage(message, sender, image) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add(sender === "user" ? "text-right" : "text-left");

  let messageContent = `<div class="bg-gray-700 text-white p-3 mb-2 rounded-lg inline-block max-w-xs">${message}</div>`;

  if (image) {
    const imageUrl = URL.createObjectURL(image);
    messageContent = `<div class="bg-gray-700 text-white p-3 mb-2 rounded-lg inline-block max-w-xs"><img src="${imageUrl}" alt="User uploaded image" class="w-full h-auto rounded-lg" /></div>`;
  }

  messageContainer.innerHTML = messageContent;

  // Add Like/Unlike buttons and Share button
  const likeButton = document.createElement("button");
  likeButton.classList.add(
    "bg-blue-600",
    "text-white",
    "py-1",
    "px-3",
    "rounded-full",
    "hover:bg-blue-500",
    "focus:outline-none",
    "mr-2"
  );
  likeButton.innerHTML = "Like";

  const unlikeButton = document.createElement("button");
  unlikeButton.classList.add(
    "bg-red-600",
    "text-white",
    "py-1",
    "px-3",
    "rounded-full",
    "hover:bg-red-500",
    "focus:outline-none"
  );
  unlikeButton.innerHTML = "Unlike";

  const shareButton = document.createElement("button");
  shareButton.classList.add(
    "bg-green-600",
    "text-white",
    "py-1",
    "px-3",
    "rounded-full",
    "hover:bg-green-500",
    "focus:outline-none"
  );
  shareButton.innerHTML = "Share";

  messageContainer.appendChild(likeButton);
  messageContainer.appendChild(unlikeButton);
  messageContainer.appendChild(shareButton);

  // Append the message to chat window
  document.getElementById("chatWindow").appendChild(messageContainer);

  // Auto-scroll to the latest message
  document.getElementById("chatWindow").scrollTop =
    document.getElementById("chatWindow").scrollHeight;
}

// Sample chat data to simulate loading chat history
const chatData = {
    "Chat 1": [
      { sender: "user", message: "I want to buy a car." },
      { sender: "ai", message: "Sure! What type of car are you looking for?" }
    ],
    "Chat 2": [
      { sender: "user", message: "Tell me about financing options." },
      { sender: "ai", message: "We offer financing with 0% APR for the first year." }
    ],
    "Chat 3": [
      { sender: "user", message: "What about car insurance options?" },
      { sender: "ai", message: "We provide comprehensive insurance plans for all vehicles." }
    ]
  };
  
  // Function to load chat history
  function loadChat(chatTitle) {
    const chatWindow = document.getElementById("chatWindow");
  
    // Clear the chat window
    chatWindow.innerHTML = "";
  
    // Load messages from the selected chat
    if (chatData[chatTitle]) {
      chatData[chatTitle].forEach(({ sender, message }) => {
        displayMessage(message, sender);
      });
    } else {
      // If no chat data found
      chatWindow.innerHTML = `<div class="text-center text-gray-400">No messages found for ${chatTitle}</div>`;
    }
  }
  