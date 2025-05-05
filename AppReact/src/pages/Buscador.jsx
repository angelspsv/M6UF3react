import { useState } from 'react';
import './Buscador.css';

function Buscador({ onBuscar }){
    const [inputText, setInputText] = useState('');


    function manejarClick() {
        onBuscar(inputText);  
        setInputText('');  
    }

    return (
        <div className="buscador-container">
            <h3>Cercador de productes...</h3>
            <input type="text" className="buscador-input" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button className="buscador-button" onClick={manejarClick}>Buscar</button>
        </div>
    );
}

export default Buscador;