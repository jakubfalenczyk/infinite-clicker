import React from "react"
import SettingsModal from "./components/SettingsModal"
import "./styles.scss"

const Settings = () => {
  return (
    <SettingsModal>
      <div>
        Settings
      </div>
      <div className="settingsIcon">
        <i className="fas fa-cog"></i>
      </div>
    </SettingsModal>
  )
}

export default Settings