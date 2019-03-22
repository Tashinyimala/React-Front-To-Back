import React, { Component } from 'react';
import { Consumer } from '../../context';
import UUID from 'uuid';
import TextInputGroup from '../layouts/TextInputGroup';

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

  onSubmit = (dispatch, event) => {
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
      id: UUID,
      name,
      email,
      phone
    };

    dispatch({ type: 'ADD_CONTACT', payload: newContact });

    // Clear State
    this.setState(emptyState);
  };

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
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
                    value="Add Contact"
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
