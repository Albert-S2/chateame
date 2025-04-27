'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './dictionary.css';

export default function Dictionary() {

    function handleSubmit(event) {
        event.preventDefault ()
    }
    return (
    <div className="dictionary-container">
        <h2 className="Dictionary-title">Diccionario</h2>
        <form className="dictionary-form" onSubmit={handleSubmit}>
            <input
                type="text"

                placeholder="Busca una palabra"
                className="dictionary-input"
            />
            <button type="submit">Enviar</button>
        </form>
    </div>
    )
}


