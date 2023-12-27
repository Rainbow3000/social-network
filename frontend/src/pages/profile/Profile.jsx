import React, { useEffect, useState } from 'react'
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
import { BsPencil } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCloudUploadOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosRadio } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FiRadio } from "react-icons/fi";
import { PiMessengerLogoBold } from "react-icons/pi";
import { GiShadowFollower } from "react-icons/gi";
import {GenderEnum} from '../../enums/Enum'
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import {updateUserInfo} from '../../store/slice/userSlice'
import uuid from 'react-uuid';
import {Link} from 'react-router-dom'

const Profile = () => {
    const dispatch = useDispatch(); 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const userId = location.pathname.split('/')[2]; 
    const {userInfo} = useSelector(state => state.user); 
    const {postOfUser} = useSelector(state => state.post); 

    const handleChooseImage = (event)=>{
            const file = event.target.files[0]; 
              const fileName =  `images/${uuid()}-${file.name}`; 
              const storageRef = refStorage(storage,fileName); 
              uploadBytes(storageRef,file).then((snapshot)=>{
                  getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{     
                    const userData = {...userInfo,avatar:`${downloadUrl}@-@${fileName}`};
                    dispatch(updateUserInfo({userId,userData}));
                  })
            })
    }

    const handleChooseCoverImage = (event)=>{
        const file = event.target.files[0]; 
          const fileName =  `images/${uuid()}-${file.name}`; 
          const storageRef = refStorage(storage,fileName); 
          uploadBytes(storageRef,file).then((snapshot)=>{
              getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{     
                const userData = {...userInfo,coverAvatar:`${downloadUrl}@-@${fileName}`};
                dispatch(updateUserInfo({userId,userData}));
              })
        })
}
    

    useEffect(()=>{
        // if(userId === "un-auth"){
        //     navigate('/profile/me/un-auth');
        //     return; 
        // }
        dispatch(getUserInfo(userId)); 
        dispatch(getPostByUser(userId));
    },[])

  return (
    <div className='profile-container'>
        <div className="profile-top">
            <div className='profile-info-user'>
                {
                    userInfo?.coverAvatar !== undefined && userInfo?.coverAvatar !== null && (
                        <img className='img-cover' src = {userInfo?.coverAvatar} alt="" />
                    )
                }

                {
                    (userInfo?.coverAvatar === undefined  || userInfo?.coverAvatar === null) && (
                     
                        <div className='img-cover-no-img' src = {userInfo?.coverAvatar} alt=""></div>
                    )
                }

                <div className='user-info'>
                    <input type="file" id='avatar-update' onChange={handleChooseImage}/>
                    <label htmlFor='avatar-update' className='upload-icon' ><IoCloudUploadOutline/></label>
                    <img src={userInfo?.avatar} alt="" />
                    <span className='user-name'>{userInfo?._id?.userName}</span>
                    <span>{userInfo?.career}</span>
                </div>
                <div className='profile-btn-list'>
                    <button><FaPlus/> &nbsp; Kết bạn</button>
                    <button><PiMessengerLogoBold/> &nbsp; Nhắn tin</button>
                    <button><FiRadio/>&nbsp; Theo dõi</button>
                    <span><HiDotsHorizontal/></span>
                </div>
                <input type="file" id='cover-avatar-update' onChange={handleChooseCoverImage} />
                <label htmlFor='cover-avatar-update' className='edit-cover-photo'>
                    <IoCloudUploadOutline/>
                    &nbsp;
                    <span>Cập nhật ảnh bìa</span>
                </label>
            </div>

        </div>
        <div className="profile-center">

            <div className='profile-intro'>
                
                <ul>
                    <li>Giới thiệu</li>
                    <li><BsGenderAmbiguous/> &nbsp;&nbsp;{GenderEnum[userInfo?.gender]}</li>
                    <li><LiaBirthdayCakeSolid/>&nbsp;&nbsp;{userInfo?.dob}</li>
                    <li><IoLocationOutline/>&nbsp;&nbsp;{userInfo?.address !== null && userInfo?.address !== undefined ? userInfo?.address :'Chưa cập nhật'}</li>
                    <li><RiFacebookBoxLine/>&nbsp;&nbsp;{userInfo?.facebookLink !== null && userInfo?.facebookLink !== undefined ? userInfo?.facebookLink :'Chưa cập nhật'}</li>
                    <li><FiTwitter/>&nbsp;&nbsp;{userInfo?.twitterLink !== null && userInfo?.twitterLink !== undefined ? userInfo?.twitterLink :'Chưa cập nhật'}</li>
                    <li><FaInstagram/>&nbsp;&nbsp;{userInfo?.instagramLink !== null && userInfo?.instagramLink !== undefined ? userInfo?.instagramLink :'Chưa cập nhật'}</li>
                    <li><IoIosRadio/>&nbsp;&nbsp;{userInfo?.followers?.length} Người theo dõi</li>
                    <li><GiShadowFollower/>&nbsp;&nbsp;{userInfo?.followings?.length} Đang theo dõi</li>
                    <li>
                        <div className='btn-update'>
                            <Link to="/setting" className='link'>
                                <span>Cập nhật thông tin</span>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>

            <div className='profile-post'>
                <div className='post-list'>
                    { <div className="profile-center-bottom">
                        {
                            postOfUser?.length > 0 && postOfUser.map(item=>{
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