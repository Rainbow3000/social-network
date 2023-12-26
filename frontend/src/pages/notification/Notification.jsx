import React from 'react'
import './notification.scss'
import { IoSettingsOutline } from "react-icons/io5";
import Rightbar from '../../components/rightbar/Rightbar';
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import UserChat from '../../components/userChat/UserChat';
import { IoHeart } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
const Notification = () => {
  return (
    <div className='notification-container'>
        <div className="left">
            <div className="left-container">
                <div className="top-left">
                    <span>Thông báo</span>
                    <span><IoSettingsOutline/></span>
                </div>

                <div className='notifi-list'>
                    <div className="notifi-item">
                        <div className='content'>
                            <span className='notifi-type-icon comment'>                      
                                <MdPerson/>
                            </span>
                            <div className='notifi-user'>
                                <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                                <div className='user-name'>
                                    <span>Nguyễn Đức Thịnh đã bình luận bài viết của bạn</span>
                                    <span>4 phút trước</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className='notifi-follow unfollow'>
                            <span>Theo dõi</span>
                        </div>
                    </div>

                    <div className="notifi-item">
                        <div className='content'>
                            <span className='notifi-type-icon comment'>                      
                                <MdPerson/>
                            </span>
                            <div className='notifi-user'>
                                <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                                <div className='user-name'>
                                    <span>Nguyễn Đức Thịnh đã bình luận bài viết của bạn</span>
                                    <span>4 phút trước</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className='notifi-follow unfollow'>
                            <span>Theo dõi</span>
                        </div>
                    </div>
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