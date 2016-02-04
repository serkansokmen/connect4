import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startGame, addPiece, checkAnswer, endGame } from '../gameStore'
import Modal from 'react-modal'
import Piece from './Piece'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}


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
    this.handleAddPiece = this.handleAddPiece.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    // No need to update if immutable object doesn't change
    if (nextProps.matches) {
      nextProps.dispatch(endGame())
      return true
    }
    return this.props.grid !== nextProps.grid;
  }

  componentDidMount() {
    this.handleStartGame()
  }

  handleStartGame () {
    this.props.dispatch(startGame())
  }

  handleAddPiece (colIndex, player) {
    if (!this.props.boardActive) {
      return
    }
    this.props.dispatch(addPiece(colIndex, player))
    setTimeout(() => {
      this.props.dispatch(checkAnswer())
    }, 400)
  }

  render () {

    const { boardActive, inserts, player, grid, matches, result } = this.props
    const self = this

    // Array of cells
    let cells = grid.map((column, y) => {
      return (
        <div className='column' key={`c-${y}`}>
          {column.map((piece, x) => {
            return <Piece key={`cell-${x}-${y}`}
              value={piece}
              x={x}
              y={y}
              player={player}
              onPieceClick={self.handleAddPiece.bind(this, y, player)}/>
          })}
        </div>
      );
    });

    return (
      <div>
        <h1>Connect4</h1>
        <button className="btn" onClick={this.handleStartGame}>New game</button>
        <div className="board">{cells}</div>
        <Modal isOpen={!boardActive && matches} style={customStyles}>
          <h2>{result}</h2>
          <button onClick={this.handleStartGame}>Play again?</button>
        </Modal>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    grid: state.grid,
    player: state.player,
    boardActive: state.boardActive,
    inserts: state.inserts,
    matches: state.matches,
    result: state.result
  }
}

export default connect(
  mapStateToProps
)(Game)
