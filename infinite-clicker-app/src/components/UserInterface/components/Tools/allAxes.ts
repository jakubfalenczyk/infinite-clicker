export interface AxeTypes {
  stone: Axe
  bronze: Axe
  iron: Axe
  gold: Axe
  steel: Axe
  titanium: Axe
}

export interface Axe {
  key: keyof AxeTypes
  damage: number
  price: number
  label: string
  imgUrl: string
}

export const allAxes: AxeTypes = {
  stone: {
    key: "stone",
    damage: 5,
    price: 0,
    label: "Stone Axe",
    imgUrl: "/assets/images/axe-stone.png",
  },
  bronze: {
    key: "bronze",
    damage: 10,
    price: 10000,
    label: "Bronze Axe",
    imgUrl: "/assets/images/axe-bronze.png",
  },
  iron: {
    key: "iron",
    damage: 20,
    price: 50000,
    label: "Iron Axe",
    imgUrl: "/assets/images/axe-iron.png",
  },
  gold: { 
    key: "gold",
    damage: 30,
    price: 125000,
    label: "Golden Axe",
    imgUrl: "/assets/images/axe-gold.png",
  },
  steel: {
    key: "steel",
    damage: 40,
    price: 250000,
    label: "Steel Axe",
    imgUrl: "/assets/images/axe-steel.png",
  },
  titanium: {
    key: "titanium",
    damage: 50,
    price: 750000,
    label: "Titanium Axe",
    imgUrl: "/assets/images/axe-titanium.png",
  },
}