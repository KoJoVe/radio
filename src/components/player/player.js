import React, { useState, useEffect } from 'react';
import './player.css';

const Player = (props) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const options = {
            width: '100%',
            height: '100%',
            autoplay: true,
            channel: "kojovee",
        };
        const newPlayer = new window.Twitch.Player("player", options);
        newPlayer.setVolume(0.5);
        setPlayer(newPlayer);
    }, []);

    useEffect(() => {
        if (!player) {
            return;
        }
        player.setVolume(props.volume);
    }, [props.volume]);

    useEffect(() => {
        if (!player) {
            return;
        }
        if (props.playing) {
            player.play();
        } else {
            player.pause();
        }
    }, [props.playing]);
      
    return (
        <div id="player"></div>
    );
}

export default Player;
