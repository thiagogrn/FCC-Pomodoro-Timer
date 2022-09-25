import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [type, setType] = useState("SESSION");
  const [play, setPlay] = useState(false);

  const timeout = setTimeout(() => {
    if(timeLeft >= 0 && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const breakIncrement = () => {
    if(breakTime < 60) {
      setBreakTime(breakTime + 1);
    }
  };

  const breakDecrement = () => {
    if(breakTime > 1){
      setBreakTime(breakTime - 1);
    }
  };

  const sessionIncrement = () => {
    if(sessionTime < 60) {
      setSessionTime(sessionTime + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const sessionDecrement = () => {
    if(sessionTime > 1) {
      setSessionTime(sessionTime - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakTime(5);
    setSessionTime(25);
    setType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(timeLeft === -1 && type === "SESSION") {
      setTimeLeft(breakTime * 60);
      setType("BREAK");
      audio.play()
    }
    if(timeLeft === -1 && type === "BREAK") {
      setTimeLeft(sessionTime * 60);
      setType("SESSION");
      audio.pause()
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if(play) {
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes  * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return (
      `${formattedMinutes}:${formattedSeconds}`
    );
  };

  const title = type === "SESSION" ? "Session" : "Break";

  return (
  <div className="center-align">
    <h1>25 + 5 Clock</h1>
    <div>
      <div className="label">
        <h3 id="break-label">Break Length</h3>
        <div className="time-sets">
            <button id="break-decrement" disabled={play} className="btn-small orange darken-4" onClick={breakDecrement}>
                  <i className="material-icons">arrow_downward</i>   
            </button>
            <h3 id="break-length">{breakTime}</h3>
            <button id="break-increment" disabled={play} className="btn-small orange darken-4" onClick={breakIncrement}>
                <i className="material-icons">arrow_upward</i>   
            </button>
        </div>
      </div>
      <div className="label">
        <h3 id="session-label">Session Length</h3>
        <div className="time-sets">
            <button id="session-decrement" disabled={play} className="btn-small orange darken-4" onClick={sessionDecrement}>
                  <i className="material-icons">arrow_downward</i>   
            </button>
            <h3 id="session-length">{sessionTime}</h3>
            <button id="session-increment" disabled={play} className="btn-small orange darken-4" onClick={sessionIncrement}>
                <i className="material-icons">arrow_upward</i>   
            </button>
        </div>
      </div>
    </div>
    <h3 id="timer-label">{title}</h3>
    <h1 id="time-left">{formatTime()}</h1>
    <button id="start_stop" className="btn-large orange darken-4" onClick={handlePlay}>
      {play ? (
        <i className="material-icons">pause_circle_filled</i>
      ) : (
        <i className="material-icons">play_circle_filled</i>
      )}
    </button>
    <button id="reset" className="btn-large orange darken-4" onClick={handleReset}>
      <i className="material-icons">autorenew</i>
    </button>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
  </div>
  )
}

export default App;