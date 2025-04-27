import React from 'react';
import Chatbot from '../components/chatbot';
import './chatpage.css';

export default function ChatPage() {
    return (
      <div>
        <main>
          <div className="chatpage-container">
          <Chatbot />
          </div> 
        </main>
      </div>
    );
  }