import React, {useState, useContext} from 'react'
import '../styles/Post.css'
import {INFO_ROUTE } from '../consts/consts.js'
import { useNavigate } from 'react-router-dom'
import heart from '../assets/heart.png'
import like from '../assets/like.png'
import token from '../assets/token.png'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import Big from 'big.js';
import { useFetching } from './hooks/useFetching'
import Loader from './UI/Loader'
import { sendDislike, sendLike } from '../http/likesApi'
import Toast from './UI/Toast'
import ErrorModal from './UI/ErrorModal'

const Post = observer(({post, remove}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [showToast, setShowToast] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [clckLike, setClckLike] = useState(post.likes.includes(window.accountId))
    const postLikes = post.likes.length
    const [sendTips, isLoading, errSendTips, showTipsSuccess] = useFetching( async () => {
        const tips = window.prompt('How many NEAR tokens do u want to send?', '0.1')
        const amount = Big(tips || '0').times(10 ** 24).toFixed()
        await window.contract.send_tips({amount, sender: window.accountId, receiver: post.near_wallet})
    })

    const [sendLikeDB, isLoadingLikes, errSendLikes] = useFetching( async () => {
        await sendLike(post._id)
    })

    const [sendDislikeDB, isLoadingDislikes, errSendDislikes] = useFetching( async () => {
        await sendDislike(post._id)
    })

    const sendTipsHandler = async (e) => {
        e.stopPropagation()
        if (!localStorage.getItem('token')) {
            setShowAlert(true)
        } else {
            sendTips()
        }
    }

    if (errSendDislikes || errSendLikes || showTipsSuccess ) {
        setTimeout(() => {
            window.location.reload()
        }, 3000)
    }

    if (isLoading || isLoadingDislikes || isLoadingLikes) {
        return <Loader />
    }

    if (showAlert) {
        return <ErrorModal 
            active={showAlert} 
            setActive={setShowAlert}
        >
        <h1 style={{marginBottom: '10px', fontSize: 50, color: 'red'}}>NO TOKEN ACCESS</h1>
        <hr />
        <h1 style={{marginTop: '10px'}}>Connect NEAR wallet first</h1>
        <h1>to</h1>
        <h1>register or login</h1>
        </ErrorModal>
    }
    
    const likeHandler = (e) => {
        e.stopPropagation()
        if (!localStorage.getItem('token') && !window.accountId) {
            return setShowAlert(true)
        } 
        if (!clckLike) {
            console.log(post)
            sendLikeDB()
            console.log('FN triggered: like')
            setClckLike(true)
        } else {
            console.log(post)
            sendDislikeDB()
            console.log('FN triggered: dislike')
            setClckLike(false)
        }
    }

    const canUpdate = (post.near_wallet.toLowerCase().
    includes(window.accountId)) && window.accountId && localStorage.getItem('token')
    
    
  return (
      <>
      {showTipsSuccess &&
          <Toast 
          active={showToast} 
          setActive={setShowToast}
          errMsg={false}
          title={'Success!'}
          >
          <h2>Your tokens has been successfully sent to {post.username} with wallet: {post.wallet}</h2>
          </Toast>
      }
      {errSendTips &&
        <Toast 
        active={showToast} 
        setActive={setShowToast}
        errMsg={true}
        title={'Contract Error'}
        >
        <h2>You can not send token to yourself</h2>
        </Toast>
      }
      {errSendDislikes && <Toast
       active={showToast}
       setActive={setShowToast}
       errMsg={true}
       title={'Error sending dislikes'}
       >
        {errSendDislikes}
       </Toast>}
      {errSendLikes && <Toast
       active={showToast}
       setActive={setShowToast}
       errMsg={true}
       title={'Error sending likes'}
       >
        {errSendLikes}
       </Toast>}
        <div
        className='post'>
            {canUpdate &&
            <div className='artist__btns'>
                <button onClick={() => remove(post)} className='delete__btn'>X</button>
            </div>
            }
            <div onClick={() => navigate(INFO_ROUTE + '/' + post._id)} className='post__img'>
                <img alt='' 
                    className='post__pic'
                    src={post.img}/>
            </div>
            <div className='post__footer'>
                <div className='author'>
                    <p style={{fontSize: '23px'}}>{post.title}</p>
                    <p style={{fontSize: '10px'}}>by {post.username}</p>
                </div>
                <div className='btns'>
                    <div style={{fontSize: '25px'}}>{postLikes}</div>
                    {!clckLike ? 
                    <img 
                        className='heart' 
                        alt='dislike' 
                        src={heart} 
                        onClick={e => likeHandler(e)}/>
                    :
                    <img 
                        className='heart' 
                        alt='like' 
                        src={like} 
                        onClick={e => likeHandler(e)}/>
                    }
                    <img 
                        className='token' 
                        onClick={e => sendTipsHandler(e)} 
                        alt='' src={token}/>
                </div>
            </div>
        </div>
      </>
  )
})

export default Post