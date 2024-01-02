import React,{useState} from 'react'
import './editProfile.scss'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'


const EditProfile = () => {

    const [userName,setUserName] = useState(""); 
    const [avatar,setAvatar] = useState(""); 
    const [gender,setGender] = useState(""); 
    const [dob,setDob] = useState(""); 
    const [address,setAddress] = useState(""); 
    const [career,setCareer] = useState(""); 
    const [phoneNumber,setPhoneNumber] = useState(""); 
    const [facebookLink,setFacebookLink] = useState(""); 
    const [twitterLink,setTwitterLink] = useState(""); 
    const [instagramLink,setInstagramLink] = useState(""); 
    const [linkedInLink,setLinkedInLink] = useState(""); 

    const {user} = useSelector(state => state.user); 


    const handleChooseImage = (event)=>{
        const file = event.target.files[0]; 
              const fileName =  `images/${uuid()}-${file.name}`; 
              const storageRef = refStorage(storage,fileName); 
              uploadBytes(storageRef,file).then((snapshot)=>{
                  getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
                    setAvatar(`${downloadUrl}@-@${fileName}`)       
                  })
              })
    }


  return (
    <div className='edit-profile-container'>
        <form>
            <div className='image-upload'>
                <img src={user?.data?.avatar} alt="" />
                <input id='file-upload' type="file" onChange={handleChooseImage} />
                <div className='upload-icon'>
                    <label htmlFor="file-upload"><IoCloudUploadOutline/></label>
                </div>
                {
                    avatar.trim() !== "" && (
                        <div className='preview-avatar'>
                            <img width={180} height={180} src={avatar} alt="" />
                        </div>
                    )
                }
            </div>
            <div className='input-list-wrapper'>
                <div className='input-item'>
                    <label htmlFor="">Họ tên</label>
                    <input value={userName} type="text" onChange={(e)=>setUserName(e.target.value)}/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Số điện thoại</label>
                    <input value={phoneNumber} type="text" onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Ngày sinh</label>
                    <input value={dob} onChange={e => setDob(e.target.value)} type="date" />
                   
                </div>

                <div className='input-item'>
                    <label htmlFor="">Giới tính</label>
                    <div className='gender-wrapper'>
                        <div className='gender-item'>
                            <input checked  onChange={e => setGender(e.target.value)} type="radio" value="Nam" name="gender"  />
                            <label htmlFor="">Nam</label>
                        </div>

                        <div className='gender-item'>
                            <input onChange={e => setGender(e.target.value)} type="radio" value="Nữ" name="gender"  />
                            <label htmlFor="">Nữ</label>
                        </div>
                        <div className='gender-item'>    
                            <input onChange={e => setGender(e.target.value)} type="radio" value="Khác" name="gender"  />
                            <label htmlFor="">Khác</label>
                        </div>
                    </div>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Nơi sống</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Nghề nghiệp</label>
                    <input value={career} onChange={e => setCareer(e.target.value)} type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Facebook</label>
                    <input value={facebookLink} onChange={e => setFacebookLink(e.target.value)} type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Twitter</label>
                    <input value={twitterLink} onChange={e => setTwitterLink(e.target.value)} type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">Instagram</label>
                    <input value={instagramLink} onChange={e => setInstagramLink(e.target.value)} type="text"/>
                </div>

                <div className='input-item'>
                    <label htmlFor="">LinkedIn</label>
                    <input value={linkedInLink} onChange={e => setLinkedInLink(e.target.value)} type="text"/>
                </div>
                
                <div className='input-item'>
                    <button className='btn-update'>Cập nhật</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditProfile