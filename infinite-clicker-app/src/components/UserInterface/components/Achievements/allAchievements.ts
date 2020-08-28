import { Achievement, AchievementCategory } from "gameState/achievements/model";
import { GameStateContextType } from "gameState";
import { formatNumber, formatNumberWithSuffix } from "common/formatNumber";
import { calculateGatheredMaterials } from "../Upgrades/calculateGatheredMaterials";
import { Goods, allMarketGoods } from "../Market/allMarketGoods";
import { allAxes, Axe } from "../Tools/allAxes";

const getMaterialsPerSec = (gameState: GameStateContextType, goods: Goods) => {
  const { player, upgrades, achievements } = gameState
  const stateAfterGathering = calculateGatheredMaterials(upgrades, player, achievements)
  const materialsPerSec = stateAfterGathering[goods.material] - player[goods.material] || 0
  return materialsPerSec
}

const cutDownTreesCategory: AchievementCategory = {
  id: 1,
  label: "Harvested trees"
}

const cutDownTrees: Achievement[] = 
  [10, 100, 1000, 10000, 100000, 1000000]
    .map((value, index) => ({ 
      id: `${cutDownTreesCategory.id}_${index}`,
      category: cutDownTreesCategory,
      valueLabel: formatNumber(value),
      boostedResource: "wood",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const { player } = gameState
        return player.cutDownTrees >= value
      },
    }))

const woodProductionCategory: AchievementCategory = {
  id: 2,
  label: "Wood production"
}

const woodProduction: Achievement[] = 
  [10, 50, 100, 250, 1000, 10000, 50000, 250000]
    .map((value, index) => ({ 
      id: `${woodProductionCategory.id}_${index}`,
      category: woodProductionCategory,
      valueLabel: `${formatNumber(value)}/s`,
      boostedResource: "wood",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const perSec = getMaterialsPerSec(gameState, allMarketGoods.wood)
        return perSec >= value
      },
    }))

const charcoalProductionCategory: AchievementCategory = {
  id: 3,
  label: "Charcoal production"
}

const charcoalProduction: Achievement[] = 
  [20, 80, 340, 680, 1360]
    .map((value, index) => ({ 
      id: `${charcoalProductionCategory.id}_${index}`,
      category: charcoalProductionCategory,
      valueLabel: `${formatNumber(value)}/s`,
      boostedResource: "charcoal",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const perSec = getMaterialsPerSec(gameState, allMarketGoods.charcoal)
        return perSec >= value
      },
    }))

const planksProductionCategory: AchievementCategory = {
  id: 4,
  label: "Planks production"
}

const planksProduction: Achievement[] = 
  [40, 120, 240, 480, 960]
    .map((value, index) => ({ 
      id: `${planksProductionCategory.id}_${index}`,
      category: planksProductionCategory,
      valueLabel: `${formatNumber(value)}/s`,
      boostedResource: "plank",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const perSec = getMaterialsPerSec(gameState, allMarketGoods.plank)
        return perSec >= value
      },
    }))

const paperProductionCategory: AchievementCategory = {
  id: 5,
  label: "Paper production"
}

const paperProduction: Achievement[] = 
  [50, 150, 300, 600, 1200]
    .map((value, index) => ({ 
      id: `${paperProductionCategory.id}_${index}`,
      category: paperProductionCategory,
      valueLabel: `${formatNumber(value)}/s`,
      boostedResource: "paper",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const perSec = getMaterialsPerSec(gameState, allMarketGoods.paper)
        return perSec >= value
      },
    }))

const furnitureProductionCategory: AchievementCategory = {
  id: 6,
  label: "Furniture production"
}

const furnitureProduction: Achievement[] = 
  [10, 20, 50, 100, 250, 500]
    .map((value, index) => ({ 
      id: `${furnitureProductionCategory.id}_${index}`,
      category: furnitureProductionCategory,
      valueLabel: `${formatNumber(value)}/s`,
      boostedResource: "furniture",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const perSec = getMaterialsPerSec(gameState, allMarketGoods.furniture)
        return perSec >= value
      },
    }))

const goldEarnedCategory: AchievementCategory = {
  id: 7,
  label: "Gold earned"
}

const mln = 1000000
const bln = 1000*mln
const trl = 1000*bln

const goldEarned: Achievement[] = 
  [100000, mln, 10*mln, 100*mln, bln, 100*bln, trl]
    .map((value, index) => ({ 
      id: `${goldEarnedCategory.id}_${index}`,
      category: goldEarnedCategory,
      valueLabel: formatNumberWithSuffix(value),
      boostedResource: "wood",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const { player } = gameState
        return player.goldEarnedFromStart >= value
      },
    }))

const gameResetCategory: AchievementCategory = {
  id: 8,
  label: "Reset game"
}

const gameReset: Achievement[] = 
  [1, 5, 10, 25, 50, 100]
    .map((value, index) => ({ 
      id: `${gameResetCategory.id}_${index}`,
      category: gameResetCategory,
      valueLabel: formatNumber(value),
      boostedResource: "wood",
      boostValue: (index + 1) * 5,
      isUnlocked: (gameState: GameStateContextType) => {
        const { player } = gameState
        return player.gameReset >= value
      },
    }))

const axeUpgradeCategory: AchievementCategory = {
  id: 9,
  label: "Axe upgrade"
}

const axeUpgrade: Achievement[] = 
  Object.values(allAxes).slice(1)
    .map((value: Axe, index) => ({ 
      id: `${axeUpgradeCategory.id}_${index}`,
      category: axeUpgradeCategory,
      valueLabel: value.label.split(' ')[0],
      boostedResource: "wood",
      boostValue: index + 1,
      isUnlocked: (gameState: GameStateContextType) => {
        const { player } = gameState
        return player.axe.price >= value.price
      },
    }))

export const allAchievements: Achievement[] = [
  ...cutDownTrees,
  ...woodProduction,
  ...charcoalProduction,
  ...planksProduction,
  ...paperProduction,
  ...furnitureProduction,
  ...gameReset,
  ...goldEarned,
  ...axeUpgrade
]

export const allCategories: AchievementCategory[] = [
  cutDownTreesCategory,
  woodProductionCategory,
  charcoalProductionCategory,
  planksProductionCategory,
  paperProductionCategory,
  furnitureProductionCategory,
  gameResetCategory,
  goldEarnedCategory,
  axeUpgradeCategory,
]