import React from 'react'
import { constants } from '../gameStore'

const DropPiece = ({ column, dropped, player, style }) => {
  let clsName = 'piece drop-piece'
  if (player === constants.PIECE_PLAYER_1) {
    clsName += ' piece-player-1'
  } else if (player === constants.PIECE_PLAYER_2) {
    clsName += ' piece-player-2'
  }
  if (dropped) {
    clsName += ' dropped'
  }
  return <div className={clsName} style={style}><i className='fa fa-arrow-down'/></div>
}

export default DropPiece
