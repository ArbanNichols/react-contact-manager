import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Consumer } from './context';
import Header from './components/layout/Header';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import { Provider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <Provider>
                <Router>
                    <div className="App">
                        <Header branding="Contact Manager" />
                        <Consumer>
                            {value => {
                                const { contacts, dispatch, fetchUrl } = value;
                                return (
                                    <div className="container">
                                        <Switch>
                                            <Route
                                                exact
                                                path="/"
                                                render={props => (
                                                    <Contacts
                                                        contacts={contacts}
                                                        dispatch={dispatch}
                                                        url={fetchUrl}
                                                        {...props}
                                                    />
                                                )}
                                            />
                                            <Route
                                                exact
                                                path="/contact/add"
                                                render={props => (
                                                    <AddContact
                                                        dispatch={dispatch}
                                                        url={fetchUrl}
                                                        {...props}
                                                    />
                                                )}
                                            />
                                            <Route
                                                exact
                                                path="/contact/edit/:id"
                                                render={props => (
                                                    <EditContact
                                                        dispatch={dispatch}
                                                        url={fetchUrl}
                                                        {...props}
                                                    />
                                                )}
                                            />
                                            <Route
                                                exact
                                                path="/about"
                                                component={About}
                                            />
                                            <Route component={NotFound} />
                                        </Switch>
                                    </div>
                                );
                            }}
                        </Consumer>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
