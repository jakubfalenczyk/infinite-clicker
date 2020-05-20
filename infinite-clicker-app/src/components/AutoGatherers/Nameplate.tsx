import React from "react"
import { UpgradesState } from "gameState/upgrades/model"
import "./styles.scss"
import { allUpgrades } from "gameState/upgrades/allUpgrades"
import { useGameState } from "gameState"
import { formatNumber } from "common/formatNumber"

export interface NameplateProps {
  className: string
  upgradeKey: keyof UpgradesState
  additionalContent?: JSX.Element
}

const Nameplate = (props: NameplateProps) => {
  const { upgrades } = useGameState()
  const { className, upgradeKey, additionalContent } = props
  const upgradeProps = allUpgrades[upgradeKey]
  const upgradeState = upgrades[upgradeKey]

  const usedPerSec = upgradeProps.usedPerSec && upgradeState.count * upgradeProps.usedPerSec
  const materialsPerSec = upgradeState.count * upgradeProps.gatheredPerSec

  return (
    upgradeState.count > 0 ?
      <div className={className}>
        <div className="count">{upgradeProps.label}: {formatNumber(upgradeState.count)}</div>
        <div className="gps"> [+{formatNumber(materialsPerSec)} {upgradeProps.gatheredMaterial}/s]</div>
        {usedPerSec && <div className="gps"> [-{formatNumber(usedPerSec)} {upgradeProps.usedMaterial}/s]</div>}
        {additionalContent}
      </div>
    : null
  )
}

export default Nameplate