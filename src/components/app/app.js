import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from '../player/player';
import Calendar from '../calendar/calendar';
import logo from '../../assets/logo.png';
import './app.css';

const App = () => {
    const [online, setOnline] = useState(null);
    const [open, setOpen] = useState(true);
    const [schedule, setSchedule] = useState(false);

    useEffect(() => {
        axios.get('https://mixer.com/api/v1/channels/besouroradio', {})
            .then((response) => {
                setOnline(response.data && response.data.online);
            })
            .catch(() => {
                setOnline(false);
            });
    }, []);

    const getOnline = () => {
        if (online === true) {
            return (<span className="green">online</span>); 
        } else if (online === false) {
            return (<span className="dark">offline</span>);
        } else {
            return (<span className="dark">loading...</span>);
        }
    }

    const close = () => {
        setOpen(false); 
        setSchedule(false);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="app">
            <div className={`main ${!open ? "closed" : ""}`} >
                <img src={logo} className={`app-logo ${online ? "animated" : ""}`} alt="logo" />
                <h2 className="dark">welcome to <span className="pink">Besouro</span></h2>
                <h5 className="blue">electronic music online radio</h5>
                <div style={{ animation: online ? `beetle-dance infinite ${1000}ms linear` : ''}} className={`beetle ${online ? "animated" : ""}`} onClick={close}></div>
                <h3 className="dark">current status is: <span className="dark">{ getOnline() }</span></h3>
                {
                   online ?
                    <h5 className="blue">click on the beetle to close the card</h5> :
                    <h5 className="blue">check our schedule below for live dates</h5>
                }
                {
                    open ?
                        (!schedule ?
                        <h4 className="showSchedule dark" onClick={() => setSchedule(!schedule)}><span className="pink">click</span> to see our schedule</h4> :
                        <h4 className="showSchedule dark" onClick={() => setSchedule(!schedule)}>Schedule for <span className="pink">{monthNames[new Date().getMonth()]}</span> {new Date().getFullYear()}</h4>) :
                    <h4 className="showSchedule dark" onClick={() => setOpen(true)}><span className="pink">click</span> to reopen card</h4>
                }
                <div className={`schedule ${schedule ? "expanded" : ""}`}>
                    {/* <span><a href="https://soundcloud.com/lucas-rapini">João Vicente</a><b>1st</b> & <b>3rd</b> <b>Tuesday</b><b> 21:00</b> (BRT)</span>
                    <span><a href="https://soundcloud.com/lucas-rapini">Tadeu Estanislau</a><b>1st</b> & <b>3rd</b> <b>Thursday</b><b> 21:00</b> (BRT)</span>
                    <span><a href="https://soundcloud.com/lucas-rapini">Samuel Bastos</a><b>2nd</b> & <b>4th</b> <b>Tuesday</b><b> 21:00</b> (BRT)</span>
                    <span><a href="https://soundcloud.com/lucas-rapini">Lucas Rapini</a><b>2nd</b> & <b>4th</b> <b>Thursday</b><b> 21:00</b> (BRT)</span> */}
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
