import React, { useEffect, useRef, useState } from 'react'
import './postAction.scss'
import { IoCloseSharp } from "react-icons/io5";
import {hiddenOverlay} from '../../store/slice/appSlice'
import {hiddenShowCreatePost} from '../../store/slice/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import uuid from 'react-uuid';
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {createPost} from '../../store/slice/postSlice'
const PostAction = () => {
  const [images,setImages] = useState([]); 
  const [video,setVideo] = useState(""); 
  const [content,setContent] = useState(""); 
  const dispacth = useDispatch(); 
  const {isSuccess} = useSelector(state => state.post); 
  const inputRef = useRef(null); 

  const handleCloseCreatePost = ()=>{
    dispacth(hiddenOverlay()); 
    dispacth(hiddenShowCreatePost()); 
  }
  const handleChooseImage = (event)=>{
    const files = event.target.files; 
    for(let file of files){
        const fileNameExtension = file.name?.split('.')[1]; 
        if(fileNameExtension === "mp4"){
          const fileName =  `videos/${uuid()}-${file.name}`; 
          const storageRef = refStorage(storage,fileName); 
          uploadBytes(storageRef,file).then((snapshot)=>{
              getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
                  setVideo(downloadUrl)             
              })
          })
        }else{
          const fileName =  `images/${uuid()}-${file.name}`; 
          const storageRef = refStorage(storage,fileName); 
          uploadBytes(storageRef,file).then((snapshot)=>{
              getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
                console.log(downloadUrl);  
                setImages(image=>[...image,`${downloadUrl}@-@${fileName}`])       
              })
          })
        }
    }

}

const handleSubmitForm = (e)=>{
  e.preventDefault(); 
  const post = {
    content,
    images,
    video,
    user: JSON.parse(localStorage.getItem('user'))?.data?._id
  }
  dispacth(createPost(post)); 
  handleCloseCreatePost(); 
}

useEffect(()=>{
  inputRef?.current?.focus();
},[])

return (
  <form className='post-form-create' onSubmit={handleSubmitForm}> 
      <IoCloseSharp className='close-form-item' onClick={handleCloseCreatePost}/>
      <span className='form-title'>Tạo bài viết</span>
      <div className='input-item'>
          <label htmlFor="">Nội dung bài viết</label>
          <input ref={inputRef} tabIndex={0} type="text" onChange={(e)=>setContent(e.target.value)}/>
      </div>
      
      <div className='input-item'>
          <label className='lable-file' htmlFor="input-file">
            Chọn ảnh/video
            <MdOutlineAddPhotoAlternate className='add-file-img'/>
          </label>
          <input style={{display:'none'}} id='input-file' type="file" multiple onChange={handleChooseImage} />
      </div>
      <div className="form-preview">
        {
          video.trim() !== "" && (
            <div className='video-preview'> 
                <video width="100%" height="100%" controls>
                    <source src={`${video}`} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
          )
        }
        <div className='img-preview'> 
        {images && images.map((imageUrl,index)=>{
          return (
            <div key={index} className="img-item">
              <IoCloseSharp className='close-img-icon'/>
              <img src={`${imageUrl}`} alt="" />
            </div>
          )
        })}
        </div>
      </div>
      <div className='post-create-btn'>
        <button type='submit' className='form-create-btn'>Hoàn tất</button>
      </div>
  </form>
  )
}

export default PostAction