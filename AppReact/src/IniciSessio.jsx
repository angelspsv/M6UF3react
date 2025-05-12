import { useState } from 'react'
import Button from './pages/Button.jsx'
import Input from './pages/Input.jsx'


function IniciSessio(){
    const [mail, setMail] = useState('');
    const [contrasenya, setContrasenya] = useState('');

    async function mostrarMailPassword() {
        //per veure que tenim com email i contrasenya entrats
        console.log(`Correu: ${mail}\nContrasenya: ${contrasenya}`);

        //comprovar que cap dels camps esta buit
        if(!mail || !contrasenya){
            alert('No hi pot haver camps buits!');
            console.log('No hi pot haver camps buits!');
            return;
        }

        try{
            const resposta = await fetch(`http://localhost:3000/users`);

            //si resposta no esta OK, llançem error
            if(!resposta.ok){
                throw new Error("Error al carregar usuaris");
            }

            //obtenim tots els usuaris
            const usuaris = await resposta.json();

            //cerca del correu i contrasenya d'entre els usuaris
            const usuariTrobat = usuaris.find(
                (usuari) => usuari.email === mail.trim().toLowerCase()
            );

            //notifiquem el resultat
            if(usuariTrobat){
                const contrasenyaCorrecta = usuaris.find(
                    (usuari) => usuari.email === mail.trim().toLowerCase() && usuari.contrasenya === contrasenya
                );

                if(contrasenyaCorrecta){
                    console.log('Sessió iniciada correctament');
                    alert('Sessió iniciada correctament');
                    //buidem els camps d'inici de sessio
                    setMail('');
                    setContrasenya('');
                }else{
                    console.log('Contrasenya incorrecta');
                    alert('Contrasenya incorrecta');
                }
            }else{
                console.log('Usuari inexistent o incorrecte');
                alert('Usuari inexistent o incorrecte');
            }


        }catch(error){
            console.error('Error:', error);
            alert("Hi ha hagut un error en iniciar sessió.");
        }
    }


    return (
        <div>
            <Input texto="Correu electrònic:" valor={mail} onCanvi={setMail} />
            <Input texto="Contrasenya:" valor={contrasenya} onCanvi={setContrasenya} />
            <Button text="Entrar" onClick={mostrarMailPassword} />
            
        </div>
    )
}

export default IniciSessio