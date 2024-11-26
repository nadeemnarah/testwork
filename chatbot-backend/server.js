// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.post("/api/chat", (req, res) => {
//   const userMessage = req.body.message;
//   // Simple echo bot logic
//   console.log("check ", userMessage)
//   const botResponse = `Echo: ${userMessage}`;
//   res.json({ response: botResponse });
// });

// app.listen(5000, () => {
//   console.log("Chatbot backend running on http://localhost:5000");
// });


const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:3000" // Allow requests only from this origin
}));

app.use(express.json());

const knowledgeBase = {
  admissions: "Admissions are open from March to June. Visit the admissions office or contact us at admission@school.com.",
  fee_structure: "The annual fee is $5000, including tuition, lab, and library charges.",
  admissions_process: "check admission@school.com.",
  admission: "check works ig com.",
  career: "For career opportunities, check the Careers page on our website or email careers@school.com."
};

app.post("/api/chat", (req, res) => {
  const query = req.body.message.toLowerCase();
  let response = "I'm sorry, I couldn't understand your question. Please try again.";

  if (query.includes("admission")) response = knowledgeBase.admissions;
  if (query.includes("fee")) response = knowledgeBase.fee_structure;
  if (query.includes("career")) response = knowledgeBase.career;
//   if (query.includes("admission")) response = knowledgeBase.admission;
  if (query.includes("admissions process")) response = knowledgeBase.admissions_process;

  res.json({ response });
});


app.listen(5000, () => {
  console.log("Chatbot backend running on port http://localhost:5000");
});
