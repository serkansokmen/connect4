import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startGame, addPiece, hoverPiece, blurPiece, checkAnswer, endGame, exitGame } from '../gameStore'
import Modal from 'react-modal'
import SplashScreen from './SplashScreen'
import Board from './Board'


const modalStyles = {
  content : {
    textAlign: 'center',
    padding: 80
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
    this.handleExitGame = this.handleExitGame.bind(this)
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   // No need to update if immutable object doesn't change
  //   // return this.props.grid !== nextProps.grid;
  //   return true
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.matches) {
      nextProps.dispatch(endGame())
    }
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

  handleHover (colIndex) {
    this.props.dispatch(hoverPiece(colIndex))
  }
  handleBlur () {
    this.props.dispatch(blurPiece())
  }
  handleExitGame () {
    this.props.dispatch(exitGame())
  }

  render () {

    const {
      boardActive,
      inserts,
      player,
      grid,
      matches,
      result,
      isGameRunning,
      hovered,
      hoverColumnIndex
    } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            {isGameRunning ? (<div className='text-center'>
                <Board grid={grid}
                  hovered={hovered}
                  player={player}
                  hoverColumnIndex={hoverColumnIndex}
                  onPieceClick={this.handleAddPiece.bind(this)}
                  onPieceHover={this.handleHover.bind(this)}
                  onPieceBlur={this.handleBlur.bind(this)}/>
                <br/>
                <button className='btn btn-sm btn-info-outline'
                  onClick={this.handleExitGame}>
                  <i className="fa fa-sign-out"></i> Exit
                </button>
              </div>)
              : <SplashScreen onNewGame={this.handleStartGame}/>}
          </div>
        </div>

        <Modal isOpen={!boardActive && matches && !isGameRunning}
          closeTimeoutMS={150}
          style={modalStyles}
          onRequestClose={this.closeModal}>
          <h2>{result}</h2>
          <button className='btn btn-lg btn-info-outline'
            onClick={this.handleStartGame}>Play again</button>
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
    result: state.result,
    isGameRunning: state.isGameRunning,
    hovered: state.hovered,
    hoverColumnIndex: state.hoverColumnIndex
  }
}

export default connect(
  mapStateToProps
)(Game)
