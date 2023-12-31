import React, { useEffect, useState } from 'react'
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import './profile.scss'
import Post from '../../components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
import {getUserInfo} from '../../store/slice/userSlice'
import { useLocation, useNavigate } from 'react-router-dom';
import {getPostByUser,} from '../../store/slice/postSlice'
import { BsGenderAmbiguous } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { RiFacebookBoxLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import Recommend from '../../components/recommend/Recommend';
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
import {userAddFriend,userCancelAddFriend,userAcceptAddFriend} from '../../store/slice/userSlice'
import { LuPenSquare } from "react-icons/lu";
import { MdClear } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";

const Profile = () => {
    const dispatch = useDispatch(); 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const userId = location.pathname.split('/')[2]; 
    const ownUserId = JSON.parse(localStorage.getItem('user')).data._id;
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

    const handleAddFriend = ()=>{
        const userData = {
            userId
        }
        const id = ownUserId; 
        dispatch(userAddFriend({userData,id}))
    }

    const handleAcceptAddFriend = ()=>{
        const userData = {
            userId:ownUserId,
        }
        dispatch(userAcceptAddFriend({userData,id:userId}))
    }


    const handleCancelAddFriend = ()=>{
        const userData = {
            userId
        }
        const id = ownUserId; 
        dispatch(userCancelAddFriend({userData,id})) 
    }

    const handleCancelAddFriendFromUserRequested = ()=>{
        const userData = {
            userId:ownUserId,
            type:2
        }
        dispatch(userCancelAddFriend({userData,id:userId})) 
    }
    

    useEffect(()=>{
        dispatch(getUserInfo(userId)); 
        dispatch(getPostByUser(userId));
    },[userId])

 
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
                {
                    userId !== ownUserId && (


                        <div className='profile-btn-list'>

                                    {
                                        userInfo?.friends?.find(item => item === ownUserId) !== undefined && (
                                            <button className='primary-btn' ><LiaUserFriendsSolid/> &nbsp; Bạn bè</button>
                                        )
                                    }


                                    {
                                        userInfo?.requestAddFriendFromUser?.find(item => item === ownUserId) === undefined &&  userInfo?.requestAddFriend?.find(item => item === ownUserId) === undefined &&
                                        
                                        userInfo?.friends?.find(item => item === userId) === undefined && userInfo?.friends?.find(item => item === ownUserId) === undefined && (
                                            <button className='primary-btn' onClick={handleAddFriend}><FaPlus/> &nbsp; Kết bạn</button>
                                        )                                    
                                    }
                                 
                           
                                    {
                                        userInfo?.requestAddFriendFromUser?.find(item => item === ownUserId) !== undefined && (
                                            <button onClick={handleCancelAddFriend}><MdClear/> &nbsp; Hủy lời mời kết bạn</button>
                                        )
                                    }
                         
                                      {
                                        userInfo?.requestAddFriend?.find(item => item === ownUserId) !== undefined && (
                                        <>
                                            <span>Đã gửi cho bạn lời mời kết bạn &nbsp;&nbsp;&nbsp;</span>
                                            <button className='primary-btn' onClick={handleAcceptAddFriend}><FaPlus/> &nbsp; Chấp nhận yêu cầu</ button>
                                            <button onClick={handleCancelAddFriendFromUserRequested}><MdClear/> &nbsp; Bỏ qua</button>
                                            <div className='hr'></div>
                                        </>
                                        )
                                      }
                                         



                            <button><PiMessengerLogoBold/> &nbsp; Nhắn tin</button>
                            <button><FiRadio/>&nbsp; Theo dõi</button>
                            <span><HiDotsHorizontal/></span>
                        </div>
                    )
                }

                {
                    userId === JSON.parse(localStorage.getItem('user'))?.data._id && (
                        <div className='profile-btn-list'>
                            <Link to="/setting" className='link'>   
                                <button><LuPenSquare/> &nbsp; Cập nhật thông tin</button>
                            </Link>
                        </div>

                    )
                }


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