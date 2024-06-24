import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import './tictactoe.css'

import GameBoard from '../components/tictactoe/gameboard';
import GameOptions from '../components/tictactoe/gameoptions';
import { initializeBoard, checkWinner, isBoardFull } from '../components/tictactoe/gameUtil';
import { findBestMove } from '../components/tictactoe/aiUtil';


function tictactoe() 
{
    const navigate = useNavigate();

    const setpathHome = () => {
        navigate("/");
    }

    const [board, setBoard] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
    const [humanScore, setHumanScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [turn, setTurn] = useState('X'); // 'X' for human, 'O' for AI
    const [starter, setStarter] = useState('X');
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (turn === 'O' && !message) {
            const bestMove = findBestMove(board);
            handleCellClick(bestMove.row, bestMove.col, true);
        }
    }, [turn, message, board]);

    const handleCellClick = (rowIndex, colIndex, isAi = false) => {
        if (board[rowIndex][colIndex] === '' && !message) {
            const newBoard = board.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                    if (rIndex === rowIndex && cIndex === colIndex) {
                        return turn;
                    }
                    return cell;
                })
            );
            setBoard(newBoard);

            const winner = checkWinner(newBoard);
            if (winner) {
                setMessage(`${winner === 'X' ? 'Human' : 'AI'} wins!`);
                if (winner === 'X') {
                    setHumanScore(humanScore + 1);
                } else {
                    setAiScore(aiScore + 1);
                }
            } else if (isBoardFull(newBoard)) {
                setMessage('It\'s a draw!');
            } else {
                setTurn(turn === 'X' ? 'O' : 'X');
            }
        }
    }

    const newGame = () => {
        const initialBoard = initializeBoard(starter);
        setBoard(initialBoard);
        setMessage('');
        setTurn(starter);
    }

    const resetScores = () => {
        setAiScore(0);
        setHumanScore(0);
    }

    return (
        <>
        <button className="goHome" onClick={setpathHome}>Home</button>

        <div className='MainBody'>
            <div className='ScoreBoard'>
                <div className='Score'>
                    Human Score: {humanScore}
                </div>
                <div className='Score'>
                    AI Score: {aiScore}
                </div>
            </div>
            <GameBoard board={board} handleCellClick={handleCellClick} />

            {message && <div className='Message'>{message}</div>}

            <GameOptions starter={starter} setStarter={setStarter} newGame={newGame} resetScores={resetScores} />
        </div>
    </>
  )
}

export default tictactoe