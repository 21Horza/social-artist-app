import React, {useContext, useState} from 'react'
import '../styles/Auth.css'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { loginUser, registration } from '../http/userApi'

const AuthModal = observer(({active, setActive}) => {
  const {user} = useContext(Context)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const minChar = 6
  const minCharName = 2

  
  const changeHandler = (e) => {
    const value = e.target.value
    if (value === 'true') {
      user.setIsArtist(true)
    } else {
      user.setIsArtist(false)
    }
  }

  const clickHandler = (e) => {
    e.preventDefault()
    try {
      if (user.isAuth) {
        
        // login form
        loginUser(window.accountId, password)
        .catch(e => alert(e.message))
        setPassword('')
      } else {

        // registration form
        const formData = new FormData(e.target)
        formData.append('password', password)
        formData.append('username', username)
        formData.append('is_artist', user.isArtist)
        formData.append("wallet", window.accountId)
        
        registration(formData)
          .then( data => console.log(data))
          .catch(e => console.log(e.message))
        setPassword('')
        setUsername('')
        setActive(false)
      }
    } catch(e) {
      alert(e.message)
    }
  }

  return (
    <div className={active ? 'modal active' : 'modal'} 
          onClick={() => setActive(false)}>
      <div className='content' 
          onClick={e => e.stopPropagation()}>
        <form onSubmit={clickHandler}>
          <h1>{user.isAuth ? 'Login' : 'Register account'}</h1>
          {username.length <= minCharName && <p style={{color: 'red', marginLeft: '20px', fontSize: 20}}>
            Name should be more than 2 characters
            </p>}
          {!user.isAuth &&
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" -Artist or -User name"
              type="text"
              value={username}
            />
          }
          {password.length <= minChar && 
            <p style={{color: 'red', marginLeft: '20px', fontSize: 20}}>
            Password has to be more than 6 characters
            </p>}
          <input 
            onChange={e => setPassword(e.target.value)}
            placeholder='Password...' 
            type='password' 
            value={password} 
          />
          {!user.isAuth &&
          <div className='choose'>
            <p>Are you an artist?</p>
            <input 
              id='yes' 
              type='radio' 
              value='true'
              name='artist'
              onChange={e => changeHandler(e)}
            />
            <label htmlFor='yes'>YES</label>
            <input 
              id='no' 
              type='radio'
              value='false'
              name='artist'
              onChange={e => changeHandler(e)}
            />
            <label htmlFor="no">NO</label>
          </div>
          }
          <div className='footer'>
          {user.isAuth ? 
            <div>
              Don't have an account? 
              <p 
              onClick={() => user.setIsAuth(false)}>
                Click here
              </p>
            </div>
            :
            <div>
              Do you have an account? 
              <p 
              onClick={() => {user.setIsAuth(true)}}
              >Click here
              </p>
            </div>
          }
          <button 
          typeof='submit'>
            {user.isAuth ? 'Login' : 'Sign up'}
            </button> 
          </div>
        </form>
      </div>
    </div>
  )
})

export default AuthModal