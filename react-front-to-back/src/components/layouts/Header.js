import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  const { branding } = props;

  return (
    <nav className="navbar navbar-expand-sm nav-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand" style={{ color: 'white' }}>
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: 'white' }}>
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact/add"
                className="nav-link"
                style={{ color: 'white' }}
              >
                <i className="fas fa-plus" /> Add Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link" style={{ color: 'white' }}>
                <i className="fas fa-question" /> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: 'My App'
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
