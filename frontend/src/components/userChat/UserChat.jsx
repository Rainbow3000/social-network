import React from 'react'
import './userChat.scss'
const UserChat = () => {
  return (
    <div className='user-chat-container'>
        <div className='left'>
            <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
            <div className='chat-content'>
                <span>Minato Kazaige</span>
                <span>Chúng tôi cần bạn trợ giúp...</span>
            </div>
        </div>
        <div className='right'>
            <span>1 ngày</span>
            <div className='mess-num'>
              <span>3</span>
            </div>
        </div>
    </div>
  )
}

export default UserChat