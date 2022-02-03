import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddEvent = ({ history }) => {
    const [name, setName] = useState('');
    const [hora, setHora] = useState('');

    const { email } = useParams();

    const addHandler = async () => {

        try {
            await fetch('http://172.24.41.23:5000/event', {
                method: 'POST',
                body: JSON.stringify({ email, name, hora }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Evento creado');
            history.push('/events/' + email);
        }
        catch (error) {
            alert('Hubo un error');
        }

    };

    return <div>

        <h5>Agregar evento</h5>


        <div>
            <label>Nombre Evento</label>
            <input value={name} onChange={event => setName(event.target.value)} />
        </div>

        <div>
            <label>Hora Evento</label>
            <input value={hora} onChange={event => setHora(event.target.value)} type='hora' />
        </div>

        <div>
            <button onClick={addHandler}>Agregar evento</button>
        </div>


    </div>;
};

export default AddEvent;
