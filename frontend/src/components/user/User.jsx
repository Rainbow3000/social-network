import React from 'react'
import './user.scss'
import { useSelector } from 'react-redux'
const User = ({item}) => {

  const {activeList} = useSelector(state => state.user); 
  return (
    <div className='user-container'>
        <div className='top'>
          <div className={activeList.find(act => act === item._id._id) !== undefined ? 'active':'un-active'}></div>
          <img src={item.avatar} alt="" />
          <span className='user-name'>{item._id.userName}</span>
        </div>
        <span className='active-minute'>{activeList.find(act => act === item._id._id) !== undefined && 'Đang hoạt động'}</span>
    </div>
  )
}

export default User