import './Assets/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Modal from 'react-modal'
import gameStore from './gameStore'
import Game from './Components/Game.js'


const mountNode = document.getElementById('app')
Modal.setAppElement(mountNode);

ReactDOM.render(
  <Provider store={gameStore}>
    <Game/>
  </Provider>,
  mountNode
)
