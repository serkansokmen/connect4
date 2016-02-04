import { createStore, combineReducers } from 'redux'
import matches from './matches';
// import { Map, List, fromJS } from 'immutable'

// Constants
const START_GAME = 'START_GAME'
const ADD_PIECE = 'ADD_PIECE'
const CHECK_ANSWER = 'CHECK_ANSWER'
const END_GAME = 'END_GAME'

export const PIECE_EMPTY = 0
export const PIECE_PLAYER_1 = 1
export const PIECE_PLAYER_2 = 2

export const startGame = (cols = 7, rows = 6) => {
  return {
    type: START_GAME,
    payload: {
      cols,
      rows
    }
  }
}

// Action creators
export const addPiece = (columnIndex, player) => {
  return {
    type: ADD_PIECE,
    payload: {
      columnIndex,
      player
    }
  }
}

export const checkAnswer = () => {
  return {
    type: CHECK_ANSWER
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
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
  result: null
}

// Reducers
const connect4 = (state = initialState, action) => {
  switch (action.type) {

    case START_GAME:
      console.log('Starting a new game');
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
        matches: false
      }

    case ADD_PIECE:
      console.log('Adding a new piece');
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
        boardActive: false
      }

    case CHECK_ANSWER:
      console.log('Checking answer');
      return {
        ...state,
        boardActive: true,
        matches: matches(state.grid, state.cols, state.rows)
      }

    case END_GAME:
      console.log('Game ended!');
      console.log(state.player);
      return {
        ...state,
        boardActive: false,
        result: `Player ${getOtherPlayer(state.player)} wins!`
      }

    default:
      return state
  }
}

const getOtherPlayer = (player) => {
  return player === PIECE_PLAYER_1 ? PIECE_PLAYER_2 : PIECE_PLAYER_1
}

// Store
export default createStore(connect4)
