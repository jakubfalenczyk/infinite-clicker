import React from "react"
import Button from "components/GameModal/components/Button"
import { useMediaQuery } from "beautiful-react-hooks"

interface SellProps {
  action: (count?: number) => void 
}

const Sell = (props: SellProps) => {
  const { action } = props
  const isLargeScreen = useMediaQuery("(min-width: 768px)")

  return (
    <div className="row">
      {isLargeScreen && <div className="label">Sell</div>}
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