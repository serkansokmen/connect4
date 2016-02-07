import React from 'react'

export const SplashScreen = ({ onNewGame }) => {
  return (
    <div className='jumbotron'>
      <h1 className="text-center">CONNECT4</h1>
      <p>Connect four of one's own discs of the same color next to each other <br/> vertically, horizontally, or diagonally before your opponent.</p>
      <br/>
      <button className="btn btn-lg btn-info-outline" onClick={onNewGame}>
        <i className="fa fa-circle-o"></i> Start
      </button>
    </div>
  )
}

export default SplashScreen
