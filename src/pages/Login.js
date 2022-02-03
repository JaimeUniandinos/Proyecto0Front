import React, { useState } from 'react';

const Login = ({ history }) => {
    const [email, setUser] = useState('');
    const [password, setPass] = useState('');


    const loginHandler = async () => {

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isLogged = await response.json();
            if (isLogged) {
                alert('Logueo correcto');
                history.push('/loged/' + email)
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

        <h4><b>Login</b></h4>

        <div>
            <label>Usuario</label>
            <input value={email} onChange={event => setUser(event.target.value)} />
        </div>

        <div>
            <label>Contraseña</label>
            <input value={password} onChange={event => setPass(event.target.value)} type='password' />
        </div>

        <div>
            <button onClick={loginHandler}>Ingresar</button>
        </div>
    </div>;
};

export default Login;