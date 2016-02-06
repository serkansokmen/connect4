import React from 'react'
import { constants } from '../gameStore'

const Piece = ({ value, x, y, player }) => {
  let clsName = 'piece'
  if (value === constants.PIECE_PLAYER_1) {
    clsName += ' piece-player-1'
  } else if (value === constants.PIECE_PLAYER_2) {
    clsName += ' piece-player-2'
  } else if (value === constants.PIECE_EMPTY) {
    clsName += ' piece-empty'
  }
  return <button className={clsName}></button>
}

export default Piece
