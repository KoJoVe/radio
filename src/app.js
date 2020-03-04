import React from 'react';
import logo from './logo.png';
import beetle from './beetle.jpg';
import './app.css';

const App = () => {
  return (
    <div className="app">
      <div className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h3>coming soon:</h3>
        <h2>prepare to <span className="red">Besouro</span> radio</h2>
        <img src={beetle} className="beetle" alt="logo" />
        <h5>Techno, House, Breakbeat <br /> Deep, Melodic and +</h5>
      </div>
    </div>
  );
}

export default App;
