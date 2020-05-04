import React from 'react';
import AppNavbar from './components/layouts/AppNavbar';
import Dashboard from './components/layouts/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddClient from './components/clients/AddClients';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import Settings from './components/settings/settings';
import notFound from './notfound';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <AppNavbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/client/add' component={AddClient} />
              <Route exact path='/client/:id' component={ClientDetails} />
              <Route exact path='/client/edit/:id' component={EditClient} />
              <Route exact path='/login' component={LogIn} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/settings' component={Settings} />
              <Route exact path='/:notFound' component={notFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
