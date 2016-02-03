import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startGame, addPiece, checkAnswer, endGame } from '../gameStore'
import Piece from './Piece'


class Game extends Component {

  static propTypes = {
    grid: PropTypes.array,
    boardActive: PropTypes.bool,
    inserts: PropTypes.number,
    player: PropTypes.number
  };

  constructor () {
    super()
    this.handleStartGame = this.handleStartGame.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log(nextProps.grid);
    // No need to update if immutable object doesn't change
    return this.props.grid !== nextProps.grid;
  }

  handleStartGame () {
    this.props.dispatch(startGame())
  }

  handleAddPiece (colIndex, player) {
    console.log(colIndex, player);
    this.props.dispatch(addPiece(colIndex, player))
    setTimeout(() => {
      this.props.dispatch(checkAnswer())
    }, 400)
  }

  render () {

    const { boardActive, inserts, player, grid } = this.props
    // Array of cells
    let cells = grid.map((column, y) => {
      return (
        <div className='column' key={`c-${y}`}>
          {column.map((piece, x) => {
            return <Piece key={`cell-${x}-${y}`}
              value={piece}
              onClick={this.handleAddPiece.bind(null, y, player)}/>
          })}
        </div>
      );
    });

    const game = boardActive ? (
      <div>
        <div>{grid}</div>
        <div>Inserts: {inserts}</div>
        <div className="board">{cells}</div>
        <button className="btn" onClick={this.handleAddPiece}>Add piece</button>
      </div>
    ) : null

    return (
      <div>
        <h1>Connect4</h1>
        <button className="btn" onClick={this.handleStartGame}>New game</button>
        {game}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    grid: state.grid,
    boardActive: state.boardActive,
    inserts: state.inserts,
    player: state.player
  }
}

export default connect(
  mapStateToProps
)(Game)
