import './Ordena.css';

function Ordena(props) {
    const ordenant = props.ordenando;
    return (
        <div id="boto">
            <button onClick={() => ordenant('nomAsc')}>Nom A-Z</button>
            <button onClick={() => ordenant('nomDesc')}>Nom Z-A</button>
            <button onClick={() => ordenant('preuAsc')}>Preu mínim</button>
            <button onClick={() => ordenant('preuDesc')}>Preu màxim</button>
        </div>
    );
}

export default Ordena;