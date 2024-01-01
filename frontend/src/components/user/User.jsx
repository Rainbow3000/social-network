import React from 'react'
import './user.scss'
const User = ({item}) => {
  return (
    <div className='user-container'>
        <div className='top'>
          <img src={item.avatar} alt="" />
          <span className='user-name'>{item._id.userName}</span>
        </div>
        <span className='active-minute'>3 phút trước</span>
    </div>
  )
}

export default User