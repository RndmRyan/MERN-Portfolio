import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom';


function home() 
{
    const navigate = useNavigate();
    const setpathTicTacToe = () => {
      navigate("/TicTacToe");
    }
    const setpathWordle = () => {
      navigate("/Wordle");
    }

  return (
    <>
      <div className="container">
        <h2>Play a Game</h2>
        <div className="options">
          <button onClick={setpathTicTacToe}>TicTacToe</button>
          <button onClick={setpathWordle}>Wordle (Currently Under Development)</button>
        </div>
      </div>
    </>
  )
}

export default home