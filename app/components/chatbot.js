'use client';
import { useState, useEffect, useRef } from 'react';
import './chatbot.css'; // Import your CSS file for styling

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Reference to the messages container
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

  function handleSubmit(event) {
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

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`Failed to fetch response from the server. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const assistantMessage = {
          role: "assistant",
          content: data.reply,
        };

        setMessages((prevMessages) => prevMessages.concat([assistantMessage]));
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessages((prevMessages) =>
          prevMessages.concat({
            role: "assistant",
            content: "Lo siento, hubo un problema al procesar tu mensaje.",
          })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleReset() {
    window.location.reload(); // Reloads the page
  }

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Chate a me!</h1>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              msg.role === "user" ? "chatbot-message-user" : "chatbot-message-assistant"
            }`}
          >
            <strong>{msg.role === "user" ? "Tú" : "Pedro"}:</strong> {msg.content}
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

      <button onClick={handleReset} className="chatbot-reset-button">
        Reset
      </button>
    </div>
  );
}