'use client';
import { useState } from 'react';
import './topic.css';

export default function Topic() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setResult("");
        setLoading(true);
        try {
            const res = await fetch("/api/topic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: input }),
            });
            const data = await res.json();
            setResult(data.topicWords || data.error || "No result");
        } catch (err) {
            setResult("Error fetching topic words.");
        }
        setLoading(false);
    }

    function handleReset() {
        setInput("");
        setResult("");
    }

    return (
        <div className="topic-outer-container">
            <div className="topic-card">
                <h1 className="topic-title">Tema</h1>
                <div className="topic-form-container">
                    <form onSubmit={handleSubmit} className="topic-form">
                        <input
                            type="text"
                            placeholder="Introduce un tema"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="topic-input"
                        />
                        <button type="submit" className="topic-submit">Buscar</button>
                        <button
                            type="reset"
                            className="topic-reset"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </form>
                </div>
                <div className="topic-result-container">
                    {loading && <div className="topic-loading">Buscando...</div>}
                    {result && !loading && (
                        <div className="topic-result">
                            {result}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}