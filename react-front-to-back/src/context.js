import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'Tashi Nyima',
        email: 'xxx@gmail.com',
        phone: '0777777777'
      },
      {
        id: 2,
        name: 'YYY Nyima',
        email: 'YYY@gmail.com',
        phone: '0777777771'
      },
      {
        id: 3,
        name: 'ZZZ Nyima',
        email: 'ZZZ@gmail.com',
        phone: '0777777772'
      }
    ],

    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
