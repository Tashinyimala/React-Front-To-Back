import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom Components
import Contacts from './components/contacts/Contacts';
import Header from './components/layouts/Header';
import { Provider } from './context';
import AddContact from './components/contacts/AddContact';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Header branding="Contact Manager" />
          <div className="container">
            <AddContact />
            <Contacts />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
