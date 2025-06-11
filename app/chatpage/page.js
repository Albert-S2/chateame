import React from 'react';
import Chatbot from '../components/chatbot';
import Dictionary from '../components/dictionary';
import Topic from '../components/topic';
import './chatpage.css';

export default function ChatPage() {
    return (
      <div className="chatpage-outer">
        <main className="chatpage-main">
          <div className="chatpage-grid">
            <div className="chatbot-section">
              <Chatbot />
            </div>
            <div className="right-section">
              <div className="dictionary-section">
                <Dictionary />
              </div>
              <div className="topic-section">
                <Topic />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}