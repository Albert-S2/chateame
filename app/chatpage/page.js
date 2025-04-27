import React from 'react';
import Chatbot from '../components/chatbot';
import Dictionary from '../components/dictionary';
import './chatpage.css';

export default function ChatPage() {
    return (
      <div>
        <main>
          <div className="chatpage-container">
          <Chatbot />
          <Dictionary />
          </div> 
        </main>
      </div>
    );
  }