import React from 'react'
import './userChat.scss'
import { useDispatch, useSelector } from 'react-redux'
import {getChatListByUser,setUserChatCurrent} from '../../store/slice/chatSlice'
const UserChat = ({item}) => {

  const dispatch = useDispatch(); 
  const {user} = useSelector(state => state.user); 


  const handleGetChatUser = (item)=>{
    dispatch(getChatListByUser({id:user?.data._id,friendId:item?._id._id}))
    dispatch(setUserChatCurrent(item))
    localStorage.setItem('user-chat',JSON.stringify(item)); 
  }


  return (
    <div className='user-chat-container' onClick={()=>handleGetChatUser(item)}>
        <div className='left'>
            <img src={item.avatar} alt="" />
            <div className='chat-content'>
                <span>{item._id.userName}</span>
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