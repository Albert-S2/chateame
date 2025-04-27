'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './chatbot.css';

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("A1"); // Default level

  const router = useRouter();
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages container
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleLevelClick(level) {
    setSelectedLevel(level); // Update the selected level
  }

  async function handleSubmit(event) {
    event.preventDefault();

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
        body: JSON.stringify({ message: userMessage, level: selectedLevel }), // Include level in the request
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response. Status: ${response.status}`);
      }

      const data = await response.json();

      const correctedMessage = {
        role: "assistant",
        type: "correction",
        content: `${data.corrected}`,
      };

      const assistantMessage = {
        role: "assistant",
        type: "response",
        content: data.reply,
      };

      setMessages((prevMessages) =>
        prevMessages.concat([correctedMessage, assistantMessage])
      );
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

  function handleReset() {
    window.location.reload(); // Reloads the page
  }

  function handleLogout() {
    // Clear the auth token cookie
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to the main page
    router.push('/');
  }

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">¡Chaté a me!</h1>

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
          >
            {msg.type === "correction" ? (
              <div className="correction-message">
                <em>
                  {msg.content}
                </em>
              </div>
            ) : (
              <>
                <strong>{msg.role === "user" ? "Tú" : "¡Chaté a me!"}:</strong> {msg.content}
              </>
            )}
          </div>
        ))}
        {/* Invisible div to ensure scrolling to the bottom */}
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