import React from 'react'
import { PIECE_EMPTY, PIECE_PLAYER_1, PIECE_PLAYER_2 } from '../gameStore'

const Piece = ({ value, x, y, player, onPieceClick, onPieceHover, onPieceBlur }) => {
  let clsName = 'piece'
  if (value === PIECE_PLAYER_1) {
    clsName += ' piece-player-1'
  } else if (value === PIECE_PLAYER_2) {
    clsName += ' piece-player-2'
  } else if (value === PIECE_EMPTY) {
    clsName += ' piece-empty'
  }
  return <button className={clsName}
   onClick={onPieceClick.bind(this, y, player)}
   onMouseEnter={onPieceHover.bind(this, y)}
   onMouseOut={onPieceBlur.bind(this)}></button>
}

export default Piece
