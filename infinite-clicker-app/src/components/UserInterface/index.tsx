import React from "react"
import PlayerStats from "./components/PlayerStats"
import Settings from "./components/Settings"
import Market from "./components/Market"
import "./styles.scss"

const UserInterface = () => {
  return (
    <div className="userInterface">
      <PlayerStats/>
      <div>
        <Settings/>
        <Market/>
      </div>
    </div>
  )
}

export default UserInterface