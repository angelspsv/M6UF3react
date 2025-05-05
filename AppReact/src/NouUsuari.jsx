import React, { useEffect, useState } from 'react';
import Titol from './pages/Titol.jsx'
import Input from './pages/Input.jsx'
import Button from './pages/Button.jsx';


function NouUsuari(){
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [admin, setAdmin] = useState(false); //boolean
    const [any_neix, setAny] = useState('');

    async function mostrarDadesNouUsuari(){
        //fer aqui comprovacions per les dades entrades per l'usuari
        //.trim().toLowerCase()... que any_neix sigui numeric...
        //si un camp es incorrecte => return/alert
        if (!nom || !email || !contrasenya || !any_neix){
            alert('No hi pot haver camps buits!');
            console.log('No hi pot haver camps buits!');
            return;
        }

        //validacio del email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('El correu electrònic entrat no és vàlid!');
            return;
        }

        //validacio de la contrasenya: minim 6 chars
        if (contrasenya.length < 6) {
            alert('La contrasenya és massa curta!');
            return;
        }

        //validacio de l'any de naixement: 4 nums
        if (!/^\d{4}$/.test(any_neix)) {
            alert("El any de naixement ha de tenir 4 números.");
            return;
        }


        const nouUsuari = {nom, email, contrasenya, admin, any_neix,};

        alert(`Dades del nou usuari:\n
                Nom: ${nom}\n
                Correu: ${email}\n
                Contrasenya: ${contrasenya}\n
                Admin: ${admin ? 'Si' : 'No'}\n
                Any naixement: ${any_neix}\n`);
        
        try{
            const resposta = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(nouUsuari)
            });
            if (!resposta.ok) {
                throw new Error("Error al registrar l'usuari");
            }
            const data = await resposta.json();
            console.log('Usuari registrat:', data);
            alert('Usuari registrat correctament!');

            //esborrem els camps del formulari
            setNom('');
            setEmail('');
            setContrasenya('');
            setAdmin(false);
            setAny('');

        }catch (error) {
            console.error('Error:', error);
            alert("Error al registrar l'usuari");
        }
    }

    return (
        <div>
            <Titol text="Registre. Nou usuari:" />
            <Input texto="Nom:" valor={nom} onCanvi={setNom} />
            <Input texto="Correu:" valor={email} onCanvi={setEmail} />
            <Input texto="Contrasenya:" valor={contrasenya} onCanvi={setContrasenya} />
            {/* Selector per indicar si és admin */}
            <div>
                <span>Admin:</span>
                <select value={admin} onChange={(e) => setAdmin(e.target.value === 'true')}>
                    <option value="false">No</option>
                    <option value="true">Si</option>
                </select>
            </div>
            <Input texto="Any de naixement:" valor={any_neix} onCanvi={setAny} />
            <Button text="Registra't!" onClick={
                function(){mostrarDadesNouUsuari()}
            } />
        </div>

    )
}

export default NouUsuari