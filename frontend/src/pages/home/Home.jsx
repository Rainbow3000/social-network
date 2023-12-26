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
import { useNavigate } from 'react-router-dom'
import PostAction from '../../components/postAction/PostAction'
const Home = () => {

  const {postList} = useSelector(state => state.post); 
  const {user} = useSelector(state => state.user); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const getPosts = async()=>{
    try {
      dispatch(getPostList()); 
    } catch (error) {
      
    }
  }

  
  useEffect(()=>{
    getPosts(); 
  },[])


  if(user === null){
    navigate('/auth')
    return;
  }
  return (
    <div className='home-container'>
        <div className="home-main">
            <div className="left">
             <PostAction/>
              <div className='post-list'>
                  {
                    postList && postList.map((item,index)=>{
                      return (
                        <Post key={item._id} item = {item}/>
                      )
                    })
                  }
              </div>

            </div>
            <div className="right">
                    
                <Recommend/>
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