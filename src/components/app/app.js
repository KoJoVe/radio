import React, { useState } from 'react';
import Player from '../player/player';
import logo from '../../assets/logo.png';
import volumeup from '../../assets/volumeup.svg';
import volumeoff from '../../assets/volumeoff.svg';
import './app.css';

const App = () => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handleChange = (event) => {
        setVolume(event.target.value);
    }

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
                <div className={`volume ${playing ? "expanded" : ""}`}>
                    <img src={volumeoff} /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleChange}></input><img src={volumeup} />
                </div>
            </div>
            <div className="player">
                <Player playing={playing} volume={volume}/>
            </div>
            <div className="schedule">
                <h3 className="green">our timetable:</h3>
                <ul>
                    <li>João Vicente - Every <b>1st</b> and <b>3rd</b> <b>Tuesday</b> of the month, <b>21:00</b> (BRT)</li>
                    <li>Tadeu Estanislau - Every <b>1st</b> and <b>3rd</b> <b>Thursday</b> of the month, <b>21:00</b> (BRT)</li>
                    <li>Samuel Bastos - Every <b>2nd</b> and <b>4th</b> <b>Tuesday</b> of the month, <b>21:00</b> (BRT)</li>
                    <li>Lucas Rapini - Every <b>2nd</b> and <b>4th</b> <b>Thursday</b> of the month, <b>21:00</b> (BRT)</li>
                </ul>
            </div>
        </div>
    );
}

export default App;
