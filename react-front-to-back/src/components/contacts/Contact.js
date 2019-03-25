import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Consumer } from '../../context';

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  // onDeleteClick = (id, dispatch) => {
  //   const url = `https://jsonplaceholder.typicode.com/posts/${id} `;
  //   axios
  //     .delete(url)
  //     .then(response => dispatch({ type: 'DELETE_CONTACT', payload: id }));
  // };

  // Using AsyncAwait
  onDeleteClick = async (id, dispatch) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts/${id} `;
      await axios.delete(url);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  listData(email, phone) {
    return (
      <ul className="list-group">
        <li className="list-group-item">Email: {email} </li>
        <li className="list-group-item">Phone: {phone} </li>
      </ul>
    );
  }

  render() {
    const { id, name, email, phone } = this.props.contact;
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
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? this.listData(email, phone) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
