import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from '../player/player';
import Calendar from '../calendar/calendar';
import logo from '../../assets/logo.png';
import beetle from '../../assets/beetle.png';
import './app.css';
import {
    faMixer,
    faTwitch,
    faYoutube,
    faFacebook,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
    faMixer,
    faTwitch,
    faYoutube,
    faFacebook,
    faInstagram
);

const App = () => {
    const [online, setOnline] = useState('');
    const [open, setOpen] = useState(true);
    const [schedule, setSchedule] = useState(false);

    useEffect(() => {
        axios.get('https://mixer.com/api/v1/channels/besouroradio', {})
            .then((response) => {
                const on = response.data && response.data.online;
                const live = response.data && response.data.name && !response.data.name.includes("Recorded");
                if (on && live) {
                    setOnline('live');
                } else if (on && !live) {
                    setOnline('online');
                } else {
                    setOnline('live');
                }
            })
            .catch(() => {
                setOnline(false);
            });
    }, []);

    const getOnline = () => {
        if (online === 'online') {
            return (<span className="blue">Online</span>); 
        } else if (online === 'live') {
            return (<span className="green">Live</span>);
        } else if (online === 'offline') {
            return (<span className="pink">Offline</span>);
        } else {
            return (<span className="dark">Loading...</span>);
        }
    }

    const isOnline = () => {
        return online === 'online' || online === 'live';
    }

    const close = () => {
        if (isOnline()) {
            setOpen(false); 
            setSchedule(false);
        }
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="app">
            <div className={`main card ${!open ? "closed" : ""} ${schedule ? "expanded" : ""}`} >
                <h2 className="dark">welcome to <span className="pink">Besouro</span></h2>
                <h5 className="dark">electronic music online radio</h5>
                <div className={`images ${isOnline() ? "images-click" : ""}`} onClick={close}>
                    <img src={beetle} className={`beetle ${isOnline() ? "animated" : ""}`} />
                    <img src={logo} className={`app-logo ${isOnline() ? "animated" : ""}`} alt="logo" />
                </div>
                <h3 className="dark">current status is: <span className="dark">{ getOnline() }</span></h3>
                {
                   isOnline() ?
                   <div>
                       <h5 className="green">Click on the beetle to close the card</h5>
                    {
                        schedule ? null :
                        <div>
                            <h5 className="blue breakline"><span className="pink atention">Unmute</span> the player to listen!</h5>
                            <h5 className="blue breakline"><span className="pink atention">Mobile users:</span> select "Audio Only"</h5>
                            <h5 className="blue">on the player settings to enable</h5>
                            <h5 className="blue">background music ;)</h5>
                        </div>
                    }
                   </div> :
                   null
                }
                {
                    open ?
                        (!schedule ?
                        <h4 className="showSchedule dark" onClick={() => setSchedule(!schedule)}><u><span className="pink">click here</span> to see our schedule</u></h4> :
                        <h4 className="showSchedule dark" onClick={() => setSchedule(!schedule)}><u>Schedule for <span className="pink">{monthNames[new Date().getMonth()]}</span> {new Date().getFullYear()}</u></h4>) :
                    <h4 className="showSchedule dark" onClick={() => setOpen(true)}><u><span className="pink">click here</span> to reopen card</u></h4>
                }
                <div className={`schedule ${schedule ? "expanded" : ""}`}>
                    <Calendar />
                </div>
                <div className={`${schedule || !open ? "none" : ""}`}>
                    {
                        isOnline() ?
                        <div>
                            <h4 className="stream-title">Stream also available on:</h4>
                            <div className="stream-icon">
                                <a href="https://www.twitch.tv/besouroradio" target="_blank">
                                    <FontAwesomeIcon icon={faTwitch} style={{ color: 'purple' }} size="2x"/>
                                </a>
                                <a href="https://mixer.com/besouroradio" target="_blank">
                                    <FontAwesomeIcon icon={faMixer} style={{ color: 'blue' }} size="2x"/>
                                </a>
                                <a href="https://www.youtube.com/channel/UCTSKcDMO3YOINJC1u-zZwmw" target="_blank">
                                    <FontAwesomeIcon icon={faYoutube} style={{ color: 'red' }} size="2x"/>
                                </a>
                            </div>
                        </div> :
                        <div>
                            <h4 className="stream-title">Find us at:</h4>
                            <div className="social-icon">
                                <a href="https://www.facebook.com/besouro.radio" target="_blank">
                                    <FontAwesomeIcon icon={faFacebook} style={{ color: 'blue' }} size="2x"/>
                                </a>
                                <a href="https://www.instagram.com/besouroradio/" target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} style={{ color: 'red' }} size="2x"/>
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="player" id="theplayer">
                <Player />
            </div>
        </div>
    );
}

export default App;
