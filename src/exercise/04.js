// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

// @1, prop collection
// function useToggle() {
//   const [on, setOn] = React.useState(false)
//   const toggle = () => setOn(!on)
//   return {
//     on,
//     toggle,
//     togglerProps: {
//       'aria-pressed': on,
//       onClick: toggle,
//     },
//   }
// }

// function App() {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

// @2, prop getter
const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args))

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      // onClick: () => {
      //   onClick && onClick()
      //   toggle()
      // },
      // Use the function callAll instead of declaring each event handler
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
