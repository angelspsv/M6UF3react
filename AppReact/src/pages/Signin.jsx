import React, { useState } from 'react';

function Signin(){
    const [nomEntrat, setNom] = useState('');
    const [emailEntrat, setEmail] = useState('');
    const [contrasenyaEntrada, setContrasenya] = useState('');
    const [any_neixEntrat, setAny] = useState('');
    const [admin, setAdmin] = useState(false); //boolean

    async function crearNouUsuari(){
        //fer aqui comprovacions per les dades entrades per l'usuari
        //.trim().toLowerCase()... que any_neix sigui numeric...
        //si un camp es incorrecte => return/alert
        //treiem posibles espais en blanc i email en minuscules
        let nom = nomEntrat.trim();
        let email = emailEntrat.trim().toLowerCase();
        let contrasenya = contrasenyaEntrada.trim();
        let any_neix = any_neixEntrat.trim();

        //validem que els camps no estiguin buits
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

        //construim objecte amb les dades del nou usuari
        const nouUsuari = {nom, email, contrasenya, any_neix, admin,};

        alert(`Dades del nou usuari:\n
                Nom: ${nom}\n
                Correu: ${email}\n
                Contrasenya: ${contrasenya}\n
                Any naixement: ${any_neix}\n
                Admin: ${admin ? 'Si' : 'No'}\n
            `);
        
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
            setAny('');
            setAdmin(false);

        }catch (error) {
            console.error('Error:', error);
            alert("Error al registrar l'usuari");
        }
    }

    return (
        <div>
            <h2>Pàgina de registre</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                crearNouUsuari();
            }}>
                <label htmlFor="nom">Nom: </label>
                <input id="nom" type="text" value={nomEntrat} onChange={(e) => setNom(e.target.value)} />
                <br />
                <label htmlFor="mail">Correu: </label>
                <input id="mail" type="email" value={emailEntrat} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="password">Contrasenya: </label>
                <input id="password" type="password" value={contrasenyaEntrada} onChange={(e) => setContrasenya(e.target.value)} />
                <br />
                <label htmlFor="year">Any de naixement: </label>
                <input id="year" type="text" value={any_neixEntrat} onChange={(e) => setAny(e.target.value)} />
                <br />
                {/* selector per indicar si es admin */}
                <span>
                    <span>Admin:</span>
                    <select value={admin} onChange={(e) => setAdmin(e.target.value === 'true')}>
                        <option value="false">No</option>
                        <option value="true">Si</option>
                    </select>
                </span>
                <br /> <br />
                <button type="submit">Registra't!</button>
            </form>
        </div>
    )
}

export default Signin