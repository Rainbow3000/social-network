import React from 'react'
import User from '../user/User'
import './rightbar.scss'
import { BiSearch } from "react-icons/bi";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
const Rightbar = () => {

  const {userInfo} = useSelector(state => state.user); 

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
        {
          userInfo?.friends?.length > 0 && userInfo.friends.map(item =>{
            return (
              <Link to={`/profile/${item._id._id}`} className='link'>
                <User item={item}/>
              </Link>
            )
          })
        }
    </div>
  )
}

export default Rightbar