import React, { Component } from 'react';

const Context = React.createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== action.payload,
                ),
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
            };
        default:
            return state;
    }
};

export class Provider extends Component {
    state = {
        contacts: [
            {
                id: 10000,
                name: 'Billy Cobham',
                email: 'billy.cobham@gmail.com',
                phone: '',
            },
            {
                id: 10001,
                name: 'Ramsey Lewis',
                email: 'ramsey.lewis@gmail.com',
                phone: '',
            },
            {
                id: 10002,
                name: 'John Coltrane',
                email: 'john.coltrane@gmail.com',
                phone: '',
            },
        ],
        dispatch: action => this.setState(state => reducer(state, action)),
    };

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
