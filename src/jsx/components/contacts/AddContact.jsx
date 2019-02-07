import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

export default class AddContact extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        errors: {},
    };

    onInputChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (dispatch, e) => {
        e.preventDefault();

        const { name, email, phone } = this.state;

        // Check for errors
        if (name === '') {
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'Name is required' } });
            return;
        }
        if (phone === '') {
            this.setState({ errors: { phone: 'Name is required' } });
            return;
        }

        const newContact = {
            id: uuid(),
            name,
            email,
            phone,
            errors: {},
        };

        dispatch({ type: 'ADD_CONTACT', payload: newContact });

        this.setState({
            name: '',
            email: '',
            phone: '',
        });
    };

    render() {
        const { name, phone, email, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Contact</div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.onSubmit.bind(
                                        this,
                                        dispatch,
                                    )}
                                >
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name..."
                                        value={name}
                                        onChange={this.onInputChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone..."
                                        value={phone}
                                        onChange={this.onInputChange}
                                        error={errors.phone}
                                    />
                                    <TextInputGroup
                                        type="email"
                                        label="Email"
                                        name="email"
                                        placeholder="Enter Email..."
                                        value={email}
                                        onChange={this.onInputChange}
                                        error={errors.email}
                                    />
                                    <input
                                        type="submit"
                                        value="Add Contact"
                                        className="btn btn-light btn-block"
                                    />
                                </form>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}
