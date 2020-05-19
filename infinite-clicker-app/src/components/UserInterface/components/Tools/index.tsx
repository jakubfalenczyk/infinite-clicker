import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import { allAxes, AxeTypes } from "./allAxes"
import ToolsItem from "./components/ToolsItem"

const Tools = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player } = useGameState()

  const buy = (key: keyof AxeTypes) => {
    if (allAxes[key].price > player.gold) {
      return
    }

    player.updateState({
      ...player,
      axe: allAxes[key],
      gold: player.gold - allAxes[key].price,
    })
  }

  return (
    <>
      <div className="uiButton" onClick={onOpen}>
        Tools Shop
        <div className="buttonIcon">
          <i className="fas fa-toolbox"></i>
        </div>
      </div>
      <GameModal
        className="toolsModal"
        title="Tools Shop"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="header">
          <div className="toolsCell">
              Tool
          </div>
          <div className="priceCell">
              Price
          </div>
          <div className="actionsCell">
              Buy
          </div>
        </div>
        {Object.values(allAxes).map(x => 
          <ToolsItem
            key={x.key}
            item={x}
            buy={key => buy(key)}
          />
        )}
      </GameModal>
    </>
  )
}

export default Tools