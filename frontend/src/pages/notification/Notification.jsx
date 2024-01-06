import React, { useEffect, useRef } from 'react'
import './notification.scss'
import { IoSettingsOutline } from "react-icons/io5";
import Rightbar from '../../components/rightbar/Rightbar';
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import UserChat from '../../components/userChat/UserChat';
import { IoHeart } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {getNotificationByUser} from '../../store/slice/notificationSlice'
import moment from 'moment/dist/moment';
import 'moment/dist/locale/vi'
import {createInstanceSocket} from '../../utils/socket'
import {addNotifi} from '../../store/slice/notificationSlice'
import {Link} from 'react-router-dom'
import { PiHandshake } from "react-icons/pi";
import { IoMdEye } from "react-icons/io";
moment.locale('vi');

const Notification = () => { 
  const socket = useRef(); 
  const {notificationList} = useSelector(state => state.notification)
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch(); 

  useEffect(()=>{
    socket.current = createInstanceSocket(); 
    if(socket.current){
        
      
    }

  },[])
  return (
    <div className='notification-container'>
        <div className="left">
            <div className="left-container">
                <div className="top-left">
                    <span>Thông báo</span>
                    <span><IoSettingsOutline/></span>
                </div>

                <div className='notifi-list'>
                    {
                        notificationList.length > 0  &&  notificationList.map(item =>{
                            if(item.notifiType === 'ADD_FRIEND'){
                                return (
                                    <Link to={`/profile/${item.fromUser._id._id}`} className='link'>
                                        <div className="notifi-item">
                                        <div className='content'>
                                            <span className='notifi-type-icon follow'>   
                                                <MdPerson/>                   
                                                {/* <MdOutlineChatBubbleOutline/>
                                                <IoHeart/>
                                                <IoMdImages/> */}
                                            </span>
                                            <div className='notifi-user'>
                                                <img src={item.fromUser?.avatar} alt="" />
                                                <div className='user-name'>
                                                    <span><b>{item.fromUser?._id?.userName}</b>&nbsp;<span className='content'>{item.content}</span></span>
                                                    <span className='time'>{moment(item?.createdAt).calendar()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='notifi-item-btn'>
                                          
        
                                            <div className='btn-item eye'>
                                                <span><IoMdEye/></span>
                                            </div>
                                        </div>
                                        <div className='state'>
                                            
                                        </div>
                                        </div>
                                    </Link>
                                   
                                )
                            }

                            if(item.notifiType === 'ACCEPT_ADD_FRIEND'){
                                return (
                                <Link to={`/profile/${item.fromUser._id._id}`} className='link'>
                                        <div className="notifi-item">
                                        <div className='content'>
                                            <span className='notifi-type-icon hand-shake'>   
                                                <PiHandshake/>                   
                                                {/* <MdOutlineChatBubbleOutline/>
                                                <IoHeart/>
                                                <IoMdImages/> */}
                                            </span>
                                            <div className='notifi-user'>
                                                <img src={item.fromUser?.avatar} alt="" />
                                                <div className='user-name'>
                                                    <span><b>{item.fromUser?._id?.userName}</b>&nbsp;<span className='content'>{item.content}</span></span>
                                                    <span className='time'>{moment(item?.createdAt).calendar()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                       
                                        <div className='state'>
                                            
                                        </div>
                                        </div>
                                    </Link>
                                )
                            }
                        })
                    }                  
                </div>

            </div>
        </div>
        
        <div className="right">
            <Rightbar/>
        </div>
    </div>
  )
}

export default Notification