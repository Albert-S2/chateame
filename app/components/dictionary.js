'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './dictionary.css';

export default function Dictionary() {
    const [selectedLang, setSelectedLang] = useState("Español");

    function handleLangClick(lang) {
        setSelectedLang(lang);
    }

    return (
        <div>
        <h1>Diccionario</h1>
        <div className="languageSelection">
            {["Español", "Ingles"].map((lang) => (
                <div 
                key={lang} 
                className={`language-button ${selectedLang === lang ? "selected" : ""}`}
                onClick={() => handleLangClick(lang)
                }
                >
                    {lang}
                </div>
            ))}
        </div>
            <form>
                <input type="text" placeholder="Buscar palabra" />
                <button type="submit">Buscar</button>
                <button type="reset">Limpiar</button>
            </form>
        </div>
    )        
}