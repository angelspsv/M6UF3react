import Button from './Button.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './PaginaUsuari.css';
import Buscador from './Buscador.jsx';
import Product from './Product.jsx';
import Ordena from './Ordena.jsx';



function PaginaUsuari({ setIsAuthenticated, usuari, admin }){
    const navigate = useNavigate();
    const [productes, setProductes] = useState([]);

    
    //funcio per tanca sessio de l'usuari per sortir
    function tancarSessio(){
        //demanem confimacio abans de tancar la sessio
        if(confirm('Vols tancar la sessió i sortir?')){
            //tornem a posar que l'usuari no esta identificat
            setIsAuthenticated(false);
            //enviem l'usuari a la pagina d'inici
            navigate('/');
            console.log('Sessió tancada correctament');
        }else{
            console.log('Usuari finalment no vol sortir');
            return;
        }
    }


    //funcio per obtenir els productes des de la taula i filtrar per nom
    async function gestioCerca(text){
        console.log("L'usuari vol cercar: ", text);

        const text_entrat = text.trim().toLowerCase();

        if(!text_entrat){
            console.log('El text esta buit');
            alert('El text esta buit');
            return;
        }

        //fem el fetch per obtenir tots els productes de la taula productes
        try{
            const resposta = await fetch(`http://localhost:3000/products`);

            //si la resposta no esta OK, excepcio/error
            if(!resposta.ok){
                throw new Error("Error al carregar productes");
            }

            const dataProducts = await resposta.json();
            //mostrem en la consola els objectes de productes retornats
            console.log(dataProducts);

            //es fara cerca a partir de text.length de 2 chars
            if(text_entrat.length < 2){
                alert("El text entrat és massa curt!");
                return;
            }

            //text de 2+ chars
            const objsFiltrats = dataProducts.filter(function(obj){
                return obj.nom.toLowerCase().includes(text_entrat);
            });
            
            //mostrar els resultats en llista
            console.log(objsFiltrats);
            setProductes(objsFiltrats);

        }catch(error){
            console.error('Error:', error);
            alert("Hi ha hagut un error en la consulta de la bbdd.");
        }
    }


    //funcio per ordenar els elements mostrats pel seu NOM o PREU
    function ordenarProductes(criteri) {
        //faig una copia de l'array de productes per treballar amb aquesta
        const copia = [...productes];

        switch (criteri) {
            case 'nomAsc':
                copia.sort((a, b) => {
                    if (a.nom > b.nom) return 1;
                    if(a.nom < b.nom) return -1;
                    return 0;
                });
                break;
            case 'nomDesc':
                copia.sort((a, b) => {
                    if(a.nom < b.nom) return 1;
                    if(a.nom > b.nom) return -1;
                    return 0;
                });
                break;
            case 'preuAsc':
                copia.sort((a, b) => a.preu - b.preu);
                break;
            case 'preuDesc':
                copia.sort((a, b) => b.preu - a.preu);
                break;
            default:
                break;
        }
        setProductes(copia);
    }


    return (
        <div>
            <Button text='Sortir' onClick={ function(){
                tancarSessio();
            }}/>

            <h1>Benvingut al teu panell, {usuari.toUpperCase()}!</h1>
            <p>Aquesta és una pàgina de productes amb diferentes opcions d'acord si un usuari té permisos d'admin o no. En aquest cas, tu {admin ? "tens" : "no tens"} permisos d'administrador!</p>
                        
            {admin && (
                <button onClick={() => navigate('/nou_producte')}>
                    Crear nou producte
                </button>
            )}

            <Buscador onBuscar={gestioCerca} />
            {productes.length > 0 && (
                <div>
                    <h3>Resultats de la cerca:</h3>
                    <Ordena ordenando={ordenarProductes} />
                    {productes.map((prod, index) => (
                        <Product key={index} id={prod.id} nom={prod.nom} descripcio={prod.descripcio} preu={prod.preu} admin={admin} elimProd={(idEliminat) => {
                            setProductes(prev => prev.filter(p => p.id !== idEliminat));
                        }}
                        updateProd={(producteActualitzat) => {
                            setProductes(prev =>
                                prev.map(p =>
                                    p.id === producteActualitzat.id ? producteActualitzat : p
                                )
                            );
                        }}
                        /> )
                    )}
                    {/*Amb setProductes filtrem la llista de productes excluent el producte esborrat i tornem a mostrar la llista actualitzada sense fer un reload de la pagina*/}
                </div>
            )}
        </div>
    )
}
export default PaginaUsuari
