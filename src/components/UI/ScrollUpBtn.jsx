import React, {useEffect, useState} from 'react'
import '../../styles/ScrollUpBtn.css'

const ScrollUpBtn = () => {
    const [scrollUp, setScrollUp] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                setScrollUp(true)
            } else {
                setScrollUp(false)
            }
        })
    }, [])

    const goUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

  return (
    <div>
        {scrollUp && 
            <button 
                onClick={goUp} 
                className='scrollBtn'>
                ^
            </button>
        }
    </div>
  )
}

export default ScrollUpBtn