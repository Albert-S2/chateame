'use client';
import React, { useState, useEffect } from 'react';
import Chatbot from '../components/chatbot';
import Dictionary from '../components/dictionary';
import Topic from '../components/topic';
import './chatpage.css';

export default function ChatPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showTopic, setShowTopic] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 430);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="chatpage-outer">
      <main className="chatpage-main">
        {/* Mobile toggle buttons at the top */}
        {isMobile && (
          <div className="mobile-toggle-buttons">
            <button
              className="mobile-dictionary-toggle"
              onClick={() => setShowDictionary(true)}
            >
              Diccionario
            </button>
            <button
              className="mobile-topic-toggle"
              onClick={() => setShowTopic(true)}
            >
              Tema
            </button>
          </div>
        )}

        {/* Modal overlays for mobile */}
        {isMobile && showDictionary && (
          <div className="mobile-overlay">
            <button
              className="mobile-close"
              onClick={() => setShowDictionary(false)}
            >
              X
            </button>
            <Dictionary />
          </div>
        )}
        {isMobile && showTopic && (
          <div className="mobile-overlay">
            <button
              className="mobile-close"
              onClick={() => setShowTopic(false)}
            >
              X
            </button>
            <Topic />
          </div>
        )}

        <div className="chatpage-grid">
          <div className="chatbot-section">
            <Chatbot />
          </div>
          <div className="right-section">
            {!isMobile && (
              <>
                <div className="dictionary-section">
                  <Dictionary />
                </div>
                <div className="topic-section">
                  <Topic />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}