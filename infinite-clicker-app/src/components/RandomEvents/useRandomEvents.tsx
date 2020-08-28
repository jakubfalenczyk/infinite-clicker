import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { RandomEventsState, defaultRandomEventsState } from "gameState/randomEvents/model"
import { getRandomItem } from "common/random"
import { allRandomEvents } from "./allRandomEvents"
import { getRandomPositions } from "./randomPositions"
import useMusic from "gameState/music/useMusic"
import { useSoundSettings } from "common/useSoundSettings"
import { Goods, allMarketGoods } from "components/UserInterface/components/Market/allMarketGoods"
import { calculateGatheredMaterials } from "components/UserInterface/components/Upgrades/calculateGatheredMaterials"
import { PlayerState } from "gameState/player/model"
import { UpgradesState } from "gameState/upgrades/model"
import { AchievementsState } from "gameState/achievements/model"

const useRandomEvents = (tick: React.MutableRefObject<() => void>) => {
  const { randomEvents, player, upgrades, achievements } = useGameState()
  const soundSettings = useSoundSettings()
  const { changeMusic } = useMusic()

  useEffect(() => {
    const wildfire = randomEvents.wildfire.count 
      && allRandomEvents[randomEvents.wildfire.key]
    const termites = randomEvents.termites.count 
      && allRandomEvents[randomEvents.termites.key]

    const currentEvent = wildfire || termites
    
    if (currentEvent) {
      changeMusic(currentEvent.music, soundSettings.soundsOn)
    }
  }, [randomEvents, changeMusic, soundSettings.soundsOn])

  const getMaterialsPerSec = (goods: Goods, stateAfterGathering: PlayerState, playerState: PlayerState) => {
    const materialsPerSec = stateAfterGathering[goods.material] - playerState[goods.material] || 0
    return materialsPerSec
  }

  const getRandomMultiplier = () => {
    const multiplier = Math.floor(Math.random() * 17 + 3)
    return multiplier
  }
  
  const update = useRef((randomEventsState: RandomEventsState, playerState: PlayerState, upgradesState: UpgradesState, achievementsState: AchievementsState, soundsOn: boolean) => {
    const isEventHappening = 
      randomEventsState.wildfire.count > 0 
      || randomEventsState.termites.count > 0
    
    if (isEventHappening) {
      return
    }
  
    const event = getRandomItem([allRandomEvents.wildfire, allRandomEvents.termites])
    const count = Math.floor(Math.random() * 3) + 3
    const positions = getRandomPositions(count)

    const stateAfterGathering = calculateGatheredMaterials(upgradesState, playerState, achievementsState)
    const materialsPerSec = getMaterialsPerSec(allMarketGoods[event.materialOnClick], stateAfterGathering, playerState)
    const materialsPerClick =  Array.from({ length: count }, () => getRandomMultiplier() * (materialsPerSec || 1))

    randomEvents.updateState({
      ...randomEventsState,
      [event.key]: { count, key: event.key, positions, materialsPerClick }
    })

    setTimeout(() => {
      randomEvents.updateState(defaultRandomEventsState)
      changeMusic("bg", soundsOn)
    }, 30 * 1000)
  })

  useEffect(() => {
    tick.current = () => {
      update.current(randomEvents, player, upgrades, achievements, soundSettings.soundsOn)
    }
  }, [tick, randomEvents, player, upgrades, achievements, soundSettings.soundsOn])
}

export default useRandomEvents