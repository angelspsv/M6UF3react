
function LoginFormElement(props){
    
    return (
        <div>
            <h2>Inici de sessió:</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.iniciarSessio();
            }}>
                <label htmlFor="email">Correu electrònic: </label>
                <input type="email" id="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)}
/> 
                <br /><br />

                <label htmlFor="password">Contrasenya: </label>
                <input type="password" id="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)}
/>
                <br /><br />

                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default LoginFormElement