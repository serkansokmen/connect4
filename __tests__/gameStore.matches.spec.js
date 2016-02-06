import expect from 'expect'
import { actions, constants, getOtherPlayer } from '../app/gameStore'
import matches, { isGameTied } from '../app/gameStore/matches'
import isHorizontal from '../app/gameStore/matches/horizontal';
import isVertical from '../app/gameStore/matches/vertical';
import isDiagonal from '../app/gameStore/matches/diagonal';

describe('gameStore', () => {
  describe('--- matches', () => {
    describe('vertical', () => {
      it('should match first vertical row', () => {
        const grid = [
          [ 0, 0, 1, 1, 1, 1],
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ]
        ];
        const matchesRequired = 4
        expect(isVertical(grid, matchesRequired)).toBe(true);
      })

      it('should match last vertical row', () => {
        const grid = [
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 1, 1, 1, 1 ]
        ];
        const matchesRequired = 4
        expect(isVertical(grid, matchesRequired)).toBe(true);
      })

      it('empty grid should not match vertically', () => {
        const grid = [
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ]
        ];
        const matchesRequired = 4
        expect(isVertical(grid, matchesRequired)).toBe(false);
      })

      it('should not match vertically (buggy grid from that someone found on Slack)', function() {
        const grid = [
          [ 0, 2, 1, 1, 2, 1 ],
          [ 0, 0, 2, 2, 1, 2 ],
          [ 0, 0, 1, 1, 2, 1 ],
          [ 0, 0, 2, 2, 1, 2 ],
          [ 0, 0, 1, 1, 2, 1 ],
          [ 0, 0, 2, 2, 1, 2 ],
          [ 0, 0, 0, 1, 2, 1 ]
        ]
        const matchesRequired = 4
        expect(isVertical(grid, matchesRequired)).toBe(false);
      })
    })

    describe('horizontal', () => {
      it('should match horizontal', () => {
        const grid = [
          [ 1, 0, 0, 0, 0, 0],
          [ 1, 0, 0, 0, 0, 0],
          [ 1, 0, 0, 0, 0, 0],
          [ 1, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ]
        ];
        const numCols = grid.length
        const numRows = grid[0].length
        const matchesRequired = 4
        expect(isHorizontal(grid, numCols, numRows, matchesRequired)).toBe(true);
      })
    })

    describe('diagonal', () => {
      it('should match diagonal', () => {
        const grid = [
          [ 1, 0, 0, 0, 0, 0],
          [ 0, 1, 0, 0, 0, 0],
          [ 0, 0, 1, 0, 0, 0],
          [ 0, 0, 0, 1, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ]
        ];
        const numCols = grid.length
        const numRows = grid[0].length
        const matchesRequired = 4
        expect(isDiagonal(grid, numCols, numRows, matchesRequired)).toBe(true);
      })
    })

    describe('auxiliary', () => {
      it('should tie the game when grid is full', () => {
        const grid = [
          [ 1, 0, 1, 0, 1, 0],
          [ 1, 0, 1, 0, 0, 0],
          [ 1, 0, 1, 0, 1, 0],
          [ 0, 1, 0, 1, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0 ]
        ];
        const numCols = grid.length
        const numRows = grid[0].length
        const inserts = numCols * numRows

        expect(isGameTied(inserts, numCols, numRows)).toBe(true);
      })

      it('should switch player', () => {
        const player1 = 1
        const player2 = 2

        expect(getOtherPlayer(player1)).toEqual(player2)
        expect(getOtherPlayer(player2)).toEqual(player1)
      })
    })

  })
})
