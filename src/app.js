import React from 'react';
import logo from './logo.png';
import './app.css';

const App = () => {
  return (
    <div className="app">
      <div className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h2>welcome to <span className="red">Besouro</span> radio</h2>
      </div>
    </div>
  );
}

export default App;
