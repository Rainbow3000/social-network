import React, { useEffect } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoPersonAddOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { MdOutlineCloudUpload } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import './profile.scss'
import Post from '../../components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
import {getUserInfo} from '../../store/slice/userSlice'
import { useLocation, useNavigate } from 'react-router-dom';
import {getPostByUser,getPostList} from '../../store/slice/postSlice'
import { BsGenderAmbiguous } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { RiFacebookBoxLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import Recommend from '../../components/recommend/Recommend';
const Profile = () => {
    const dispatch = useDispatch(); 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const userId = location.pathname.split('/')[2]; 
    const {userInfo} = useSelector(state => state.user); 
    const {postOfUser,postList} = useSelector(state => state.post); 
    
    useEffect(()=>{
        // if(userId === "un-auth"){
        //     navigate('/profile/me/un-auth');
        //     return; 
        // }
        dispatch(getUserInfo(userId)); 
        dispatch(getPostByUser(userId));
    },[])

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
    <div className='profile-container'>
        <div className="profile-top">
            <div className='profile-info-user'>
                <img className='img-cover' src="https://images.unsplash.com/photo-1486911278844-a81c5267e227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80" alt="" />
                <div className='user-info'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD73TSl-2tkJKbEJ1X8kkc6YHeUmRglKmNzA&usqp=CAU" alt="" />
                    <span className='user-name'>Elon Mark</span>
                    <span>Nhà thiết kế thời trang</span>
                </div>

                <div className='edit-cover-photo'>
                    <MdOutlineCloudUpload/>
                    &nbsp;
                    <span>Cập nhật ảnh bìa</span>
                </div>
            </div>

        </div>
        <div className="profile-center">

            <div className='profile-intro'>
                
                <ul>
                    <li>Giới thiệu</li>
                    <li><BsGenderAmbiguous/> &nbsp;&nbsp;Male</li>
                    <li><LiaBirthdayCakeSolid/>&nbsp;&nbsp;20-11-2023</li>
                    <li><IoLocationOutline/>&nbsp;&nbsp;Hà Nội</li>
                    <li><RiFacebookBoxLine/>&nbsp;&nbsp;Facebook.com</li>
                    <li><FiTwitter/>&nbsp;&nbsp;Twitter.com</li>
                    <li><FaInstagram/>&nbsp;&nbsp;Instagram.com</li>
                    <li>21,888 Người theo dõi</li>
                    <li>123 Đang theo dõi</li>
                    <li>
                        <div className='btn-update'>
                            <span>Cập nhật</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className='profile-post'>
                <div className='post-list'>
                    { <div className="profile-center-bottom">
                        {
                            postList?.length > 0 && postList.map(item=>{
                                return (
                                    <Post item= {item}/>
                                )
                            })
                        }
                    
                    </div> }
                </div>
                <div className='recommend'>
                    <Recommend/>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Profile