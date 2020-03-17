import React, { useState } from 'react';
import Player from '../player/player';
import logo from '../../assets/logo.png';
import './app.css';

const App = () => {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="app">
            <div className="main">
                <img src={logo} className={`app-logo ${playing ? "animated" : ""}`} alt="logo" />
                <h2 className="dark">welcome to <span className="pink">Besouro</span> radio</h2>
                <h5 className="blue">make sure to check out our timetable so you can know when livestreams will happen ;)</h5>
                <div style={{ animation: playing ? `beetle-dance infinite ${1000}ms linear` : ''}} className={`beetle ${playing ? "animated" : ""}`} onClick={() => setPlaying(!playing)}>
                    <div className="playButton"></div>
                </div>
                <h3 className="dark">current status is: <span className="dark">offline</span></h3>
                <h5 className="blue">click on the beetle to play/pause</h5>
            </div>
            <Player playing={playing} />
            <div className="schedule">
                <h3 className="green">our timetable:</h3>
                <ul>
                    <li>João Vicente - Every <b>month</b> on the <b>1st</b> and <b>15th</b> <b>21:00</b> (BRT)</li>
                    <li>Samuel Bastos - Every <b>month</b> on the <b>1st</b> and <b>15th</b> <b>21:00</b> (BRT)</li>
                    <li>Tadeu Estanislau - Every <b>month</b> on the <b>1st</b> and <b>15th</b> <b>21:00</b> (BRT)</li>
                    <li>Lucas Rapini - Every <b>month</b> on the <b>1st</b> and <b>15th</b> <b>21:00</b> (BRT)</li>
                </ul>
            </div>
        </div>
    );
}

export default App;
