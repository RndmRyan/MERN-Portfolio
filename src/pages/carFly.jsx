import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import carLogo from '../assets/carFlyLogo.svg'
import car from '../assets/car.webp'
import SignUp from '../components/carFly/signupform'
import './stylesheets/carFly.css'


function carFly() 
{
    const navigate = useNavigate();

    const setpathHome = () => {
        navigate("/");
    }

return (
    <>
    <button className="goHome" onClick={setpathHome}>Home</button>
    <img id='logo' src={carLogo}/>

    <div className='MainContainer'>
        <SignUp />
        <div className='rightdecor'> <img id='car' src={car}/> </div>
    </div>
    </>
)
}

export default carFly