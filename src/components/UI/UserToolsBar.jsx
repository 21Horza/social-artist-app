import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_POST_ROUTE } from '../../consts/consts'
import '../../styles/UserToolsBar.css'

const UserToolsBar = ({activeMyPosts}) => {
    const navigate = useNavigate()
  return (
    <div className='tools'>
        <div className='tools__btns'>
          <button 
            onClick={() => activeMyPosts()}>
              MY POSTS
            </button>
          <button 
            onClick={() => window.location.reload()}>
              ALL POSTS
            </button>
          <button 
            onClick={() => navigate(CREATE_POST_ROUTE)}>
              Create a post
            </button>
        </div>
    </div>
  )
}

export default UserToolsBar