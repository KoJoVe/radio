import React, { useState, useEffect } from 'react';
import Player from '../player/player';
import logo from '../../assets/logo.png';
import volumeup from '../../assets/volumeup.svg';
import volumeoff from '../../assets/volumeoff.svg';
import './app.css';

const App = () => {
    const [online, setOnline] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handleChange = (event) => {
        setVolume(event.target.value);
    }

    const play = () => {
        if (online) {
            setPlaying(!playing);
        } else {
            setPlaying(false);
        }
    }

    const getOnline = () => {
        if (online === true) {
            return (<span className="green">online</span>); 
        } else if (online === false) {
            return (<span className="dark">offline</span>);
        } else {
            return (<span className="dark">loading...</span>);
        }
    }

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data === 'twitchoffline') {
                setOnline(false);
                setPlaying(false);
            } else if (event.data === 'twitchonline') {
                setOnline(true);
            }
        }, false);
    }, []);

    return (
        <div className="app">
            <div className="main">
                <img src={logo} className={`app-logo ${playing ? "animated" : ""}`} alt="logo" />
                <h2 className="dark">welcome to <span className="pink">Besouro</span></h2>
                <h5 className="blue">electronic music online radio</h5>
                <div style={{ animation: playing ? `beetle-dance infinite ${1000}ms linear` : ''}} className={`beetle ${playing ? "animated" : ""}`} onClick={play}>
                    <div className="playButton"></div>
                </div>
                <h3 className="dark">current status is: <span className="dark">{ getOnline() }</span></h3>
                {
                    online ?
                    <h5 className="blue">click on the beetle to play/pause</h5> :
                    <h5 className="blue">check our schedule below for live dates</h5>
                }
                <div className={`volume ${playing ? "expanded" : ""}`}>
                    <img src={volumeoff} /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleChange}></input><img src={volumeup} />
                </div>
                {
                    playing ? null :
                    <h4 className="showSchedule dark" onClick={() => setSchedule(!schedule)}><span className="pink">click</span> to see our schedule</h4>
                }
                <div className={`schedule ${schedule && !playing ? "expanded" : ""}`}>
                    <span><a href="https://soundcloud.com/lucas-rapini">João Vicente</a><b>1st</b> & <b>3rd</b> <b>Tuesday</b><b> 21:00</b> (BRT)</span>
                    <span><a href="https://soundcloud.com/lucas-rapini">Tadeu Estanislau</a><b>1st</b> & <b>3rd</b> <b>Thursday</b><b> 21:00</b> (BRT)</span>
                    <span><a href="https://soundcloud.com/lucas-rapini">Samuel Bastos</a><b>2nd</b> & <b>4th</b> <b>Tuesday</b><b> 21:00</b> (BRT)</span>
                    <span><a href="https://soundcloud.com/lucas-rapini">Lucas Rapini</a><b>2nd</b> & <b>4th</b> <b>Thursday</b><b> 21:00</b> (BRT)</span>
                </div>
            </div>
            <div className="player" id="theplayer">
                <Player playing={playing} volume={volume}/>
            </div>
        </div>
    );
}

export default App;
