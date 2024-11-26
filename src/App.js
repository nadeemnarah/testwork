
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { user: "You", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Send message to the backend API
    // const response = await fetch("https://mehcart.com/api/chat", {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { user: "Bot", text: data.response }]);

    setInput("");
  };

  return (
    <div className="chatbot" style={{ position: "fixed", bottom: "10px", right: "10px" }}>
      {isOpen ? (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.user === "You" ? "user" : "bot"}`}>
                <div className="chat-avatar">
                  {msg.user === "You" ? "👤" : "🤖"}
                </div>
                <div className="chat-text">{msg.text}</div>
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
      ) : (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default App;











  // I have created a basic chatbot in react in my local server it looks nice, and it seems working as expected, I have run "npm run build" and pasted build folder's all files in my next.js live running app's public folder, and I have created a page inside "src/pages/chatbot.js". 

  // Now I can see my chatbot in mydomain that is "https://mehcart.com/chatbot"

  // IN MY LOCAL SERVER I HAD A NODE.JS APP THAT WAS CONNECTING WITH THIS REACT APP, WHICH IS 



// import React, { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSendMessage = async () => {
//     const newMessage = { user: "You", text: input };
//     setMessages((prev) => [...prev, newMessage]);

//     // Send message to the backend API
//     const response = await fetch("http://193.203.160.63:5000/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });
//     const data = await response.json();
//     setMessages((prev) => [...prev, { user: "Bot", text: data.response }]);

//     setInput("");
//   };

//   return (
//     <div className='chatbot' style={{ position: "fixed", bottom: "10px", right: "10px" }}>
//       {isOpen ? (
//         <div
//           style={{
//             width: "300px",
//             height: "400px",
//             background: "white",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//           }}
//         >
//           <div
//             style={{
//               padding: "10px",
//               background: "#007BFF",
//               color: "white",
//               borderRadius: "10px 10px 0 0",
//             }}
//           >
//             <span>Chatbot</span>
//             <button
//               onClick={() => setIsOpen(false)}
//               style={{
//                 float: "right",
//                 background: "none",
//                 border: "none",
//                 color: "white",
//                 cursor: "pointer",
//               }}
//             >
//               X
//             </button>
//           </div>
//           <div
//             style={{
//               height: "calc(100% - 80px)",
//               overflowY: "auto",
//               padding: "10px",
//             }}
//           >
//             {messages.map((msg, idx) => (
//               <div key={idx} style={{ margin: "5px 0" }}>
//                 <b>{msg.user}:</b> {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="sendMessage" style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               style={{ width: "calc(100% - 50px)", padding: "5px" }}
//             />
//             <button onClick={handleSendMessage} style={{ padding: "5px" }}>
//               Send
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsOpen(true)}
//           style={{
//             background: "#007BFF",
//             color: "white",
//             border: "none",
//             borderRadius: "50%",
//             width: "50px",
//             height: "50px",
//             cursor: "pointer",
//           }}
//         >
//           💬
//         </button>
//       )}
//     </div>
//   );
// };

// export default App;



