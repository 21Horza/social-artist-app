import React, {useState, useContext} from 'react'
import '../styles/Navbar.css'
import wallet from '../assets/wallet.png'
import userIcon from '../assets/user.png'
import {login, logout} from '../utils'
import AuthModal from './AuthModal'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import Toast from './UI/Toast'
import { loginUser } from '../http/userApi'

const Navbar = observer(() => {
  const {user} = useContext(Context)
    const [active, setActive] = useState()
    const [showSuccess, setShowSuccess] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showSignedOutToast, setShowSignedOutToast] = useState(false)

    const clickHandler = () => {
      if (!window.accountId) {
          setShowAlert(true)
      }
      else if(localStorage.getItem('token')) {
        localStorage.removeItem('token')
        setShowSignedOutToast(true)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setActive(true)
      }
    }

    const logOutNearHandler = () => {
      logout()
      setShowSignedOutToast(true)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }

  return (
      <>
        <div className='navbar'>
          {window.accountId &&
          <div className='navbar__logged'>
              <h2 
                onClick={logOutNearHandler}>
                Logged as: {window.accountId}
              </h2>
          </div>}
          <div className='navbar__icon'>
              <img 
              onClick={clickHandler} 
              src={userIcon} 
              alt="" />
              <img 
              onClick={login} 
              src={wallet} 
              alt="" />
          </div>
        </div>
        {showSuccess && <Toast 
          active={showSuccess} 
          setActive={setShowSuccess} 
          errMsg={false}
          title={'You are logged in!'}
        ></Toast>}
        {showSignedOutToast && <Toast 
          active={showSignedOutToast} 
          setActive={setShowSignedOutToast} 
          errMsg={false}
          title={'Successfully logged out!'}
        ></Toast>}
        {showAlert && <Toast 
          active={showAlert} 
          setActive={setShowAlert} 
          errMsg={true}
          title={'NO TOKEN ACCESS'}
        ></Toast>}
        <AuthModal active={active} setActive={setActive}/>
      </>
  )
})

export default Navbar