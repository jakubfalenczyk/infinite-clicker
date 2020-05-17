import React from "react"
import Button from "components/GameModal/components/Button"

interface SellProps {
  action: (count?: number) => void 
}

const Sell = (props: SellProps) => {
  const { action } = props

  return (
    <div className="row">
      <div className="label">Sell</div>
      <div className="marketActions">
        <Button onClick={() => action(10)}>
          10x
        </Button>
        <Button onClick={() => action(100)}>
          100x
        </Button>
        <Button onClick={() => action()}>
          All
        </Button>
      </div>
    </div>
  )
}

export default Sell