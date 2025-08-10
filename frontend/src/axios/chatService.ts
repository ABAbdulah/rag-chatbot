import axios from "axios";

export async function sendChatMessage(question: string) {
  const res = await axios.post("http://localhost:8000/chat", {
    question,
  });
  return res.data.answer;
}
