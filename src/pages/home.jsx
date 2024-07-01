import React from 'react'
import './stylesheets/home.css'
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
    const setpathAdvice = () => {
      navigate("/AdviceGenerator");
    }
    const setpathPassword = () => {
      navigate("/PasswordGenerator");
    }
    const setpathJobListing = () => {
      navigate("/JobListing");
    }
    const setpathCarFlyVal = () => {
      navigate("/CarFlysValidation");
    }
    const setpathContactForm = () => {
      navigate("/ContactForm");
    }

  return (
    <>
      <div className="container">
        <h2>Individual Projects</h2>
        <div className="options">
          <button onClick={setpathAdvice}>Advice Generator</button>
          <button onClick={setpathPassword}>Password Generator</button>
        </div>
        <div className="options">
          <button onClick={setpathJobListing}>Job Listing</button>
          <button onClick={setpathCarFlyVal}>CarFlys Validation</button>
        </div>
        <div className="options">
          <button onClick={setpathContactForm}>ContactForm (Not integrated)</button>
        </div>
        <h2>Play a Game</h2>
        <div className="options">
          <button onClick={setpathTicTacToe}>TicTacToe</button>
          <button onClick={setpathWordle}>Wordle</button>
        </div>
      </div>
    </>
  )
}

export default home