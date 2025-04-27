'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './dictionary.css';

export default function Dictionary() {

    return (
    <div className="dictionary-container">
        <h2 className="Dictionary-title">Diccionario</h2>
            <input
                type="text"
                // value={input}

                placeholder="Busca una palabra"
                className="dictionary-input"
            />
            <button>Enviar</button>




    </div>
    )
}


