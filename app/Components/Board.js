import React from 'react'
import DropPiece from './DropPiece'
import Piece from './Piece'
import { constants } from '../gameStore'


const Board = ({ grid, player, boardActive, hoverColumnIndex, onPieceClick, onPieceHover, onPieceBlur }) => {
  // Array of cells
  const pieces = grid.map((column, y) => {
    let columnClsName = 'column'
    if (y === hoverColumnIndex) {
      columnClsName += ` column-hovered-player-${player}`
    }
    return (
      <div className={columnClsName} key={`c-${y}`}
        onMouseEnter={onPieceHover.bind(this, y, 0)}
        onClick={onPieceClick.bind(this, y, player)}>
        {column.map((piece, x) => {
          return <Piece key={`cell-${x}-${y}`}
            value={piece}
            x={x}
            y={y}
            player={player}
            onMouseOut={onPieceBlur.bind(this)}/>
        })}
      </div>
    );
  });

  const isPlayer1 = player === constants.PIECE_PLAYER_2
  const isPlayer2 = player === constants.PIECE_PLAYER_1
  const left = 40 + 68 * hoverColumnIndex

  const dropPieceStyles = {
    piece1: {
      left,
      top: isPlayer1 ? (boardActive ? -45 : 240) : -45,
      opacity: isPlayer1 ? 0 : 1,
      zIndex: isPlayer1 ? 90 : 100
    },
    piece2: {
      left,
      top: isPlayer2 ? boardActive ? -45 : 240 : -45,
      opacity: isPlayer2 ? 0 : 1,
      zIndex: isPlayer2 ? 90 : 100
    }
  }


  return (
    <div>
      <DropPiece column={hoverColumnIndex}
        player={constants.PIECE_PLAYER_1}
        style={dropPieceStyles.piece1}
        dropped={isPlayer1 && !boardActive}/>
      <DropPiece column={hoverColumnIndex}
        player={constants.PIECE_PLAYER_2}
        style={dropPieceStyles.piece2}
        dropped={isPlayer2 && !boardActive}/>
      <div className='board-container'>
        <div className='board'>
          {pieces}
        </div>
      </div>
    </div>
  )
}

export default Board
