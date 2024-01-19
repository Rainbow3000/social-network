import React,{useEffect, useState} from 'react'
import './editProfile.scss'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import {updateUserInfo,getUserInfo,resetUserSuccess} from '../../store/slice/userSlice'
import { useNavigate } from 'react-router-dom';
import {toggleOverlay} from '../../store/slice/appSlice'
import { ToastContainer, toast } from 'react-toastify';
const EditProfile = () => {

    const [userName,setUserName] = useState(""); 
    const [avatar,setAvatar] = useState(""); 
    const [avatarPreview,setAvatarPreview] = useState(""); 
    const [gender,setGender] = useState(""); 
    const [dob,setDob] = useState(""); 
    const [address,setAddress] = useState(""); 
    const [career,setCareer] = useState(""); 
    const [phoneNumber,setPhoneNumber] = useState(""); 
    const [facebookLink,setFacebookLink] = useState(""); 
    const [twitterLink,setTwitterLink] = useState(""); 
    const [instagramLink,setInstagramLink] = useState(""); 
    const [linkedInLink,setLinkedInLink] = useState(""); 

    const {user,userInfo,isSuccess,successMessage} = useSelector(state => state.user); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    const handleChooseImage = (event)=>{
        const file = event.target.files[0]; 
              const fileName =  `images/${uuid()}-${file.name}`; 
              const storageRef = refStorage(storage,fileName); 
              uploadBytes(storageRef,file).then((snapshot)=>{
                  getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
                    setAvatar(`${downloadUrl}@-@${fileName}`)    
                    setAvatarPreview(`${downloadUrl}@-@${fileName}`)              
                  })
              })
    }

    const handleSubmitForm = (e)=>{
        e.preventDefault(); 
        dispatch(toggleOverlay(true))
        const data = {
            userName,
            avatar,
            gender,
            dob,
            address,
            career,
            phoneNumber,
            facebookLink,
            twitterLink,
            instagramLink,
            linkedInLink
        }
        dispatch(updateUserInfo({userData:data,userId:user?.data._id})) 
        setAvatarPreview("");
         
    }

    if(isSuccess){
        toast.success(successMessage); 
        dispatch(resetUserSuccess()); 
    }

    useEffect(()=>{
        dispatch(toggleOverlay(false)); 
    },[userInfo])

    useEffect(()=>{
        dispatch(getUserInfo(user?.data._id));
    },[])

    useEffect(()=>{
        setUserName(userInfo?._id?.userName);
        setPhoneNumber(userInfo?.phoneNumber);
        setGender(userInfo?.gender);
        setDob(userInfo?.dob)
        setCareer(userInfo?.career)
        setAddress(userInfo?.address)
        setFacebookLink(userInfo?.facebookLink)
        setTwitterLink(userInfo?.twitterLink)
        setInstagramLink(userInfo?.instagramLink)
        setLinkedInLink(userInfo?.linkedInLink)
        setAvatar(userInfo?.avatar)
    },[userInfo])


  return (
    <div className='edit-profile-container'>
        {/* <ToastContainer style={{marginTop:60}}/> */}
        <form onSubmit={handleSubmitForm}>
            
                <div className='input-item'>
                    <h5 style={{marginLeft:28}}>Thông tin cơ bản</h5><br/>
                </div>
            <div className='image-upload'>
                <div style={{width:'max-content'}}>
                <img src={user?.data?.avatar} alt="" />

                </div>
                <input id='file-upload' type="file" onChange={handleChooseImage} />
                <div className='upload-icon'>
                    <label htmlFor="file-upload"><IoCloudUploadOutline/></label>
                </div>
                {
                    avatarPreview.trim() !== "" && (
                        <div className='preview-avatar'>
                            <img width={180} height={180} src={avatarPreview} alt="" />
                        </div>
                    )
                }
                 
            </div>
            <div className='input-list-wrapper'>



                <div className='input-item'>
                    <label htmlFor="">Email</label>
                    <input disabled value={user.data.email} type="email"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Tên hiển thị</label>
                    <input value={userName} type="text" onChange={(e)=>setUserName(e.target.value)}/>
                </div>
               
                <div className='input-item'>
                    <button type="submit" className='btn btn-success'>Cập nhật</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditProfile