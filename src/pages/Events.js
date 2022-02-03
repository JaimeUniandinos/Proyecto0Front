import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Events = ({ history }) => {
    const [events, setEvents] = useState([]);

    const { email } = useParams();

    useEffect(() => {
        const get = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/show/events', {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const events = await response.json();
                setEvents(events);
            }
            catch (error) {
                alert('Error al obtener los eventos');
            }
        };
        get();
    }, [email]);

    const deleteHandler = async (name) => {

        try {
            await fetch('http://127.0.0.1:5000/delete/event', {
                method: 'POST',
                body: JSON.stringify({ email, name }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Evento eliminado');
            setEvents(prevEvents => prevEvents.filter(({ name: prevName }) => prevName !== name));
        }
        catch (error) {
            alert('Hubo un error');
        }

    };

    const savechanges = async () => {

        try {
            for (const { name, hora } of events) {

                await fetch('http://127.0.0.1:5000/edit/event', {
                    method: 'POST',
                    body: JSON.stringify({ email, name, hora }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            }
            alert('Correctamente guardado');
        }
        catch (error) {
            alert('Hubo un error al guardar');
        }


    };

    return <div>

        <h5>Eventos</h5>

        <div onClick={() => history.push(`/add-event/${email}`)}>Añadir evento</div>

        <div>
            {events.map(({ name, hora }, idx) => <div key={name} style={{ backgroundColor: '#FFFFAA', marginBottom: '20px' }}>
                <div>{name}</div>
                <input value={hora} onChange={event => {
                    setEvents(prevEvents => {
                        const eventsAux = [...prevEvents];
                        eventsAux[idx].hora = event.target.value;
                        return eventsAux;
                    });
                }} />
                <div style={{ color: '#FF0000' }} onClick={() => deleteHandler(name)}>Eliminar</div>
            </div>)}
        </div>

        <div style={{ color: '#00FF00' }} onClick={() => savechanges()}>Guardar cambios</div>

    </div>;
};

export default Events;