import 'regenerator-runtime/runtime'
import React, {useEffect, useContext} from 'react'
import './styles/App.css'
import getConfig from './config'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRouter from './routes/AppRouter'
import { observer } from 'mobx-react-lite'
import { Context } from '.'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const App = observer(() => {
  const {user} = useContext(Context)

  useEffect(() => {
      user.setIsArtist(true)
      user.setIsAuth(true)
      user.setUser(true)
}, [])

  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
})

export default App