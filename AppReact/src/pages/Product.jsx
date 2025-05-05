import './Product.css';
import UnitatsCard from './UnitatsCard';
import { useState } from 'react';

function Product(props){

    let id = props.id;
    let nom = props.nom;
    let descripcio = props.descripcio;
    let preu = props.preu;
    let admin = props.admin;
    let elimProd = props.elimProd;
    let updateProd = props.updateProd;

    //faig servir useState per desar els nous valors de producte 
    //per l'opcio de l'editar
    const [editMode, setEditMode] = useState(false);
    const [nouNom, setNouNom] = useState(nom);
    const [novaDescripcio, setNovaDescripcio] = useState(descripcio);
    const [nouPreu, setNouPreu] = useState(preu);


    //funcio async await per esborrar un producte per ID
    async function eliminaProducte(id, nom){
        console.log(`L'usuari vol esborra l'element ${nom} amb ID ${id}`);

        //demanem confirmacio a l'usuari si o no vol esborrar el producte
        const confirmacio = confirm('Vols esborrar aquest producte?');
        if(!confirmacio){ return; }

        //si ID esta buit, return
        if(!id){
            console.log('El ID esta buit');
            alert('El ID esta buit');
            return;
        }

        try{
            const resposta = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE'
            });
            //si falla la consulta
            if(!resposta.ok){
                throw new Error(`No s'ha pogut esborrar l'element amb ID ${id}`);
            }

            //mostrem confirmacio de l'accio
            alert('Producte eliminat correctament!');
            console.log('Producte eliminat correctament!');
            //reload de la pagina/llista des del component pare
            if(elimProd){
                elimProd(id);
            }

        }catch (error){
            console.error('Error en esborrar:', error);
            alert('Error en esborrar el producte');
        }
    }


    //funcio update d'un producte
    async function actualitzarProducte(){
        if(!nouNom.trim() || !novaDescripcio.trim() || isNaN(parseFloat(nouPreu))){
            alert('Noves dades entrades no vàlides!');
            console.log('Noves dades entrades no vàlides!');
            return;
        }

        const preuNum = parseFloat(nouPreu);

        try {
            const resposta = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nom: nouNom,
                    descripcio: novaDescripcio,
                    preu: preuNum
                })
            });

            if (!resposta.ok) {
                throw new Error('Error al fer l\'actualització');
            }

            setEditMode(false);
            alert('Producte actualitzat correctament!');

            if(updateProd){
                updateProd({
                    id,
                    nom: nouNom,
                    descripcio: novaDescripcio,
                    preu: preuNum
                });
            }

        } catch(error){
            console.error('Error en actualitzar:', error);
            alert('Error en actualitzar el producte');
        }
    }


    return (
        <div className="producte-card">
            {editMode ? (
                <div className="formulari-edicio">
                    <h3>Estàs editant aquest producte:</h3>
                    <label>
                        Nom:<input type="text" value={nouNom} onChange={(e) => setNouNom(e.target.value)} />
                    </label>
                    <label>
                        Descripció:<input type="text" value={novaDescripcio} onChange={(e) => setNovaDescripcio(e.target.value)} />
                    </label>
                    <label>
                        Preu:<input type="number" step="0.01" value={nouPreu} onChange={(e) => setNouPreu(e.target.value)} />
                    </label>
                    <div className="botons-edicio">
                        <button onClick={actualitzarProducte}>Guardar</button>
                        <button onClick={function(){ setEditMode(false)}}>Cancel·lar</button>
                    </div>
                </div>
            ) : (
                <>
                    <p><strong>Nom:</strong> {nom}</p>
                    <p><strong>Descripció:</strong> {descripcio}</p>
                    <p><strong>Preu:</strong> {preu} €/kg</p>
                    <UnitatsCard />
                </>
            )}

           
            {admin && !editMode && (
                <div className="admin-controls">
                    <button onClick={function(){
                        setEditMode(true);
                    }}>Editar</button>
                    <button onClick={function(){
                        eliminaProducte(id, nom);
                    }}>Eliminar</button>
                </div>
            )}
        </div>
    )
}

export default Product