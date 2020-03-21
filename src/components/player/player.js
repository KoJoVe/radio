import React, { useState, useEffect } from 'react';
import './player.css';

const Player = (props) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const options = {
            width: '100%',
            height: '100%',
            autoplay: false,
            channel: "kojovee",
        };
        const newPlayer = new window.Twitch.Player("player", options);
        newPlayer.setVolume(0.5);
        newPlayer.pause();
        setPlayer(newPlayer);

        newPlayer.addEventListener(window.Twitch.Player.OFFLINE, () => {
            window.postMessage('twitchoffline', window.location.origin);
        });

        newPlayer.addEventListener(window.Twitch.Player.ONLINE, () => {
            window.postMessage('twitchonline', window.location.origin);
        });

        window.navigator.mediaSession.setActionHandler('play', () => {
            newPlayer.play();
        });

        window.navigator.mediaSession.setActionHandler('pause', () => {
            newPlayer.pause();
        });
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
