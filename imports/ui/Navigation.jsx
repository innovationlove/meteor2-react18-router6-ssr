import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <p>
      <div><Link to="/">Home</Link></div>
      <div><Link to="/links">Links</Link></div>
    </p>
  );
};

export default Navigation;