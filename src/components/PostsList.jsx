import React, {useState, useMemo, useEffect, useContext} from 'react'
import Post from './Post'
import Select from './UI/Select'
import '../styles/PostsList.css'
import '../styles/Loader.css'
import ScrollUpBtn from './UI/ScrollUpBtn'
import { deletePost, getAllPosts } from '../http/postApi'
import UserToolsBar from './UI/UserToolsBar'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import Loader from './UI/Loader'
import { useFetching } from './hooks/useFetching'
import ErrorModal from './UI/ErrorModal'
import SearchBtn from './UI/SearchBtn'

const PostsList = observer(() => {
  const {user} = useContext(Context)
  const [errModal, setErrModal] = useState(true)
  const [showMyPosts, setShowMyPosts] = useState(false)
  const [myPosts, setMyPosts] = useState('')
  const [selectedSort, setSelectedSort] = useState('')
  const [nftPosts, setNftPosts] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [fetchPosts, isPostsLdng, err] = useFetching(async () => {
    await getAllPosts().then(data => setNftPosts(data.reverse()))
  })
  
  const srtdPosts = useMemo(() => {
    if (selectedSort) {
      return [...nftPosts]
      .sort((a,b) => a[selectedSort]
      .localeCompare(b[selectedSort]))
    } return nftPosts
  }, [selectedSort, nftPosts])

  const srtdAndSearchedPosts = useMemo(() => {
      return srtdPosts.filter(post => post.title.toLowerCase()
      .includes(searchInput))
  }, [searchInput, srtdPosts])
  
  const onClickHandler = () => {
    setMyPosts(srtdPosts.filter(post => 
    post.near_wallet.toLowerCase().
    includes(window.accountId)))
    setShowMyPosts(true)
  }
  
  useEffect(() => {
      fetchPosts()
  }, [])
  

  if (isPostsLdng) {
    return <Loader />
  }

  if (err) {
    return <ErrorModal 
        active={errModal} 
        setActive={setErrModal}>
      <h1>Ooops... ERROR FROM THE SERVER</h1>
      <h1>{err}</h1>
    </ErrorModal>
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    if (sort === 'near_wallet') {
      setSearchInput(window.accountId)
    }
  }

  const removePostHandler = (post) => {
    console.log(post._id)
    deletePost(post._id).catch(e => alert(e.message))
  }

  return (
    <div className='container'>
      <div className='tools'>
        <SearchBtn 
          placeholder={selectedSort === 'username' 
          ? 
          'search artist' 
          : 
          'search NFT'}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        {user.isArtist && user.isAuth && localStorage.getItem('token') &&
          <UserToolsBar activeMyPosts={onClickHandler}/>
        }
      </div>
      <div className='posts__list'>
        {showMyPosts
          ?
          myPosts.map(my_p => 
          <Post
            remove={removePostHandler}
           key={my_p._id} post={my_p}/>
          )
          : 
          (
          srtdAndSearchedPosts.length ? 
          srtdAndSearchedPosts.map(p => 
          <Post
          remove={removePostHandler}
           key={p._id} post={p}/>
          )
          : <h1 style={{color: '#fff', 
          marginTop: '3rem', 
          textAlign: 'center'}}>
            NOT FOUND</h1>
          )
        }
      </div>
        <div className='select'>
          <Select 
            value={selectedSort}
            onChange={sortPosts}
            defaultValue='Sort by'
            options={[
              {value: 'title', 
              txt: 'NFT name'},
              {value: 'username', 
              txt: 'Artist'}
            ]}
          />
        </div>
            <ScrollUpBtn />
    </div>
  )
})

export default PostsList