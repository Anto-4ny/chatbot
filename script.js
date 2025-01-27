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
