import React, { Component } from 'react';
import {
    deleteContact,
    addContact,
    FETCH_URL,
} from '../js/network/httputils.js';

const Context = React.createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            deleteContact(action.payload);
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== action.payload,
                ),
            };
        case 'ADD_CONTACT':
            const returnId = addContact(action.payload);
            return {
                ...state,
                contacts: [...returnId, ...state.contacts],
            };
        default:
            return state;
    }
};

export class Provider extends Component {
    state = {
        contacts: [],
        dispatch: action => this.setState(state => reducer(state, action)),
    };

    componentDidMount() {
        fetch(FETCH_URL)
            .then(response => response.json())
            .then(data => this.setState({ contacts: [...data] }));
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
