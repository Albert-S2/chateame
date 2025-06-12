'use client';
import { useState } from 'react';
import './dictionary.css';

export default function Dictionary() {
    const [selectedLang, setSelectedLang] = useState("Español");
    const [result, setResult] = useState("");
    const [input, setInput] = useState("");

    function handleLangClick(lang) {
        setSelectedLang(lang);
    }

    return (
        <div className="dictionary-outer-container">
            <div className="dictionary-card">
                <h1 className="dictionary-title">Diccionario</h1>
                <div className="languageSelection">
                    {["Español", "Inglés"].map((lang) => (
                        <div
                            key={lang}
                            className={`language-button ${selectedLang === lang ? "selected" : ""}`}
                            onClick={() => handleLangClick(lang)}
                        >
                            {lang}
                        </div>
                    ))}
                </div>
                <div className="dictionary-form-container">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setResult("");
                            const res = await fetch("/api/dictionary", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ word: input, leng: selectedLang }),
                            });
                            const data = await res.json();
                            setResult(data.translation || data.error || "No result");
                        }}
                        className="dictionary-form"
                    >
                        <input
                            type="text"
                            placeholder="Buscar palabra"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="dictionary-input"
                        />
                        <button
                            type="submit"
                            className="dictionary-submit"
                            disabled={!input.trim()} // disables if input is empty
                        >
                            Buscar
                        </button>
                        <button
                            type="reset"
                            className="dictionary-reset"
                            onClick={() => {
                                setInput("");
                                setResult("");
                            }}
                        >
                            Reset
                        </button>
                    </form>
                </div>
                {result && (
                    <div className="dictionary-result-container">
                        <div className="dictionary-result">
                            {result}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}