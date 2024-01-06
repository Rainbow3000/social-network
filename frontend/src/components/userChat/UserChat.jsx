import React, { useEffect,useState } from 'react'
import './userChat.scss'
import { useDispatch, useSelector } from 'react-redux'
import {getChatListByUser,setUserChatCurrent} from '../../store/slice/chatSlice'
import axios from 'axios'
import moment from 'moment/dist/moment';
import 'moment/dist/locale/vi'
moment.locale('vi');
const UserChat = ({item,chatLengh,activeList}) => {

  const dispatch = useDispatch(); 
  const {user} = useSelector(state => state.user); 
  const [chatItem,setChatItem] = useState(null); 

  const handleGetChatUser = (item)=>{
    dispatch(getChatListByUser({id:user?.data._id,friendId:item?._id._id}))
    dispatch(setUserChatCurrent(item))
    localStorage.setItem('user-chat',JSON.stringify(item)); 
  }
 
  const getRecentChatItem = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL_SERVER}chat/getOnebyuser/${user?.data._id}&${item?._id._id}`);
      const {data} = response.data;
      setChatItem(data)
    } catch (error) {
      
    }
  }

  console.log(activeList)
  console.log(chatItem)


  useEffect(()=>{
    getRecentChatItem(); 
  },[chatLengh])


  return (
    <div className='user-chat-container' onClick={()=>handleGetChatUser(item)}>
        <div className='left'>
            <img src={item.avatar} alt="" />
            <div className='chat-content'>
                <span>{item._id.userName}</span>          
                {
                  chatItem !== null && chatItem[0]?.from._id._id === user.data._id && (
                    <>
                      <span>Bạn: <span style={{fontWeight:'normal'}}>{chatItem[0].content}</span></span>
                    </>
                  )
                }
            </div>
        </div>
        <div className='right'>
            {
              activeList?.find(item => item === (chatItem !== null && chatItem[0]?.to._id._id)) !== undefined  ? (
                <span className='user-active'></span>
              ):(
                <>
                <span>{chatItem !== null && chatItem[0]?.to.timeDisconnect !== undefined && moment(chatItem[0].to.timeDisconnect).calendar()}</span>
                </>
              )
            }
            <div className='mess-num'>
              <span>3</span>
            </div>
        </div>
    </div>
  )
}

export default UserChat