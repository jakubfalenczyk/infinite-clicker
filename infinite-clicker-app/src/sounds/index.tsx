import React from "react"
import { music, choppingSounds, treeFallSound, uiSounds } from "./paths"

const AllSounds = () => {
  return (
    <div>
      <audio id="sounds-bg" loop>
        <source src={music.bg} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-danger" loop>
        <source src={music.danger} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-danger2" loop>
        <source src={music.danger2} type="audio/mpeg"/>
      </audio>

      <audio id="sounds-axe-chop-1">
        <source src={choppingSounds[0]} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-axe-chop-2">
        <source src={choppingSounds[1]} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-axe-chop-3">
        <source src={choppingSounds[2]} type="audio/mpeg"/>
      </audio>

      <audio id="sounds-tree-fall">
        <source src={treeFallSound} type="audio/mpeg"/>
      </audio>

      <audio id="sounds-disabled-click">
        <source src={uiSounds.disabledClick} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-menu-click">
        <source src={uiSounds.menuClick} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-money">
        <source src={uiSounds.money} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-upgrade">
        <source src={uiSounds.upgrade} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-extinguish">
        <source src={uiSounds.extinguish} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-squish">
        <source src={uiSounds.squish} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-menu-close">
        <source src={uiSounds.menuClose} type="audio/mpeg"/>
      </audio>
      <audio id="sounds-achievement">
        <source src={uiSounds.achievement} type="audio/mpeg"/>
      </audio>
    </div>
  )
}

export default AllSounds