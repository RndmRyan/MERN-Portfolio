import React from 'react'
import './wordle.css'
import { useNavigate } from 'react-router-dom';

function wordle() 
{
  
  const navigate = useNavigate();

  const setpathHome = () => {
      navigate("/");
  }


  return (
    <>
    <button className="goHome" onClick={setpathHome}>Home</button>

    <div className='MainPart'>
        <div className='WordleBoard'>
          <table className='Wordle'>
            <tr>
              <td>X</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
              <td>X</td>
            </tr>
            <tr>
              <td>X</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
              <td>X</td>
            </tr>
            <tr>
              <td>X</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
              <td>X</td>
            </tr>
            <tr>
              <td>X</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
              <td>X</td>
            </tr>
            <tr>
              <td>X</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
              <td>X</td>
            </tr>
            <tr>
              <td>X</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
              <td>X</td>
            </tr>
          </table>
        </div>
      <div className='Options'>
        <button>New Game</button>
      </div>
    </div>
    </>
  )
}

export default wordle