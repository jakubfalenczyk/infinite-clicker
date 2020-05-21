import React, { useState } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "../Tree"
import HealthBar from "../HealthBar"
import { backgroundMusic } from "sounds"
import useMusic from "common/useMusic"
import Helper from "components/AutoGatherers/Helper"
import { PlayerVisualState } from "./playerVisualState"
import Buldozer from "components/AutoGatherers/Buldozer"
import Burner from "components/AutoGatherers/Burner"
import LumberCamp from "components/AutoGatherers/LumberCamp"
import PaperFactory from "components/AutoGatherers/PaperFactory"
import FurnitureFactory from "components/AutoGatherers/FurnitureFactory"
import RandomEventSpawner from "components/RandomEvents/RandomEventSpawner"

const GameCanvas = ()  => {
  const [ playerVisualState, setPlayerVisualState ] = useState<PlayerVisualState>({ isCutting: false })
  useMusic(backgroundMusic[0])

  return (
    <div className="game-canvas">
      <div className="clickingArea">
        <Tree setPlayerVisualState={setPlayerVisualState}/>
        <HealthBar/>
        <Player 
          isCutting={playerVisualState.isCutting}
          onAnimationEnd={() => setPlayerVisualState({ isCutting: false })}
        />
        <Helper/>
        <Buldozer/>
        <Burner/>
        <LumberCamp/>
        <PaperFactory/>
        <FurnitureFactory/>
        <RandomEventSpawner/>
      </div>
    </div>
  )
} 

export default GameCanvas