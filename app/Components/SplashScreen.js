import React from 'react'

const SplashScreen = ({ onNewGame }) => {
  return (
    <div className='jumbotron'>
      <h1 className="text-center">CONNECT4</h1>
      <button className="btn btn-lg btn-success" onClick={onNewGame}>New game</button>
    </div>
  )
}

export default SplashScreen
