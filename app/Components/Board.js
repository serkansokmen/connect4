import React from 'react'
import Piece from './Piece'

const Board = ({ grid, player, hoverColumnIndex, hovered, onPieceClick, onPieceHover, onPieceBlur }) => {
  // Array of cells
  const pieces = grid.map((column, y) => {
    let columnClsName = 'column'
    if (y === hoverColumnIndex && hovered) {
      columnClsName += ` column-hovered-player-${player}`
    }
    return (
      <div className={columnClsName} key={`c-${y}`}>
        {column.map((piece, x) => {
          return <Piece key={`cell-${x}-${y}`}
            value={piece}
            x={x}
            y={y}
            player={player}
            onPieceClick={onPieceClick.bind(this)}
            onPieceHover={onPieceHover.bind(this)}
            onPieceBlur={onPieceBlur.bind(this)}/>
        })}
      </div>
    );
  });

  return <div className='board'>{pieces}</div>
}

export default Board
