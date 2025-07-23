const socket = io(); // connects to the server

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');

// Send message to server when send button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('chatMessage', message); // Send to server
        messageInput.value = '';
    }
    });

    // 🔊 Listen for messages from the server
socket.on('chatMessage', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  messageElement.classList.add('message'); // Optional: style with CSS
  chatMessages.appendChild(messageElement);
  
  // Optional: scroll to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});