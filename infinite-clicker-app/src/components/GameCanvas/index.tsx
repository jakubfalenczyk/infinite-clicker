import React, { useState } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "../Tree"
import HealthBar from "../HealthBar"
import { backgroundMusic } from "sounds"
import useMusic from "common/useMusic"
import Helper from "components/AutoGatherers/Helper"
import { PlayerVisualState } from "./playerVisualState"

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
      </div>
    </div>
  )
} 

export default GameCanvas