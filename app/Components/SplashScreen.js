import React from 'react'

const SplashScreen = ({ onNewGame }) => {
  return (
    <div className='jumbotron'>
      <h1 className="text-center">CONNECT4</h1>
      <button className="btn btn-lg btn-info-outline" onClick={onNewGame}>
        <i className="fa fa-circle-o"></i> New game
      </button>
    </div>
  )
}

export default SplashScreen
