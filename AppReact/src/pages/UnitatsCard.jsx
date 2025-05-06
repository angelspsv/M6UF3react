import { useState } from "react";
import { useEffect } from "react";
import './UnitatsCard.css';

function UnitatsCard({ producte }){
    const [comp, setUnitatsCard] = useState(0);

    useEffect(() => {}, [comp]);

    //funcions comptador d'unitats d'articles
    const incr = function(){
        setUnitatsCard(comp +1);
    }

    const dec = function(){
        if (comp > 0){
            setUnitatsCard(comp - 1);
        }
    } 

    //funcio per afegir un article i les seves unitats al localStorage
    function addLocalStorageProduct(comp, producte){
        //faig objecte de producte per desar al localStorage amb id, nom, quantitat i preu
        const producteAlStorage = {
            id: producte.id,
            nom: producte.nom,
            preu: producte.preu,
            unitats: comp
        };

        //mirem si existeix cistella i sino la fem
        let cistella = JSON.parse(localStorage.getItem('cistella')) || [];

        //mirem si existeix el producte i si es aixi nomes s'actualitza
        const index = cistella.findIndex(prod => prod.id === producte.id);
        if(index !== -1){
            if(comp === 0){
                //esborrem producte de la cistella perque l'usuari ja no el desitja
                cistella.splice(index, 1);
            }else{
                cistella[index].unitats = comp;
            }
        }else{
            if(comp > 0){
                cistella.push(producteAlStorage);
            }
        }

        //afegim al localStorage l'array cistella
        localStorage.setItem('cistella', JSON.stringify(cistella));
        //ternaria per mostrar un missatge o un altre
        alert(comp === 0 ? 'Producte eliminat de la cistella!' : 'Producte afegit a la cistella!');
        
    }


    return (
        <div>
            <div className="unitats-container">
                <span>Unitats al carretó</span>
                <button className="unitats-btn" onClick={() => incr()}>+</button>
                <span className="unitats-display">{comp}</span>
                <button className="unitats-btn" onClick={() => dec()}>-</button>
            </div>
            <div className="afegir">
                <button className="btn-afegir" onClick={() => addLocalStorageProduct(comp, producte)}>Afegir producte a la cistella</button>
            </div>
        </div>
    );
}

export default UnitatsCard