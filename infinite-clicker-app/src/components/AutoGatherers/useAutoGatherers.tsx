import { useRef } from "react"

const useAutoGatherers = () => {
  const tick = useRef(() => {
    console.log("TICK!")
  })

  useRef(setInterval(() => tick.current(), 1000))
}

export default useAutoGatherers