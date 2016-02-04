import isHorizontal from './horizontal';
import isVertical from './vertical';
import isDiagonal from './diagonal';


export const isGameTied = (inserts, numCols, numRows) => {
  return inserts >= numCols * numRows;
}

/**
 * Does this grid contain any matches?
 * @param {Array} grid NxN muldimentional array containing our grid
 */
export default function(grid, numCols, numRows) {
  const matchesRequired = 4
  return isHorizontal(grid, numCols, numRows, matchesRequired) ||
    isVertical(grid, matchesRequired) ||
    isDiagonal(grid, numCols, numRows, matchesRequired)
}
