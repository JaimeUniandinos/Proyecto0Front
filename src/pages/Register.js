import React, { useState } from 'react';

const Login = ({ history }) => {
    const [email, setUser] = useState('');
    const [password, setPass] = useState('');

    const loginHandler = async () => {

        try {
            const response = await fetch('http://172.24.41.23:5000/users', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isLogged = await response.json();
            if (isLogged) {
                alert('Registro correcto');
                history.push('/login/' + email)
            }
            else {
                alert('Credenciales incorrectas')
            }
        }
        catch (error) {
            alert('Hubo un error');
        }

    };

    return <div>

        <h4><b>Registro</b></h4>
        <div onClick={() => history.push(`/login/email`)}>ir a Login</div>
        <div>
            <label>Usuario</label>
            <input value={email} onChange={event => setUser(event.target.value)} />
        </div>

        <div>
            <label>Contraseña</label>
            <input value={password} onChange={event => setPass(event.target.value)} type='password' />
        </div>

        <div>
            <button onClick={loginHandler}>Registrarse</button>
        </div>
    </div>;
};

export default Login;