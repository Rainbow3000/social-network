import React, { useEffect, useRef, useState } from 'react'
import './postActionAdmin.scss'
import { IoCloseSharp } from "react-icons/io5";
import {hiddenShowCreatePost} from '../../store/slice/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import { IoMdImages } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import uuid from 'react-uuid';
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {createPost,setValueSuccess,resetPostSuccess} from '../../store/slice/postSlice'
import { validateEmpty } from '../../helper/validateHelper';
import { FaCloudUploadAlt } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { toast } from 'react-toastify';
let flag = 0;
const PostAction = () => {
  const [emojiShow, setEmojiShow] = useState(false);
  const [images,setImages] = useState([]); 
  const [video,setVideo] = useState(""); 
  const [content,setContent] = useState(""); 
  const dispacth = useDispatch(); 
  const {isSuccess,postSuccessMessage} = useSelector(state => state.post); 
  const inputRef = useRef(null); 
  const {user} = useSelector(state => state.user)
  const [contentErr,setContentErr] = useState(""); 
  const [mediaErr,setMediaErr] = useState(""); 
  const [thumb,setThumb] = useState("");

  const handleCloseCreatePost = ()=>{
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

const handleChooseImageForVideo = (event)=>{
  const file = event.target.files[0]; 
    const fileName =  `images/${uuid()}-${file.name}`; 
    const storageRef = refStorage(storage,fileName); 
    uploadBytes(storageRef,file).then((snapshot)=>{
        getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
          setThumb(`${downloadUrl}@-@${fileName}`)       
        })
    })
}


const onEmojiClick = (object) => {
  setContent(content + object.emoji);
  setContentErr(""); 
};



const handleSubmitForm = (e)=>{
  e.preventDefault(); 


  if(video.trim() === "" && images.length  === 0 && validateEmpty(content)){
    setContentErr('Vui lòng nhập nội dung cho bài viết')
    flag = 1;
  }

  if(flag === 1){
    flag = 0
    return; 
  }

  const post = {
    content,
    images,
    video,
    thumb,
    user: JSON.parse(localStorage.getItem('user'))?.data?._id
  }
  dispacth(createPost(post)); 
  handleCloseCreatePost(); 
  setContent("");
  setVideo("");
  setImages([]);
  setEmojiShow(false)
}

if(isSuccess){
  toast.success(postSuccessMessage); 
  dispacth(resetPostSuccess());
}


useEffect(()=>{
  inputRef?.current?.focus();
},[])

return (
  <form className='post-create' onSubmit={handleSubmitForm}>
  <span className='text-error content'>{contentErr}</span>
  <div className='user-input'>
    <div className='user-avatar'>
      <img src={user?.data?.avatar} alt="" />
    </div>
    <input value={content} placeholder='Nội dung bài viết của bạn ...' type="text" onChange={(e)=>{
      setContent(e.target.value)
      setContentErr("")
      setMediaErr("")
      }}/>
    <input style={{display:'none'}} type="file" id='post-file' multiple onChange={handleChooseImage}/>
  </div>
  <div className="form-preview">
        {
          video.trim() !== "" && (
            <div className='video-preview'> 
                <video width="100%" height="100%" controls>
                    <source src={`${video}`} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <input type="file" id='image-for-video' onChange={handleChooseImageForVideo} />
                <div className='img-preview'> 
                {
                  thumb !== "" && (
                  <div  className="img-item">
                    <IoCloseSharp className='close-img-icon'/>
                    <img src={thumb} alt="" />
                  </div>
                  )
                }
          
            </div>
              <div className='btn-upload'>
                  <label htmlFor="image-for-video">
                      <FaCloudUploadAlt/>
                      &nbsp;
                      <span>Chọn ảnh xem trước cho video</span>
                  </label>
              </div>
            </div>
          )
        }



        <div className='img-preview' style={{margin:20}}> 
          {images && images.map((imageUrl,index)=>{
            return (
              <div key={index} className="img-item" style={{position:'relative',width:'max-content'}}>
                <IoCloseSharp style={{position:'absolute',right:5,top:5,color:'#FFFFFF',cursor:'pointer'}} className='close-img-icon'/>
                <img width={200} height={200} src={`${imageUrl}`} alt="" style={{borderRadius:5}} />
              </div>
            )
          })}
        </div>
      </div>

  <div className='post-media'>   
      {emojiShow && (
              <div style={{cursor:'pointer'}} className="emoji">
                <EmojiPicker theme='light' onEmojiClick={onEmojiClick} />
              </div>
            )}
    <div className='media-action'>
      <span className='text-error media'>{mediaErr}</span>
      <ul style={{listStyle:'none',marginLeft:30}}>
        <li style={{cursor:'pointer'}}><label htmlFor="post-file"><IoMdImages style={{cursor:'pointer'}}/>&nbsp; Ảnh/Video</label></li>
        <li style={{cursor:'pointer'}}><FaRegFaceSmile  onClick={() => setEmojiShow(!emojiShow)}
          />&nbsp; Cảm xúc</li>
      </ul>            
    </div>             
    <button style={{marginLeft:'60px'}} className="btn btn-success" type='submit'>Đăng</button>
  </div>
</form>

  )
}

export default PostAction