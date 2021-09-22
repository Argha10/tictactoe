import { winningLines } from './constants';

const isWinner = (squares, a, b, c) =>
  squares[a] && squares[a] === squares[b] && squares[a] === squares[c];

export const calculateWinner = squares => {
  let result = {
    winner: null,
    winningSquares: [],
  };
  winningLines.forEach(winningLine => {
    const [a, b, c] = winningLine;
    if (isWinner(squares, a, b, c)) {
      result = {
        winner: squares[a],
        winningSquares: [a, b, c],
      };
    }
  });
  return result;
};
