import React from 'react'
import '../../styles/SearchBtn.css'

const SearchBtn = ({value, onChange}) => {

  return (
    <input 
        onChange={onChange}
        value={value}
        className='search' 
        placeholder='search by artist' 
        type='search'/>
  )
}

export default SearchBtn