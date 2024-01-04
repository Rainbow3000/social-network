import React,{useEffect, useState,useRef} from 'react'
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
import moment from 'moment/dist/moment';
import 'moment/dist/locale/vi'
moment.locale('vi');


const Chat = () => {
  const [content,setContent] = useState("");
  const [image,setImage] = useState("");
  const [video,setVideo] = useState("");
  const [file,setFile] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const {user,userInfo,activeList} = useSelector(state => state.user); 
  const {userChatCurrent,chatList} = useSelector(state => state.chat); 
  const scrollRef = useRef();
  const inputRef = useRef(); 
  const dispatch = useDispatch(); 


  useEffect(() => {
    const scrollToBottomWithSmoothScroll = () => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current?.scrollHeight,
        behavior: "smooth",
      });
    };
    scrollToBottomWithSmoothScroll();

  }, [chatList.length]);
  


  const handleChooseImage = (event)=>{
    const file = event.target.files[0]; 
    const fileNameExtension = file?.name?.split('.')[1]; 

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
    setContent("");
    setVideo("");
    setFile("");
    setImage("");
    setEmojiShow(false); 
}

const onEmojiClick = (object) => {
    let text = content + object.emoji;
    setContent(text);
};

const handleSubmitForm = (e)=>{
    e.preventDefault(); 
    handleCreateMessage();
}


useEffect(()=>{
    dispatch(getChatListByUser({id:user?.data._id,friendId:userChatCurrent?._id._id}))
},[])
  

  return (
    <div className='chat-container'>
        <div className="chat-left">
            <div className='input-wrapper'>
                <div className='input'>
                    <div className='search-icon'>
                        <BiSearch />
                    </div>
                    <input type="text" placeholder='Tìm kiếm người liên hệ' />      
                </div>

                <div className='option-icon'>
                    <BsThreeDots/>
                </div>
            </div>
            <div className='user-list-chat' >
                {
                    userInfo?.chats.length > 0  && userInfo.chats.map(item =>{
                        return (
                            <UserChat item={item}/>
                        )
                    })
                }
               
            </div>
        </div>
        <div className="chat-right">
            {
                image.trim() !== "" && (
                    <img width={120} height={120} className='preview-image' src={image} alt=''/>
                )
            }

             {
                video.trim() !== "" && (
                    <video width="100%" height="100%" controls poster={video} >
                        <source src={video} type="video/mp4"/>
                        Your browser does not support the video tag.
                   </video>
                )
            }
            {
                userChatCurrent !== null ? (
                    <>
                    <div className="chat-top">
                        <img src={ userChatCurrent?.avatar} alt="" />
                        <div className='user-name'>
                            <span>{userChatCurrent?._id.userName}<span className={activeList?.find(item => item === userChatCurrent?._id._id) !== undefined ? 'status on':'status off'}></span></span>                         
                            <span>{activeList?.find(item => item === userChatCurrent?._id._id) !== undefined ? 'Đang hoạt động':'Không hoạt động'}</span>
                        </div>
                        <div className='pen-icon'>
                            <LuPenSquare/>
                            &nbsp;
                            Tùy chọn
                        </div>
                    </div>
                    <div className="chat-bottom">

                        {
                            chatList.length  === 0 ? (
                                <div className='chat-welcome'>
                                    <span>Bắt đầu cuộc trò chuyện của bạn với {userChatCurrent?._id.userName}</span>
                                </div>
                            ):(
                                <div className='chat-welcome'>
                                    <span></span>
                                </div>
                            )
                        }


                        <div className='chat-content' ref={scrollRef}>
                            {
                                chatList.length > 0 && chatList.map(item =>{
                                    return (
                                        <div className={item?.from._id._id === user.data._id ? 'chat-item right' : 'chat-item left'}>
                                        {
                                            item?.from._id._id === user.data._id ? (
                                                <img src={item?.from?.avatar} alt="" />  
                                            ):(
                                                <img src={item?.from?.avatar} alt="" />  
                                            )
                                        }
                                      
                                        <div className='content-wrapper'>
                                            <div className='content-item'>
                                                <div className='item-wrapper'>

                                                    {
                                                        item.content.trim() !== "" && (
                                                        <div className='content'>
                                                            <span>{item.content}</span>
                                                        </div>
                                                        )
                                                    }

                                                    {
                                                        item.image.trim()!== "" && (
                                                        <div className='image'>
                                                            <img src={item.image} alt="" />
                                                        </div>
                                                        )
                                                    }
                                                    
                                                    {
                                                        item.file.trim()!== "" && (
                                                        <div>
                                                            <a href={item.file}>{item.file}</a>
                                                        </div>
                                                        )
                                                    }

{
                                                        item.video.trim()!== "" && (
                                                        <div className='image'>
                                                                <video width="100%" height="100%" controls poster={item.video} >
                                                                    <source src={item.video} type="video/mp4"/>
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                        </div>
                                                        )
                                                    }

                                                </div>


                                                    &nbsp;&nbsp;
                                                <BiDotsHorizontal className='option-icon'/>
                                            </div>
                                                                             
                                            <span className='time'>{moment(item?.createdDate).calendar()}</span>
                                        </div>
                                        </div>
                                    )
                                })
                            }



                            
                        </div>

                        <div className='chat-input'>
                            <form className='input-wrapper' onSubmit={handleSubmitForm}>
                                <input  onChange={(e)=> setContent(e.target.value)} ref={inputRef}  value={content} type="text" placeholder='Nhập tin nhắn của bạn ...'/>
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
                            </form>

                            <div className='send-btn' onClick={handleCreateMessage}>
                                <RiSendPlane2Line/>
                            </div>
                        </div>
                    </div>
                    </>
                ):(
                    <div className='welcome'>
                        <span>Chọn một người bạn để trò chuyện !</span>
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default Chat