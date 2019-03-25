import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layouts/TextInputGroup';
import axios from 'axios';

const emptyState = {
  name: '',
  email: '',
  phone: '',
  error: {}
};

class AddContact extends Component {
  state = emptyState;

  onChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  onSubmit = async (dispatch, event) => {
    event.preventDefault();

    const { name, email, phone } = this.state;

    // Empty Form Input Validation
    if (name === '') {
      this.setState({ error: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ error: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ error: { phone: 'Phone number is required' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    const url = 'https://jsonplaceholder.typicode.com/users';
    // axios
    //   .post(url, newContact)
    //   .then(response =>
    //     dispatch({ type: 'ADD_CONTACT', payload: response.data })
    //   );

    // Using AsyncAwait
    const response = await axios.post(url, newContact);
    dispatch({ type: 'ADD_CONTACT', payload: response.data });

    // Clear State
    this.setState(emptyState);

    // Redirect to Home page
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header" align="center">
                Add Contact
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Enter Name..."
                    onChange={this.onChange}
                    error={error.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    value={email}
                    placeholder="Enter Email..."
                    type="email"
                    onChange={this.onChange}
                    error={error.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter Phone Number..."
                    onChange={this.onChange}
                    error={error.phone}
                  />
                  <input
                    type="submit"
                    value="Add"
                    className="btn btn-block btn-dark"
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

export default AddContact;
