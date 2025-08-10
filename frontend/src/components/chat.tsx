import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { sendChatMessage } from "../axios/chatService"; // import from the service file
import IntroText from "./IntroText";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const answer = await sendChatMessage(userInput);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pb-8 flex flex-col h-screen">
      {/* <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide p-4 rounded"> */}
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide p-4 rounded">
  {messages.length === 0 && !loading ? (
    
    <IntroText /> // show intro when there are no messages yet
  ) : (
    <>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-lg max-w-lg ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
              <span className="animate-bounce [animation-delay:0.4s]">.</span>
            </div>
          </div>
        )}
 </>
  )}
  <div ref={messagesEndRef} />
</div>
        {/* <div ref={messagesEndRef} />
      </div> */}

      <div className="flex items-center border rounded-full p-1 px-2">
        <input
          className="flex-1 p-3 rounded-full outline-none border-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
