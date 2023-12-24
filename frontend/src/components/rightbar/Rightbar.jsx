import React from 'react'
import User from '../user/User'
import './rightbar.scss'
import { BiSearch } from "react-icons/bi";
const Rightbar = () => {
  return (
    <div className='right-container'>
        <div className='search-input'>
          <div className='search-icon'>
              <BiSearch/>
          </div>
          <input type="text" placeholder='Tìm bạn bè ...' />
        </div>

        <div className='right-title'>
          <span>Bạn bè</span>
        </div>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>

    </div>
  )
}

export default Rightbar