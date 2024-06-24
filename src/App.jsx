import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home'
import TicTacToe from './pages/tictactoe'
import Wordle from './pages/wordle'

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />

        <Route path="/TicTacToe" element={<TicTacToe />} />
        <Route path="/Wordle" element={<Wordle />} />
      </Routes>
    </>
  )
}

export default App
