import React, { useContext, useEffect, useState, useRef } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import Pause from './Pause';
import SettingsButton from './SettingsButton';
import settingContext from './SettingsContext';
const Timer = () => {
  const settingInfo = useContext(settingContext);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work")

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode)

  function initTimer() {
    setSecondsLeft(settingInfo.workMinutes * 60);

  }
  function switchMode() {
    const nextMode = (modeRef.current === "work" ? "break" : "work");
    const nextSeconds = (nextMode === "work" ? settingInfo.workMinutes * 60 : settingInfo.breakMinutes * 60)
   
    setMode(nextMode)
    modeRef.current=nextMode;
    
    setSecondsLeft(nextSeconds)
    secondsLeftRef.current = nextSeconds;
  }
  function tick() {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current)
  }
  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current)
        return;
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000)
    return ()=>clearInterval(interval);
  }, [settingInfo])

  const totalSeconds=mode==="work"?settingInfo.workMinutes * 60:settingInfo.breakMinutes*60;
  const percentage=Math.round(secondsLeft/totalSeconds*100);

  const minutes=Math.floor(secondsLeft/60)
  let seconds=secondsLeft%60;
  if(seconds<10)seconds="0"+seconds;
  return (
    <>
      <div>
<CircularProgressbar
  value={percentage}
  text={`${minutes}:${seconds}`}
  styles={buildStyles({
    rotation: 0.25,
    strokeLinecap: 'butt',
    pathColor: (mode==="work")?"#FFAE03":"#F42C04",
    textColor: '#C6E0FF',
    trailColor: '#BFD1E5',
    backgroundColor: '#3e98c7',
  })} /></div>
      <div className="buttons">

        {isPaused ? <PlayButton title="play" onClick={()=>{setIsPaused(false); isPausedRef.current=false}}/> : <Pause title="pause" onClick={()=>{setIsPaused(true); isPausedRef.current=true}}/>}

      </div>
      <div className="settings">
        <SettingsButton onClick={() => settingInfo.setShowSettings(true)} />
      </div>
    </>
  )
}

export default Timer