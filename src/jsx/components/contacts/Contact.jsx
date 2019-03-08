import React, { Component } from 'react';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';

export default class Contact extends Component {
    constructor() {
        super();
        this.state = { showContactInfo: false };
    }

    render() {
        const { id, name, phone, email } = this.props.contact;
        const { dispatch, url } = this.props;
        const { showContactInfo } = this.state;
        return (
            <div className="card card-body mb-3">
                <h4>
                    {name}{' '}
                    <i
                        className="fas fa-sort-down"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            this.setState({
                                showContactInfo: !this.state.showContactInfo,
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
                        onClick={async () => {
                            await axios.delete(`${url}${id}`);
                            dispatch({
                                type: 'DELETE_CONTACT',
                                payload: id,
                            });
                        }}
                    />
                    <Link to={`/contact/edit/${id}`}>
                        <i
                            className="far fa-edit"
                            style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'gainsboro',
                                marginRight: '5px',
                            }}
                        />
                    </Link>
                </h4>
                {showContactInfo ? (
                    <ul className="list-group">
                        <li className="list-group-item">Phone: {phone}</li>
                        <li className="list-group-item">Email: {email}</li>
                    </ul>
                ) : null}
            </div>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
};
