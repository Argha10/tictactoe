import React from 'react';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helpers';
import { INITIAL_HISTORY } from './constants';

import './styles/root.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: INITIAL_HISTORY,
      currentMove: 0,
    };
  }

  handleSquareClick = position => {
    const { history, currentMove } = this.state;
    const current = history[currentMove];
    const { winner } = calculateWinner(current.board);
    if (current.board[position] || winner) {
      return;
    }

    this.setState(prev => {
      const { history: prevHistory, currentMove: prevMove } = prev;
      const last = prevHistory[prevHistory.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isNext ? 'X' : '0';
        }
        return square;
      });
      return {
        currentMove: prevMove + 1,
        history: [
          ...prev.history,
          {
            board: newBoard,
            isNext: !last.isNext,
          },
        ],
      };
    });
  };

  moveTo = move => {
    const { history } = this.state;
    this.setState({
      history,
      currentMove: move,
    });
  };

  onNewGame = () => {
    this.setState({
      history: INITIAL_HISTORY,
      currentMove: 0,
    });
  };

  render() {
    const { history, currentMove } = this.state;
    const current = history[currentMove];
    const { winner, winningSquares } = calculateWinner(current.board);
    return (
      <div className="app">
        <h1>
          TIC <span className="text-green">TAC</span> TOE
        </h1>
        <StatusMessage winner={winner} current={current} />
        <Board
          board={current.board}
          handleSquareClick={this.handleSquareClick}
          winningSquares={winningSquares}
        />
        <button
          type="button"
          onClick={this.onNewGame}
          className={` btn-reset ${winner ? 'active' : ''}`}
        >
          {' '}
          Start New Game{' '}
        </button>
        <h2 style={{ fontWeight: 'normal' }}>Current game history</h2>

        <History
          history={history}
          moveTo={this.moveTo}
          currentMove={currentMove}
        />
        <div className="bg-balls" />
      </div>
    );
  }
}
export default App;
