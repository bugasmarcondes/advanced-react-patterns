// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // @1
  // return React.Children.map(children, child => {
  //   console.log(child)
  //   return null
  // })

  return React.Children.map(children, (child, index) => {
    // @2
    // This is not allowed, so we have to use React.cloneElement
    // child.props.on = on

    // @3
    // const newChild = React.cloneElement(child, { on, toggle })
    // console.log(newChild)
    // return newChild

    // @4, used to allow the <span> tag
    if (typeof child.type === 'string') {
      return child
    }

    // @5.b.
    // if (allowedTypes.includes(child.type)) {
    const newChild = React.cloneElement(child, {
      on,
      toggle,
    })
    return newChild
    // }
    // return child
  })
}

const ToggleOn = ({on, children}) => (on ? children : null)
const ToggleOff = ({on, children}) => (on ? null : children)
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

// @5.a., if we want to restrict the types that can be used
const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function MyToggleButton({on, toggle}) {
  return on ? 'the button is onnn' : 'the button is offf'
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
        <MyToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
