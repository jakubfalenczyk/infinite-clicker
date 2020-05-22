import React from "react"
import PlayerStats from "./components/PlayerStats"
import Settings from "./components/Settings"
import Market from "./components/Market"
import Upgrades from "./components/Upgrades"
import "./styles.scss"
import useAutoGatherers from "components/AutoGatherers/useAutoGatherers"
import Tools from "./components/Tools"
import useRandomEvents from "components/RandomEvents/useRandomEvents"
import Alerts from "./components/Alerts"

interface UserInterfaceProps {
  autoGathererTick: React.MutableRefObject<() => void>
  randomEventsTick: React.MutableRefObject<() => void>
}

const UserInterface = (props: UserInterfaceProps) => {
  useAutoGatherers(props.autoGathererTick)
  useRandomEvents(props.randomEventsTick)

  return (
    <div className="userInterface">
      <PlayerStats/>
      <Alerts/>
      <div className="menu">
        <Settings/>
        <Market/>
        <Upgrades/>
        <Tools/>
      </div>
    </div>
  )
}

export default UserInterface