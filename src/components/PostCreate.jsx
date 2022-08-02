import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { IMG_DB, POSTS_ROUTE } from '../consts/consts'
import { createPost } from '../http/postApi'
import '../styles/CreatePost.css'

const PostCreate = () => {
  const navigate = useNavigate()
  const [nftName, setNftName] = useState()
  const [content, setContent] = useState()
  const [nftLink, setNftLink] = useState()
  const [imgLink, setImgLink] = useState()

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', window.accountId) 
    formData.append('title', nftName)
    formData.append('content', content)
    formData.append('nft_link', nftLink)
    formData.append('near_wallet', window.accountId)
    formData.append('img', imgLink)

    createPost(formData)
    .then(data => console.log(data))
    .then(navigate(POSTS_ROUTE))
    .catch(e => alert(e.message))

  }

  // send pic to DB
  const selectPicture = e => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('upload_preset', 'nbqrnmhp')
    axios.post(IMG_DB, formData).then(data => setImgLink(data.data.url))
    console.log('success:', imgLink)
   }

  return (
    <>
      <button className='goback__btn' 
        onClick={() => navigate(POSTS_ROUTE)}>GO BACK</button>
      <div className='create__modal'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='image'>
            <img 
              className='image__default' 
              alt='' src={imgLink }/>
            <input 
              className='upload__input'
              accept='image/*'
              type='file' 
              onChange={selectPicture}/>
            <input 
            defaultValue={nftLink}
              placeholder='NFT marketplace link' 
              type='text' 
              onChange={e => setNftLink(e.target.value)}/>
          </div>
          <div className='form__right'>
            <input 
              type='text' 
              placeholder='NFT name' 
              defaultValue={nftName}
              onChange={e => setNftName(e.target.value)}/>
            <textarea 
              defaultValue={content}
              className='content' 
              type='text' 
              placeholder='Tell us something about your NFT and yourself being as an artist' 
              onChange={e => setContent(e.target.value)}/>
            <button className='submit__btn'>SUBMIT</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PostCreate