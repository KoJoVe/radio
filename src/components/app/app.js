import React, { useState } from 'react';
import Player from '../player/player';
import logo from '../../assets/logo.png';
import volumeup from '../../assets/volumeup.svg';
import volumeoff from '../../assets/volumeoff.svg';
import './app.css';

const App = () => {
    const [playing, setPlaying] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handleChange = (event) => {
        setVolume(event.target.value);
    }

    return (
        <div className="app">
            <div className="main">
                <img src={logo} className={`app-logo ${playing ? "animated" : ""}`} alt="logo" />
                <h2 className="dark">Welcome to <span className="pink">Besouro</span> radio</h2>
                <h5 className="blue">Check out our timetable</h5>
                <div style={{ animation: playing ? `beetle-dance infinite ${1000}ms linear` : ''}} className={`beetle ${playing ? "animated" : ""}`} onClick={() => setPlaying(!playing)}>
                    <div className="playButton"></div>
                </div>
                <h5 className="blue">click on the beetle to play/pause</h5>
                <h3 className="dark">current status is: <span className="dark">offline</span></h3>
                <div className={`volume ${playing ? "expanded" : ""}`}>
                    <img src={volumeoff} /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleChange}></input><img src={volumeup} />
                </div>
                {
                    !schedule ? null :
                    <div className="schedule">
                        <a><a href="https://soundcloud.com/lucas-rapini">João Vicente</a><b>1st</b> & <b>3rd</b> <b>Tuesday</b><b> 21:00</b> (BRT)</a>
                        <a><a href="https://soundcloud.com/lucas-rapini">Tadeu Estanislau</a><b>1st</b> & <b>3rd</b> <b>Thursday</b><b> 21:00</b> (BRT)</a>
                        <a><a href="https://soundcloud.com/lucas-rapini">Samuel Bastos</a><b>2nd</b> & <b>4th</b> <b>Tuesday</b><b> 21:00</b> (BRT)</a>
                        <a><a href="https://soundcloud.com/lucas-rapini">Lucas Rapini</a><b>2nd</b> & <b>4th</b> <b>Thursday</b><b> 21:00</b> (BRT)</a>
                    </div>
                }
            </div>
            <div className="player">
                <Player playing={playing} volume={volume}/>
            </div>
        </div>
    );
}

export default App;
