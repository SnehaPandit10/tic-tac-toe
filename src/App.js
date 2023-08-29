import { useState } from 'react';
import './App.css';
import Board from './components/boards/Board';
import { ScoreBoard } from './components/boards/ScoreBoard';
import { ResetBoard } from './components/boards/ResetBoard';

function App() {

  // WIN_CONDITIONS
  const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0, dScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIndex) => {
    
    // box clicked by x/o and updated  
    const updateBoard = board.map((value, index) => {
      if (index === boxIndex)
        return xPlaying === true ? "X" : "O";
      else
        return value;
    })

    // increses the score of the winner
    const winner = checkWinner(updateBoard);
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      }
      else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    }

    // check for a tie condition and increse the score for draw
    let filled = true;
    updateBoard.map((item) => {
      if (item === null)
        filled = false;
    })
    if (filled && winner !== "X" && winner !== "O") {
      let { dScore } = scores;
      dScore += 1;
      setScores({ ...scores, dScore });
    }

    setBoard(updateBoard);
    setXPlaying(!xPlaying);
  }

  // check the winner based on the WIN_CONDITIONS
  const checkWinner = (board) => {
    for (let i = 0; i < win_conditions.length; i++) {
      const [x, y, z] = win_conditions[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  // reset the board to play again, hence scores are not set to 0
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  // restart the whole game, hence scores are also set to 0
  const restart = () => {
    setGameOver(false);
    setScores({ xScore: 0, oScore: 0, dScore: 0 });
    setBoard(Array(9).fill(null));
  }

  
  return (
    <>
      <h2>Tic-Tac-Toe</h2>
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetBoard resetBoard={resetBoard} restart={restart} />
    </>
  );
}

export default App;
