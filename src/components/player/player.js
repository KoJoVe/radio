import React, { useState, useEffect } from 'react';
import './player.css';

const Player = (props) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const options = {
            width: 400,
            height: 300,
            channel: "kojovee",
        };
        const newPlayer = new window.Twitch.Player("player", options);
        newPlayer.setVolume(0.5);
        setPlayer(newPlayer);
    }, []);
      
    return (
        <div id="player"></div>
    );
}

export default Player;
