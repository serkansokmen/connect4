import { createStore, combineReducers } from 'redux'
import matches, { isGameTied } from './matches';

// Constants
const START_GAME = 'START_GAME'
const ADD_PIECE = 'ADD_PIECE'
const CHECK_ANSWER = 'CHECK_ANSWER'
const WIN_GAME = 'WIN_GAME'
const DRAW_GAME = 'DRAW_GAME'
const EXIT_GAME = 'EXIT_GAME'

const HOVER_PIECE = 'HOVER_PIECE'
const BLUR_PIECE = 'BLUR_PIECE'

const PIECE_EMPTY = 0
const PIECE_PLAYER_1 = 1
const PIECE_PLAYER_2 = 2

export const constants = {
  START_GAME,
  ADD_PIECE,
  CHECK_ANSWER,
  WIN_GAME,
  DRAW_GAME,
  EXIT_GAME,

  HOVER_PIECE,
  BLUR_PIECE,

  PIECE_EMPTY,
  PIECE_PLAYER_1,
  PIECE_PLAYER_2
}

const startGame = (cols = 7, rows = 6) => {
  return {
    type: START_GAME,
    payload: {
      cols,
      rows
    }
  }
}

// Action creators
const addPiece = (columnIndex, player) => {
  return {
    type: ADD_PIECE,
    payload: {
      columnIndex,
      player
    }
  }
}

const checkAnswer = () => {
  return {
    type: CHECK_ANSWER
  }
}
const hoverPiece = (columnIndex) => {
  return {
    type: HOVER_PIECE,
    payload: {
      columnIndex
    }
  }
}
const blurPiece = () => {
  return {
    type: BLUR_PIECE
  }
}
const winGame = () => {
  return {
    type: WIN_GAME
  }
}
const drawGame = () => {
  return {
    type: DRAW_GAME
  }
}
const exitGame = () => {
  return {
    type: EXIT_GAME
  }
}
export const actions = {
  startGame,
  addPiece,
  hoverPiece,
  blurPiece,
  checkAnswer,
  winGame,
  drawGame,
  exitGame
}

// Initial state
const initialState = {
  grid: [],
  cols: 7,
  rows: 6,
  inserts: 0,
  player: 1,
  boardActive: false,
  matches: false,
  gameTied: false,
  result: null,
  isGameRunning: false,
  hoverColumnIndex: null
}

// Reducers
export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case START_GAME:
      // Starting a new game
      const { cols, rows } = action.payload
      let grid = []
      for (let i = 0; i < cols; i++) {
        let column = []
        for (let j = 0; j < rows; j++) {
          column.push(PIECE_EMPTY)
        }
        grid.push(column)
      }
      return {
        ...state,
        grid,
        cols,
        rows,
        player: 1,
        boardActive: true,
        matches: false,
        inserts: 0,
        isGameRunning: true,
        hoverColumnIndex: null
      }

    case ADD_PIECE:
      // Adding a new piece
      const { columnIndex, player } = action.payload
      let column = state.grid[columnIndex]
      let cellIndex = -1
      let isAvailableCell = false

      column.forEach((cellPiece, i) => {
        if (cellPiece === PIECE_EMPTY) {
          cellIndex = i;
        }
      })
      isAvailableCell = (cellIndex >= 0)
      const newGrid = [...state.grid]
      if (isAvailableCell) {
        // column[cellIndex] = piece
        newGrid[columnIndex][cellIndex] = player
      }

      return {
        ...state,
        inserts: isAvailableCell ? state.inserts + 1 : state.inserts,
        player: isAvailableCell ? getOtherPlayer(state.player) : state.player,
        grid: newGrid,
        boardActive: false,
        hoverColumnIndex: columnIndex
      }

    case CHECK_ANSWER:
      // Checking answer
      return {
        ...state,
        boardActive: true,
        matches: matches(state.grid, state.cols, state.rows),
        gameTied: isGameTied(state.inserts, state.cols, state.rows)
      }

    case HOVER_PIECE:
      console.log(action.payload.columnIndex);
      return {
        ...state,
        hoverColumnIndex: action.payload.columnIndex
      }
    case BLUR_PIECE:
      return {
        ...state,
        hoverColumnIndex: null
      }

    case WIN_GAME:
      return {
        ...state,
        result: `Player ${getOtherPlayer(state.player)} wins! ${state.inserts} moves were made.`,
        boardActive: false,
        isGameRunning: false
      }

    case DRAW_GAME:
      return {
        ...state,
        result: 'It\'s a draw!',
        boardActive: false,
        isGameRunning: false
      }


    case EXIT_GAME:
      return {
        ...initialState
      }

    default:
      return state
  }
}

export const getOtherPlayer = (player) => {
  return player === PIECE_PLAYER_1 ? PIECE_PLAYER_2 : PIECE_PLAYER_1
}

// Store
export default createStore(reducer)
