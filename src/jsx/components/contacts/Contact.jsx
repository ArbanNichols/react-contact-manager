import React, { Component } from 'react';
import { Consumer } from '../../context';

export default class Contact extends Component {
    constructor() {
        super();
        this.state = { showContactInfo: false };
    }

    render() {
        const { id, name, phone, email } = this.props.contact;
        const { showContactInfo } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {name}{' '}
                                <i
                                    className="fas fa-sort-down"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        this.setState({
                                            showContactInfo: !this.state
                                                .showContactInfo,
                                        });
                                    }}
                                />
                                <i
                                    className="fas fa-times"
                                    style={{
                                        cursor: 'pointer',
                                        float: 'right',
                                        color: 'red',
                                    }}
                                    onClick={() => {
                                        dispatch({
                                            type: 'DELETE_CONTACT',
                                            payload: id,
                                        });
                                    }}
                                />
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Phone: {phone}
                                    </li>
                                    <li className="list-group-item">
                                        Email: {email}
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};
