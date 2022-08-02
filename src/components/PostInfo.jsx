import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { POSTS_ROUTE } from '../consts/consts'
import { getOnePost } from '../http/postApi'
import '../styles/PostInfo.css'

const PostInfo = () => {
  const {id} = useParams()
  const [post, setPost] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getOnePost(id).then(data => setPost(data))
  }, [id])

  console.log(post)

  return (
    <div className='info__container'>
      <div className='description'>
        <img alt='' 
          className='description__pic' 
          src={post.img}/>
      </div>
      <div className='description__info'>
        <h1>
          {post.title}
        </h1>
        <h3>by {post.username}</h3>
        <div className='description__content'>
          {post.content}
        </div>
        <div className='description__btns'>
          <button 
            onClick={() => navigate(POSTS_ROUTE)}>GO BACK</button>
          <button className='buy__nft'>
             
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostInfo