import React, { useEffect, useRef, useState } from 'react'
import './postAction.scss'
import { IoCloseSharp } from "react-icons/io5";
import {hiddenOverlay} from '../../store/slice/appSlice'
import {hiddenShowCreatePost} from '../../store/slice/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import { IoMdImages } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import uuid from 'react-uuid';
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {createPost} from '../../store/slice/postSlice'
import { validateEmpty } from '../../helper/validateHelper';

let flag = 0;
const PostAction = () => {
  const [images,setImages] = useState([]); 
  const [video,setVideo] = useState(""); 
  const [content,setContent] = useState(""); 
  const dispacth = useDispatch(); 
  const {isSuccess} = useSelector(state => state.post); 
  const inputRef = useRef(null); 

  const [contentErr,setContentErr] = useState(""); 
  const [mediaErr,setMediaErr] = useState(""); 

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

  if(validateEmpty(content)){
    setContentErr('Vui lòng nhập nội dung cho bài viết')
    flag = 1;
  }

  if(video.trim() === "" && images.length  === 0){
    setMediaErr("Vui lòng chọn ảnh hoặc video cho bài viết")
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
    user: JSON.parse(localStorage.getItem('user'))?.data?._id
  }
  dispacth(createPost(post)); 
  handleCloseCreatePost(); 
  setContent("");
  setVideo("");
  setImages([]);
}

useEffect(()=>{
  inputRef?.current?.focus();
},[])

return (
  <form className='post-create' onSubmit={handleSubmitForm}>
  <span className='text-error content'>{contentErr}</span>
  <div className='user-input'>
    <img src="https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_778" alt="" />
    <input value={content} placeholder='Nội dung bài viết của bạn ...' type="text" onChange={(e)=>{
      setContent(e.target.value)
      setContentErr("")
      setMediaErr("")
      }}/>
    <input type="file" id='post-file' multiple onChange={handleChooseImage}/>
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

  <div className='post-media'>
    <div className='media-action'>
      <span className='text-error media'>{mediaErr}</span>
      <ul>
        <li><label htmlFor="post-file"><IoMdImages/>&nbsp; Ảnh/Video</label></li>
        <li><FaRegFaceSmile/>&nbsp; Biểu tượng</li>
      </ul>            
    </div>             
    <button type='submit'>Đăng</button>
  </div>
</form>

  )
}

export default PostAction