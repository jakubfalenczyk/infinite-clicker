import React from "react"
import "./styles.scss"
import Nameplate from "../Nameplate"

const Burner = () => 
  <Nameplate 
    className="burner"
    upgradeKey="burners"
    additionalContent={<div className="fire"></div>}
  />

export default Burner