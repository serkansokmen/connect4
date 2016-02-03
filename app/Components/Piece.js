import React from 'react'
import { PIECE_EMPTY, PIECE_PLAYER_1, PIECE_PLAYER_2 } from '../gameStore'

export default (props) => {
  const { value, x, y } = props
  const style = { x, y }
  let clsName = 'piece'
  if (value === PIECE_PLAYER_1) {
    clsName += ' piece-player-1'
  } else if (value === PIECE_PLAYER_2) {
    clsName += ' piece-player-2'
  } else if (value === PIECE_EMPTY) {
    clsName += ' piece-empty'
  }
  return <div className={clsName} style={style}>{value}</div>
}
