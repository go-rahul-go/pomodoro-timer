

import SettingsPage from "./SettingsPage";
import "./style.css"
import Timer from "./Timer";
import { useState } from "react";
import settingContext from "./SettingsContext";

function App() {
  const [showSettings,setShowSettings]=useState(false)
  const [workMinutes,setWorkMinutes]=useState(45);
  const [breakMinutes,setBreakMinutes]=useState(15);
  return (
    <>
    <settingContext.Provider value={{workMinutes,breakMinutes,setWorkMinutes,setBreakMinutes,setShowSettings}}>
    {showSettings?<SettingsPage/>:<main><Timer/></main>}
    </settingContext.Provider>
    </>
  )
}

export default App;
