import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FormulariProducte() {
    const [nom, setNom] = useState('');
    const [descripcio, setDescripcio] = useState('');
    const [preu, setPreu] = useState('');
    const navigate = useNavigate();


    async function crearNouProducte(){
        //primer pas
        //validem les dades entrades: el preu ha de ser num valid
        //en el formulari els 3 camps son required aixi que no mirem si estan buits
        if(isNaN(parseFloat(preu)) || (parseFloat(preu)) <= 0){
            alert('El valor entrat no és vàlid!');
            return;
        }

        const nouProducte = { nom, descripcio, preu: parseFloat(preu) };
        console.log('Producte nou:', nouProducte);

        try{
            const resposta = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(nouProducte)
            });
            if (!resposta.ok) {
                throw new Error("Error al registrar el producte");
            }
            const data = await resposta.json();
            console.log('Nou producte', data);

            //esborrem els camps del formulari
            setNom('');
            setDescripcio('');
            setPreu('');

            //avisem de l'exit
            alert('Nou producte creat correctament!');

            //tornem l'usuari a la pagina de menu d'usuari
            navigate('/paginausuari');

        }catch(error){
            console.error('Error:', error);
            alert("Error al crear el nou producte");
        }
    }

    return (
        <div>
            <h2>Crea nou producte</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                crearNouProducte();
            }}>
                <label htmlFor="nom">Nom: </label>
                <input id="nom" type="text" value={nom} onChange={(e)=> setNom(e.target.value)} required />
                <br />
                <label htmlFor='descripcio'>Descripcio: </label>
                <input id="descripcio" type="text" value={descripcio} onChange={(e)=> setDescripcio(e.target.value)} required />
                <br />
                <label htmlFor='preu'>Preu: </label>
                <input id="preu" type="text" value={preu} onChange={(e)=> setPreu(e.target.value)} required />
                <br /><br />
                <button type="submit">Crea'l</button>
            </form>
        </div>
    );
}

export default FormulariProducte;

