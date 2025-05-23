import { useState } from 'react';
import LoginFormElement from './LoginFormElement.jsx';
import { useNavigate } from 'react-router-dom';


function Login({ setIsAuthenticated, setUsuari, setAdmin }){
    const [mail, setMail] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const navigate = useNavigate();

    async function entrarZonaPersonal(){
        //per veure que tenim com email i contrasenya entrats
        console.log(`Correu: ${mail}\nContrasenya: ${contrasenya}`);

        //comprovar que cap dels camps esta buit
        if(!mail || !contrasenya){
            alert('No hi pot haver camps buits!');
            console.log('No hi pot haver camps buits!');
            return;
        }

        //fem la consulta per obtenir les dades de l'usuari i 
        //veure si mail i pswd son correctes per poder accedir
        try{
            const resposta = await fetch(`http://localhost:3000/users`);

            //si resposta no esta OK, llançem error
            if(!resposta.ok){
                throw new Error("Error al carregar usuaris");
            }

            //obtenim tots els usuaris
            const usuaris = await resposta.json();

            //cerca del correu i contrasenya d'entre els usuaris
            const usuariCorrecte = usuaris.find(
                (usuari) => usuari.email === mail.trim().toLowerCase() && usuari.contrasenya === contrasenya
            );
            if(usuariCorrecte){
                console.log('Sessió iniciada correctament');
                alert('Sessió iniciada correctament');
                //amb la sessio iniciada correctament
                setIsAuthenticated(true);
                //desem el nom de l'usuari i si es admin o no
                setUsuari(usuariCorrecte.nom);
                setAdmin(usuariCorrecte.admin);
                //redirigim l'usuari a la pàgina d'usuari
                navigate('/paginausuari');

                //buidem els camps d'inici de sessio
                setMail('');
                setContrasenya('');
            }else{
                console.log('Usuari o contrasenya incorrecta');
                alert('Usuari o contrasenya incorrecta');
            }

        }catch(error){
            console.error('Error:', error);
            alert("Hi ha hagut un error en iniciar sessió.");
        }
    }


    return (
        <div>
            <LoginFormElement email={mail} setEmail={setMail} password={contrasenya} setPassword={setContrasenya} iniciarSessio={entrarZonaPersonal}/>
        </div>
    )
}

export default Login