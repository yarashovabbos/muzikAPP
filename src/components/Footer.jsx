import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css'; 

const Footer = () => {
  const audioRef = useRef(null);
  const [playState, setPlayState] = useState('play');
  const [muteState, setMuteState] = useState('unmute');
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateDuration = () => setDuration(audio.duration);
      const updateTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('timeupdate', updateTime);

      return () => {
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('timeupdate', updateTime);
      };
    }
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (playState === 'play') {
        audio.play();
        setPlayState('pause');
      } else {
        audio.pause();
        setPlayState('play');
      }
    }
  };

  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    setVolume(volume / 100);
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const handleMute = () => {
    setMuteState(muteState === 'unmute' ? 'mute' : 'unmute');
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div id="audio-player-container">
      <audio ref={audioRef} src="https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3" preload="metadata" loop></audio>
    
      <button className='play' id="play-icon" onClick={handlePlayPause}>
        {playState === 'play' ? 'Play' : 'Pause'}
      </button>
      <span id="current-time" className="time">{formatTime(currentTime)}</span>
      <input type="range" id="seek-slider" max={duration} value={currentTime} onChange={(e) => audioRef.current.currentTime = e.target.value} />
      <span id="duration" className="time">{formatTime(duration)}</span>
      <output id="volume-output">{Math.round(volume * 100)}</output>
      <input type="range" id="volume-slider" max="100" value={volume * 100} onChange={handleVolumeChange} />
      <button className='play' id="mute-icon" onClick={handleMute}>
        {muteState === 'unmute' ? 'Mute' : 'Unmute'}
      </button>
    </div>
  );
};

export default Footer;

