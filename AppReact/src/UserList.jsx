import React, { useEffect, useState } from 'react';
import Titol from './pages/Titol.jsx'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await fetch('http://localhost:3000/users');
                const data = await response.json();
                setUsers(data);
            }catch (error){
                console.error('Error al obtenir usuaris:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Carregant usuaris...</p>;

    

    return (
        <div>
            <Titol text="Llista de Usuaris" />
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.nom} ({user.id}, {user.email}, {user.contrasenya})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
