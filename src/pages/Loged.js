import React from 'react';
import { useParams } from 'react-router-dom';

const Loged = ({ history }) => {

    const { email } = useParams();

    return <div>

        <div>{email}</div>

        <div onClick={() => history.push('/events/' + email)}>Eventos</div>

        <div onClick={() => history.push('/add-event/' + email)}>Agregar evento</div>

    </div>;
};

export default Loged;