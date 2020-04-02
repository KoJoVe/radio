import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from '../player/player';
import Calendar from '../calendar/calendar';
import logo from '../../assets/logo.png';
import beetle from '../../assets/beetle.png';
import './app.css';

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
                    setOnline('offline');
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
            return (<span className="dark">Offline</span>);
        } else {
            return (<span className="dark">Loading...</span>);
        }
    }

    const isOnline = () => {
        return online === 'online' || online === 'live';
    }

    const close = () => {
        setOpen(false); 
        setSchedule(false);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="app">
            <div className={`main card ${!open ? "closed" : ""} ${schedule ? "expanded" : ""}`} >
                <h2 className="dark">welcome to <span className="pink">Besouro</span></h2>
                <h5 className="blue">electronic music online radio</h5>
                <div className="images" onClick={close}>
                    <img src={beetle} className={`beetle ${isOnline() ? "animated" : ""}`} />
                    <img src={logo} className={`app-logo ${isOnline() ? "animated" : ""}`} alt="logo" />
                </div>
                <h3 className="dark">current status is: <span className="dark">{ getOnline() }</span></h3>
                {
                   isOnline() ?
                   <div>
                       <h5 className="green">Click on the beetle to close the card</h5>

                       <h5 className="blue breakline"><span className="pink atention">Unmute</span> the player!</h5>

                       <h5 className="blue breakline"><span className="pink atention">Mobile users:</span> select</h5>
                       <h5 className="blue">"Audio Only" on the player settings</h5>
                       <h5 className="blue">to enable background music</h5>
                   </div> :
                   <div>
                       <h5 className="blue">check our schedule below for live dates</h5>
                   </div>
                }
                {
                    open ?
                        (!schedule ?
                        <h4 className="showSchedule dark" onClick={() => setSchedule(!schedule)}><span className="pink">click</span> to see our schedule</h4> :
                        <h4 className="showSchedule dark" onClick={() => setSchedule(!schedule)}>Schedule for <span className="pink">{monthNames[new Date().getMonth()]}</span> {new Date().getFullYear()}</h4>) :
                    <h4 className="showSchedule dark" onClick={() => setOpen(true)}><span className="pink">click</span> to reopen card</h4>
                }
                <div className={`schedule ${schedule ? "expanded" : ""}`}>
                    <Calendar />
                </div>
            </div>
            <div className="player" id="theplayer">
                <Player />
            </div>
        </div>
    );
}

export default App;
