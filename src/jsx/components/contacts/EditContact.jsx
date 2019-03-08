import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';

export default class EditContact extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        errors: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const { url } = this.props;
        const res = await axios.get(`${url}${id}`);
        this.setState({ ...res.data });
    }

    onInputChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = async e => {
        const { dispatch, url } = this.props;
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

        const updateContact = {
            name,
            email,
            phone,
        };

        const { id } = this.props.match.params;
        const res = await axios.put(`${url}${id}`, updateContact);

        dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

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
        const loading = 'Loading...';

        return (
            <div className="card mb-3">
                <div className="card-header">Edit Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <TextInputGroup
                            label="Name"
                            name="name"
                            placeholder={loading}
                            value={name}
                            onChange={this.onInputChange}
                            error={errors.name}
                        />
                        <TextInputGroup
                            label="Phone"
                            name="phone"
                            placeholder={loading}
                            value={phone}
                            onChange={this.onInputChange}
                            error={errors.phone}
                        />
                        <TextInputGroup
                            type="email"
                            label="Email"
                            name="email"
                            placeholder={loading}
                            value={email}
                            onChange={this.onInputChange}
                            error={errors.email}
                        />
                        <input
                            type="submit"
                            value="Update"
                            className="btn btn-light btn-block"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

EditContact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};
