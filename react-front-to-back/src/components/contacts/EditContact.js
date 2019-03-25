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

const url = 'https://jsonplaceholder.typicode.com/users/';

class EditContact extends Component {
  state = emptyState;

  onChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await axios.get(`${url}${id}`);
    const contact = response.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onSubmit = async (dispatch, event) => {
    event.preventDefault();

    const { name, email, phone } = this.state;
    const { id } = this.props.match.params;

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

    const updatedContact = {
      name,
      email,
      phone
    };

    const response = await axios.put(`${url}/${id}`, updatedContact);
    dispatch({ type: 'UPDATE_CONTACT', payload: response.data });

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
                Update Contact
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
                    value="Update Contact"
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

export default EditContact;
