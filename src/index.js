import React, {createContext} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './utils'
import userStore from './store/userStore'

export const Context = createContext(null)

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <Context.Provider value={{
        user: new userStore()
    }}>
      <App />,
    </Context.Provider>,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
