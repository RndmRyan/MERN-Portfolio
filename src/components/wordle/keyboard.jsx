import React from 'react'
import Keys from './keys'

function keyboard() 
{
  const keysRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const keysRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const keysRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  return (
  <div className='KeyBoard'>
    <div className='Line'>{keysRow1.map((key)=>{
      return <Keys keyVal ={key}/>;
    })}</div>
    <div className='Line'>{keysRow2.map((key)=>{
      return <Keys keyVal ={key}/>;
    })}</div>
    <div className='Line'>
      <Keys keyVal ={"Enter"}/>
      {keysRow3.map((key)=>{
      return <Keys keyVal ={key}/>;
    })}
      <Keys keyVal ={"Del"}/></div>
  </div>
  )
}

export default keyboard