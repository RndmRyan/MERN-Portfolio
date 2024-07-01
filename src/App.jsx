import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home'
import TicTacToe from './pages/tictactoe'
import Wordle from './pages/wordle'
import AdviceGenerator from './pages/adviceGenerator'
import PasswordGenerator from './pages/passwordGenerator'
import JobListing from './pages/jobListing'
import ContactForm from './pages/contactForm'
import CarFlyVal from './pages/carFly'


function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />

        <Route path="/TicTacToe" element={<TicTacToe />} />
        <Route path="/Wordle" element={<Wordle />} />

        <Route path="/AdviceGenerator" element={<AdviceGenerator />} />
        <Route path="/PasswordGenerator" element={<PasswordGenerator />} />

        <Route path="/JobListing" element={<JobListing />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/CarFlysValidation" element={<CarFlyVal />} />
      </Routes>
    </>
  )
}

export default App
