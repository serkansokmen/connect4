// Whether the correct action creator was called
// and also whether the right action was returned.
import expect from 'expect'
import { constants, actions, reducer } from '../app/gameStore'

describe('gameStore', () => {
  describe('.constants', () => {
    it('should have a constant named `START_GAME`', () => {
      expect(constants.START_GAME).toEqual('START_GAME')
    })
    it('should have a constant named `ADD_PIECE`', () => {
      expect(constants.ADD_PIECE).toEqual('ADD_PIECE')
    })
    it('should have a constant named `CHECK_ANSWER`', () => {
      expect(constants.CHECK_ANSWER).toEqual('CHECK_ANSWER')
    })
    it('should have a constant named `WIN_GAME`', () => {
      expect(constants.WIN_GAME).toEqual('WIN_GAME')
    })
    it('should have a constant named `DRAW_GAME`', () => {
      expect(constants.DRAW_GAME).toEqual('DRAW_GAME')
    })
    it('should have a constant named `EXIT_GAME`', () => {
      expect(constants.EXIT_GAME).toEqual('EXIT_GAME')
    })
    it('should have a constant named `HOVER_PIECE`', () => {
      expect(constants.HOVER_PIECE).toEqual('HOVER_PIECE')
    })
    it('should have a constant named `BLUR_PIECE`', () => {
      expect(constants.BLUR_PIECE).toEqual('BLUR_PIECE')
    })
    it('should have a constant named `PIECE_EMPTY`', () => {
      expect(constants.PIECE_EMPTY).toEqual(0)
    })
    it('should have a constant named `PIECE_PLAYER_1`', () => {
      expect(constants.PIECE_PLAYER_1).toEqual(1)
    })
    it('should have a constant named `PIECE_PLAYER_2`', () => {
      expect(constants.PIECE_PLAYER_2).toEqual(2)
    })
  })

  describe('.actions', () => {
    it('should create an action to start a game', () => {
      const cols = 7
      const rows = 6
      const expectedAction = {
        type: constants.START_GAME,
        payload: {
          cols,
          rows
        }
      }
      expect(actions.startGame(cols, rows)).toEqual(expectedAction)
    })

    it('should create an action to add a new piece', () => {
      const player = 1
      const columnIndex = 1
      const expectedAction = {
        type: constants.ADD_PIECE,
        payload: {
          columnIndex,
          player
        }
      }
      expect(actions.addPiece(columnIndex, player)).toEqual(expectedAction)
    })

    it('should create an action to check answer', () => {
      const expectedAction = {
        type: constants.CHECK_ANSWER
      }
      expect(actions.checkAnswer()).toEqual(expectedAction)
    })

    it('should create an action to hover a piece', () => {
      const columnIndex = 1
      const expectedAction = {
        type: constants.HOVER_PIECE,
        payload: {
          columnIndex
        }
      }
      expect(actions.hoverPiece(columnIndex)).toEqual(expectedAction)
    })

    it('should create an action to blur a piece', () => {
      const expectedAction = {
        type: constants.BLUR_PIECE
      }
      expect(actions.blurPiece()).toEqual(expectedAction)
    })

    it('should create an action to win a game', () => {
      const expectedAction = {
        type: constants.WIN_GAME
      }
      expect(actions.winGame()).toEqual(expectedAction)
    })

    it('should create an action to draw a game', () => {
      const expectedAction = {
        type: constants.DRAW_GAME
      }
      expect(actions.drawGame()).toEqual(expectedAction)
    })

    it('should create an action to exit game', () => {
      const expectedAction = {
        type: constants.EXIT_GAME
      }
      expect(actions.exitGame()).toEqual(expectedAction)
    })
  })

  describe('reducers', () => {

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
      hoverColumnIndex: null,
      splashSkipped: false
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    // it('should handle `START_GAME`', () => {
      // expect(
      //   reducer({
      //     grid: [],
      //     cols: 7,
      //     rows: 6,
      //     inserts: 0,
      //     player: 1,
      //     boardActive: false,
      //     matches: false,
      //     gameTied: false,
      //     result: null,
      //     isGameRunning: false,
      //     hovered: false,
      //     hoverColumnIndex: null
      //   }, {
      //     type: actions.START_GAME,
      //     payload: {
      //       cols: 7,
      //       rows: 6
      //     }
      //   })
      // ).toEqual({
      //   grid: [
      //     [0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0]
      //   ],
      //   cols: 7,
      //   rows: 6,
      //   inserts: 0,
      //   player: 1,
      //   boardActive: true,
      //   matches: false,
      //   gameTied: false,
      //   result: null,
      //   isGameRunning: true,
      //   hovered: false,
      //   hoverColumnIndex: null
      // })
    // })

    // it('should handle `ADD_PIECE`', () => {

    // })

  })

})
