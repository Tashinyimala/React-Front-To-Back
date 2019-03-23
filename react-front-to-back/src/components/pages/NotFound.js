import React from 'react';

export default function NotFound() {
  return (
    <div>
      <h1 className="display-4">
        <span className="text-danger">404 </span>Page Not Found
      </h1>
      <p className="lead" align="center">
        <span role="img" aria-label="Crying">
          😂
        </span>{' '}
        Sorry, that page does not exist{' '}
        <span role="img" aria-label="Crying">
          😂
        </span>
      </p>
    </div>
  );
}
