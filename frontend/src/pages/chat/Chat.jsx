import React,{useEffect, useState} from 'react'
import UserChat from '../../components/userChat/UserChat';
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";
import { GoArrowRight } from "react-icons/go";
import { BiDotsHorizontal, BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { LuPenSquare } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlane2Line } from "react-icons/ri";
import './chat.scss'
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, getDownloadURL} from 'firebase/storage'
import EmojiPicker from "emoji-picker-react";
import {createChat,getChatListByUser} from '../../store/slice/chatSlice'

const Chat = () => {
  const [content,setContent] = useState("");
  const [image,setImage] = useState("");
  const [video,setVideo] = useState("");
  const [file,setFile] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const {user} = useSelector(state => state.user); 
  const {userChatCurrent,chatList} = useSelector(state => state.chat); 

  const dispatch = useDispatch(); 

  const handleChooseImage = (event)=>{
    const file = event.target.files[0]; 
    const fileNameExtension = file.name?.split('.')[1]; 

    if(fileNameExtension === "doc"){
        const fileName =  `words/${uuid()}-${file.name}`; 
        const storageRef = refStorage(storage,fileName); 
        uploadBytes(storageRef,file).then((snapshot)=>{
            getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
                setFile(downloadUrl)             
            })
        })
    }
    else if(fileNameExtension === "mp4"){
      const fileName =  `videos/${uuid()}-${file.name}`; 
      const storageRef = refStorage(storage,fileName); 
      uploadBytes(storageRef,file).then((snapshot)=>{
          getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
              setVideo(downloadUrl)             
          })
      })
    }else{
      const fileName =  `images/${uuid()}-${file.name}`; 
      const storageRef = refStorage(storage,fileName); 
      uploadBytes(storageRef,file).then((snapshot)=>{
          getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
            setImage(`${downloadUrl}@-@${fileName}`)       
          })
      })
    }
}

const handleCreateMessage = ()=>{
    const data = {
        content,
        image,
        video,
        file,
        from: user.data._id,
        to: userChatCurrent._id._id
    }
    dispatch(createChat(data))
}

const onEmojiClick = (object) => {
    let text = content + object.emoji;
    setContent(text);
};

useEffect(()=>{
    dispatch(getChatListByUser({id:user.data._id,friendId:userChatCurrent?._id._id}))
},[])
  

  return (
    <div className='chat-container'>
        <div className="chat-left">
            <div className='input-wrapper'>
                <div className='input'>
                    <div className='search-icon'>
                        <BiSearch />
                    </div>
                    <input type="text" />      
                </div>

                <div className='option-icon'>
                    <BsThreeDots/>
                </div>
            </div>
            <div className='user-list-chat'>
               
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
                <UserChat/>
            </div>
        </div>
        <div className="chat-right">
            <div className="chat-top">
                 <img src={ userChatCurrent?.avatar} alt="" />
                 <div className='user-name'>
                    <span>Nguyễn Đức Thịnh</span>
                    <span>Đang hoạt động</span>
                 </div>
                 <div className='pen-icon'>
                    <LuPenSquare/>
                    &nbsp;
                    Tùy chọn
                 </div>
            </div>
            <div className="chat-bottom">
                <div className='chat-welcome'>
                    <span>Bắt đầu cuộc trò chuyện của bạn với Lan</span>
                </div>

                <div className='chat-content'>
                    {
                        chatList.length > 0 && chatList.map(item =>{
                            return (
                                <div className={item.from._id._id === user.data._id ? 'chat-item right' : 'chat-item left'}>
                                <img src={item.from._id._id === user.data._id ? item.from.avatar : item.to.avatar} alt="" />
                                <div className='content-wrapper'>
                                    <div className='content-item'>
                                        <div className='content'>
                                            <span>{item.content}</span>
                                        </div>
                                            &nbsp;&nbsp;
                                        <BiDotsHorizontal className='option-icon'/>
                                    </div>
                                    <span className='time'>9 giờ trước</span>
                                </div>
                                </div>
                            )
                        })
                    }



                    
                </div>

                <div className='chat-input'>
                    <div className='input-wrapper'>
                        <input onChange={(e)=> setContent(e.target.value)}  value={content} type="text" placeholder='Nhập tin nhắn của bạn ...'/>
                        <div className='icon-wrapper'>
                            {emojiShow && (
                                <div className="emoji">
                                    <EmojiPicker theme='light' onEmojiClick={onEmojiClick} />
                                </div>
                            )}

                            <input id='file-input' type="file" multiple onChange={handleChooseImage} />
                            <FaRegFaceSmile className='icon' onClick={() => setEmojiShow(!emojiShow)}/>
                            <label htmlFor="file-input">
                                <IoImageOutline className='icon'/>
                            </label>
                        </div>
                    </div>

                    <div className='send-btn' onClick={handleCreateMessage}>
                        <RiSendPlane2Line/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat