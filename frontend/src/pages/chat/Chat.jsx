import React from 'react'
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
const Chat = () => {
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
                 <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
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
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>

                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>

                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>

                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                     <div className='chat-item'>
                        <img src="https://picture.dzogame.vn/Img/minato2_pp_518.jpg" alt="" />
                        <div className='content-wrapper'>
                            <div className='content-item'>
                                <div className='content'>
                                    <span>Xin chào bạn khỏe không ?</span>
                                </div>
                                 &nbsp;&nbsp;
                                <BiDotsHorizontal className='option-icon'/>
                            </div>
                            <span className='time'>9 giờ trước</span>
                        </div>
                     </div>
                </div>

                <div className='chat-input'>
                    <div className='input-wrapper'>
                        <input type="text" placeholder='Nhập tin nhăn của bạn ...' />
                        <div className='icon-wrapper'>
                            <FaRegFaceSmile className='icon'/>
                            <IoImageOutline className='icon'/>
                        </div>
                    </div>

                    <div className='send-btn'>
                        <RiSendPlane2Line/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat