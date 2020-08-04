import React, { useEffect } from "react"
import PlayerStats from "./components/PlayerStats"
import Settings from "./components/Settings"
import Market from "./components/Market"
import Upgrades from "./components/Upgrades"
import "./styles.scss"
import useAutoGatherers from "components/AutoGatherers/useAutoGatherers"
import Tools from "./components/Tools"
import useRandomEvents from "components/RandomEvents/useRandomEvents"
import Alerts from "./components/Alerts"
import Achievements from "./components/Achievements"
import AchievementUnlocked from "./components/AchievementUnlocked"
import { useGameState } from "gameState"
import { allAchievements } from "./components/Achievements/allAchievements"
import { noop } from "lodash"
import useSound from "common/useSound"
import Advance from "./components/Advance"
import { useMediaQuery } from "beautiful-react-hooks"
import MobileMenu from "./components/MobileMenu"
import MobileUpgrades from "./components/MobileUpgrades"

interface UserInterfaceProps {
  autoGathererTick: React.MutableRefObject<() => void>
  randomEventsTick: React.MutableRefObject<() => void>
  achievementsUnlockTick: React.MutableRefObject<() => void>
}

const UserInterface = (props: UserInterfaceProps) => {
  useAutoGatherers(props.autoGathererTick)
  useRandomEvents(props.randomEventsTick)
  const achievementSound = useSound("sounds-achievement")
  
  const gameState = useGameState()
  const { achievements } = gameState
  
  useEffect(() => {
    const unlocked = allAchievements.find(x => 
      !achievements.unlocked.some(y => y.id === x.id) 
      && x.isUnlocked(gameState)
    )
    
    if (unlocked) {
      props.achievementsUnlockTick.current = () => {
        achievements.updateState({
          unlocked: [...achievements.unlocked, unlocked]
        }) 
        achievementSound.play()
      }
    } else {
      props.achievementsUnlockTick.current = noop
    }
  }, [achievements, gameState, props.achievementsUnlockTick, achievementSound])

  const isLargeScreen = useMediaQuery("(min-width: 768px)")

  const allMenuItems = (
    <>
      {isLargeScreen && <Settings/>}
      <Market/>
      <Upgrades/>
      {!isLargeScreen && <MobileUpgrades/>}
      <Tools/>
      <Achievements/>
      <Advance/>
    </>
  )

  return (
    <div className="userInterface">
      <PlayerStats/>
      <Alerts/>
      <AchievementUnlocked/>
      <div className="menu">
        {isLargeScreen 
          ? allMenuItems
          : <>
              <Settings/>
              <MobileMenu allMenuItems={allMenuItems} />
            </>
        }
      </div>
    </div>
  )
}

export default UserInterface