import React from "react"
import "./styles.scss"

interface HealthBarProps {
  life: number
}

const HealthBar = (props: HealthBarProps) => {
  return (
    <div className="health-bar">
      <div className="life" style={{ width: props.life }}/>
      <span className="life-count">{props.life}%</span>
    </div>
  )
}

export default HealthBar
