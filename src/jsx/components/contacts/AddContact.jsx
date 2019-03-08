import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';

export default class AddContact extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        errors: {},
    };

    onInputChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = async e => {
        e.preventDefault();

        const { name, email, phone } = this.state;
        const { dispatch, url } = this.props;

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
            name,
            email,
            phone,
        };

        const res = await axios.post(url, newContact);

        dispatch({ type: 'ADD_CONTACT', payload: res.data });

        // Clear State
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {},
        });

        this.props.history.push('/');
    };

    render() {
        const { name, phone, email, errors } = this.state;

        return (
            <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
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
    }
}

AddContact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};
