import React, { useState } from 'react';
import './Chatbot.css';  // You can style the chatbot here.

const Chatbot = ({ websiteName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  // Handle sending message to backend (we'll add this in later steps)
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    setInput("");  // Clear input after sending

    // Call your backend API here for bot response
    try {
      const response = await fetch(`/chatbot/api?website=${websiteName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        {open ? "Close Chat" : "Open Chat"}
      </button>

      {/* Chatbox Window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
