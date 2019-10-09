import { useEffect, useRef } from "react"

interface AudioContainerProps {
  src: string
  isPlaying: boolean
}

const AudioContainer = (props: AudioContainerProps) => {
  const audio = useRef(new Audio(props.src))

  useEffect(() => {
    if (props.isPlaying) {
      audio.current.currentTime = 0
      audio.current.play()

    }
  }, [props.isPlaying])

  return null
}

export default AudioContainer