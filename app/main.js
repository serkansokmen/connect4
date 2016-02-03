import './Assets/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import gameStore from './gameStore'
import Game from './Components/Game.js'

ReactDOM.render(
  <Provider store={gameStore}>
    <Game/>
  </Provider>,
  document.getElementById('app')
)
