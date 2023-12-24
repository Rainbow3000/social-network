import React, { useEffect, useState } from 'react'
import Post from '../../components/post/Post'
import RightBar from '../../components/rightbar/Rightbar'
import './home.scss'
import { useDispatch, useSelector } from 'react-redux'
import {getPostList} from '../../store/slice/postSlice'
import { IoMdImages } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import { RiFacebookBoxLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { RiSendPlane2Line } from "react-icons/ri";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import Recommend from '../../components/recommend/Recommend'
const Home = () => {

  const {postList} = useSelector(state => state.post); 

  const dispatch = useDispatch(); 

  const getPosts = async()=>{
    try {
      dispatch(getPostList()); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getPosts(); 
  },[])

  return (
    <div className='home-container'>
        <div className="home-main">
            <div className="left">
              <div className='post-create'>
                  <div className='user-input'>
                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_778" alt="" />
                    <input placeholder='Nội dung bài viết của bạn ...' type="text" />
                  </div>
                  <div className='post-media'>
                    <div className='media-action'>
                      <ul>
                        <li><IoMdImages/>&nbsp; Ảnh/Video</li>
                        <li><FaRegFaceSmile/>&nbsp; Biểu tượng</li>
                      </ul>            
                    </div>             
                    <button>Đăng</button>
                  </div>
              </div>

              <div className='post-list'>
                  {
                    postList && postList.map((item,index)=>{
                      return (
                        <Post item = {item}/>
                      )
                    })
                  }
              </div>

            </div>
            <div className="right">
            <Recommend/>


              {/* <div className="right-recomment">
                  <div className='top'>
                    <span>Sự kiện</span>
                    <span>Xem thêm</span>
                  </div>
                  <div className='center'>
                   
                      <img src="https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_778" alt="" />            
                      <div className="user-wrapper">
                        <div className='user-name'>
                          <span>Nguyễn Văn A</span>
                          <span>Người đóng góp nổi bật</span>
                          <div className='icon-list'>
                            <span><RiFacebookBoxLine/></span>
                            <span><LuTwitter/></span>
                            <span><FaInstagram/></span>
                          </div>
                        </div>


                      </div>
                      
                    </div>
                
                  <div className='bottom'>
                    <button>Ẩn</button>
                    <button>Theo dõi</button>
                  </div>
              </div> */}


              <div className="right-recommend">
                  <div className='top'>
                    <span>Sinh nhật</span>
                    <span>Xem thêm</span>
                  </div>
                  <div className='center'>           
                      <img className='dob-user-img' src="https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_778" alt="" />            
                      <div className="user-wrapper">
                        <div className='user-name'>
                          <span>Nguyễn Văn A</span>
                          <span>Sinh nhật ngày hôm nay</span>                      
                        </div>

                      </div>
                      
                    </div>
                
                  <div className='bottom'>
                    <div className='dob-send-input'>
                        <input type="text" placeholder='Gửi lời chúc mừng ...'/>
                        <div className='send-icon-wrapper'><RiSendPlane2Line/></div>
                    </div>
                  </div>

                  <div className='dob-upcomming'>
                    <div className='dob-icon'>
                        <LiaBirthdayCakeSolid/>
                    </div>
                    <div className='dob-info'>
                      <span>Sinh nhật của mọi người</span>
                      <span>12 người bạn đón sinh nhật hôm nay</span>
                    </div>
                  </div>
              </div>
            </div>
        </div>
     
        <div className="right-bar">
             
            <RightBar/>
        </div>
    </div>
  )
}

export default Home