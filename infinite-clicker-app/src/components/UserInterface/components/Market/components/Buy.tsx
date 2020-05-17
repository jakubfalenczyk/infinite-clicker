import React from "react"
import Button from "components/GameModal/components/Button"

interface BuyProps {
  action: (count: number) => void 
}

const Buy = (props: BuyProps) => {
  const { action } = props

  return (
    <div className="row">
      <div className="label">Buy</div>
      <div className="marketActions">
        <Button onClick={() => action(10)}>
          10x
        </Button>
        <Button onClick={() => action(100)}>
          100x
        </Button>
      </div>
    </div>
  )
}

export default Buy