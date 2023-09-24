import React, { useContext } from 'react'
import ReactSlider from 'react-slider';
import "./slider.css";
import settingContext from './SettingsContext';
import BackButton from './BackButton';


const SettingsPage = () => {
  const settingInfo = useContext(settingContext);

  return (
    <div className="setting-page">
        <label>work minutes: {settingInfo.workMinutes}</label>
        <ReactSlider className={'slider'} thumbClassName={"thumb"} trackClassName={'track'} value={settingInfo.workMinutes} min={1} max={120} onChange={(value)=>settingInfo.setWorkMinutes(value)}/>

        <label>break minutes: {settingInfo.breakMinutes}</label>
        <ReactSlider className={'slider green'} thumbClassName={"thumb"} trackClassName={'track'} value={settingInfo.breakMinutes} min={1} max={120} onChange={(value)=>settingInfo.setBreakMinutes(value)}/>
        <BackButton onClick={()=>settingInfo.setShowSettings(false)}/>
    </div>
  )
}

export default SettingsPage;