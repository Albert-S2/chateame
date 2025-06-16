'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './chatbot.css';

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState(""); // State for the typing effect
  const [selectedLevel, setSelectedLevel] = useState("A1"); // Default level

  const router = useRouter();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingMessage]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleLevelClick(level) {
    setSelectedLevel(level); // Update the selected level
  }

  async function handleSubmit(event) {
    if (event) event.preventDefault();

    const userMessage = input.trim();
    if (!userMessage) return;

    const updatedMessages = messages.concat({
      role: "user",
      content: userMessage,
    });

    setInput("");
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          level: selectedLevel,
          history: updatedMessages, // Send the conversation history
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response. Status: ${response.status}`);
      }

      const data = await response.json();

      // Add the corrected sentence to the chat
      const correctedMessage = {
        role: "assistant",
        content: `<i>${data.corrected}</i>`,
      };

      setMessages((prev) => [...prev, correctedMessage]);

      // Start the typing effect for the bot's response
      simulateTypingEffect(data.reply);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) =>
        prevMessages.concat({
          role: "assistant",
          content: "Lo siento, hubo un problema al procesar tu mensaje.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  }

  const simulateTypingEffect = (text) => {
    setTypingMessage(""); // Clear previous
    let index = 0;
    let current = "";

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        current += text[index];
        setTypingMessage(current);
        index++;
      } else {
        clearInterval(typingInterval);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: text },
        ]);
        setTypingMessage("");
      }
    }, 50);
  };

  function handleReset() {
    window.location.reload();
  }

  function handleLogout() {
    // Clear the auth token cookie
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    
    router.push('/');
  }

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Chaté a me</h1>

      {/* Level Selection Boxes */}
      <div className="level-selection">
        {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
          <div
            key={level}
            className={`level-box ${selectedLevel === level ? "selected" : ""}`}
            onClick={() => handleLevelClick(level)}
          >
            {level}
          </div>
        ))}
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              msg.role === "user" ? "chatbot-message-user" : "chatbot-message-assistant"
            }`}
            dangerouslySetInnerHTML={{ __html: msg.content }}
          />
        ))}
        {typingMessage && (
          <div className="chatbot-message chatbot-message-assistant">
            {typingMessage}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {isLoading && <p className="chatbot-loading">Procesando...</p>}

      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..."
          className="chatbot-input"
        />
        <button type="submit" disabled={!input.trim()} className="chatbot-submit-button">
          Enviar
        </button>
      </form>

      <div className="chatbot-buttons">
        <button onClick={handleReset} className="chatbot-reset-button">
          Reset
        </button>
        <button onClick={handleLogout} className="chatbot-logout-button">
          Log out
        </button>
      </div>
    </div>
  );
}