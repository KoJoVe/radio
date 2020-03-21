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

        const iframe = document.getElementsByTagName("iframe")[0].contentWindow;

        iframe.navigator.mediaSession.metadata = new window.MediaMetadata({
            title: 'Besouro Live',
            artwork: [
                { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
                { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
                { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
                { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
                { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
                { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
            ]
        });

        iframe.navigator.mediaSession.setActionHandler('play', () => {
            newPlayer.play();
        });

        iframe.navigator.mediaSession.setActionHandler('pause', () => {
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
