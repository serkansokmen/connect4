import React from 'react'
import DropPiece from './DropPiece'
import Piece from './Piece'
import { constants } from '../gameStore'


const Board = ({ grid, player, boardActive, hoverColumnIndex, pieceIndex, onPieceClick, onPieceHover, onPieceBlur }) => {
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

  let isPlayer1 = player === constants.PIECE_PLAYER_2
  let isPlayer2 = player === constants.PIECE_PLAYER_1
  let left = 40 + 68 * hoverColumnIndex
  let topZero = -45
  let topPadding = 60
  let topDiff = 76
  let minus = 0;
  let top1 = isPlayer1 ? (boardActive ? topZero : topZero + topPadding + topDiff * pieceIndex - minus) : topZero
  let top2 = isPlayer2 ? (boardActive ? topZero : topZero + topPadding + topDiff * pieceIndex - minus) : topZero

  const dropPieceStyles = {
    piece1: {
      left,
      top: top1,
      opacity: isPlayer1 ? 0 : 1,
      zIndex: isPlayer1 ? 90 : 100
    },
    piece2: {
      left,
      top: top2,
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
