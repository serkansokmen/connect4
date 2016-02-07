import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { SplashScreenComponent, Game, Board, Piece } from '../app/Components'

const setup = () => {
  let props = {
    onNewGame: expect.createSpy()
  }
  let renderer = TestUtils.createRenderer()
  renderer.render(<SplashScreenComponent onNewGame={props.onNewGame} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

// describe('components', () => {

//   describe('SplashScreen', () => {

//     // const onNewGame = expect.createSpy()
//     // const splashScreen = TestUtils.renderIntoDocument(<SplashScreen onNewGame={onNewGame}/>)

//     it('should render correctly', () => {
//       const { output } = setup()
//       // expect(splashScreen.props.className).toBe('jumbotron')

//       // let [ h1, button ] = output.props.children
//       // expect(h1.type).toBe('h1')
//       // expect(h1.props.children).toBe('CONNECT4')
//     })
//   })
// })
