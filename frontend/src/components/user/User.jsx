import React from 'react'
import './user.scss'
const User = () => {
  return (
    <div className='user-container'>
        <div className='top'>
          <img src="https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_778" alt="" />
          <span className='user-name'>Mike</span>
        </div>
        <span className='active-minute'>3 phút trước</span>
    </div>
  )
}

export default User