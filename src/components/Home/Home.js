import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../utils';
const axios = require('axios');
require('./Home.scss');

const Home = props => {
  // TODO: debouncer works correctly, but the home component still gets rendered too often.
  const [volume, setVolume] = useState('');
  const [showTodaysMusicPlayer, setShowTodaysMusicPlayer] = useState(false);
  const [todaysMusicTitle, setTodaysMusicTitle] = useState('');
  const todaysMusicVideoId = '7ZguAEoNpZw';

  useEffect(() => {
    const options = {
      url: 'https://www.googleapis.com/youtube/v3/videos',
      method: 'GET',
      params: {
        part: 'snippet',
        id: todaysMusicVideoId,
        fields: 'items(id, snippet)',
        key: 'AIzaSyANZD6saMZJLjPZbXDGTKd72v-knNRElL8',
      },
    };

    axios(options).then(response => {
      setTodaysMusicTitle(response.data.items[0].snippet.title);
    });
  }, []);

  const debouncedVolume = useDebounce(volume, 300);

  useEffect(() => {
    if (debouncedVolume) {
      props.changeVolume(debouncedVolume);
    }
  }, [debouncedVolume]);

  const playOrPauseAudio = () => {
    if (props.isPlayingSound) {
      props.pauseSound();
    } else {
      props.playSound();
    }
  };

  return (
    <div id='home-main-container'>
      <div id='center-block'>
        <div id='default-audioplayer-skin'>
          <button
            id='play-button'
            className={props.isPlayingSound ? 'main-pause' : 'main-play'}
            onClick={() => playOrPauseAudio()}
          ></button>
          <input
            id='range-volume'
            type='range'
            onInput={event => setVolume(event.target.value)}
            onChange={event => setVolume(event.target.value)}
            min='0'
            max='1'
            step='0.01'
            defaultValue='1'
          />
        </div>

        {!showTodaysMusicPlayer && (
          <div className='home-content-container'>
            <h1>Chillax</h1>
            <p>HELPS YOU FOCUS, RELAX, AND SLEEP </p>
          </div>
        )}
        <h3 className='todays-music'>
          {showTodaysMusicPlayer ? (
            <span>
              <button
                onClick={() => {
                  setShowTodaysMusicPlayer(false);
                }}
                className='back-button-chillax'
              >
                Chillax
              </button>{' '}
              + {todaysMusicTitle}
            </span>
          ) : (
            <span>
              TODAY'S MUSIC:{' '}
              <button
                onClick={() => {
                  setShowTodaysMusicPlayer(true);
                }}
              >
                {todaysMusicTitle.toUpperCase()}
              </button>
            </span>
          )}
        </h3>
        <div className='video-container'>
          <div className='video-wrapper'>
            {showTodaysMusicPlayer && (
              <iframe
                title='todays-music'
                src={`https://www.youtube.com/embed/${todaysMusicVideoId}?autoplay=1`}
                width='560'
                height='349'
                frameBorder='0'
                allow='autoplay'
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
