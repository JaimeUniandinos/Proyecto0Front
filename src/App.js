import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Loged from './pages/Loged';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';

const routes = [
    { path: '/login/:email', Component: Login },
    { path: '/register/:email', Component: Register },
    { path: '/loged/:email', Component: Loged },
    { path: '/events/:email', Component: Events },
    { path: '/add-event/:email', Component: AddEvent },
];

function App() {
    return (
        <Suspense fallback={<span>Cargando...</span>}>
            <Switch>
                {routes.map(({ path, Component }) =>
                    <Route
                        key={path}
                        path={path}
                        component={Component}
                    />)}
            <Route path="*"><Redirect to="/login/email"/></Route>
            </Switch>
        </Suspense>
    );
}

export default App;