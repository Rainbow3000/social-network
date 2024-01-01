import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GrLike } from "react-icons/gr";
import { FaRegCommentDots } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import {updatePostByOtherUser} from '../../store/slice/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import Comment from '../comment/Comment';
import './post.scss'
import uuid from 'react-uuid';
import storage from '../../firebase'; 
import {ref as refStorage,uploadBytes, getDownloadURL} from 'firebase/storage'
import {createComment} from '../../store/slice/postSlice'
import { CiImageOn } from "react-icons/ci";
import { VscSmiley } from "react-icons/vsc";
import {getCommentByPost} from '../../store/slice/postSlice'
import { LuHeartCrack } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import { RiSendPlane2Line } from "react-icons/ri";

import moment from 'moment/dist/moment';
import 'moment/dist/locale/vi'
moment.locale('vi');


const Post = ({item}) => {
  const [isLike,setIsLike] = useState(false)
  const [likeNumber,setLikeNumber] = useState(item?.like?.number);
  const [content,setContent] = useState(""); 
  const [image,setImage] = useState(""); 
  const [video,setVideo] = useState(""); 
  const [parent,setParent] = useState(null); 
  const [indexChildShow,setIndexChildShow] = useState([]); 
  const [isShowActionActive,setIsShowActionActive] = useState(false); 
  const [parentName,setParentName] = useState('')
  const [level,setLevel] = useState(0); 
  const dispatch = useDispatch(); 
  const {user}= useSelector(state => state.user); 
  const inputRef = useRef(); 
  const videoRef = useRef();
  const handleLikePost = (postId)=>{
    if(isLike === false){
        setLikeNumber(item?.like?.number + 1)
        setIsLike(!isLike)
    }else {
        setLikeNumber(likeNumber - 1)
        setIsLike(!isLike)
    }
    const userId = JSON.parse(localStorage.getItem('user'))?.data?._id; 
    dispatch(updatePostByOtherUser({postId,userId})); 
  }
  const handleChooseImage = (event)=>{
        const file = event.target.files[0]; 
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
                setImage(`${downloadUrl}@-@${fileName}`)       
              })
          })
        }
    }


  

const handleSubmitForm = (e)=>{
    e.preventDefault(); 
    const comment = {
        content : content.includes('@') === true ? content.split(' ').slice(1).join(' ') : content,
        parent,
        video,
        image,
        user: JSON.parse(localStorage.getItem('user'))?.data?._id,
        post: item._id,
        level,
        parentName
    }
    dispatch(createComment(comment)); 
    setContent("");
    setVideo("");
    setImage("");
    setParent(null); 
}

const handleSetReplyComment = (userName,parent,level)=>{
    setContent(`@${userName}`);
    setParent(parent); 
    setLevel(level);
    setParentName(userName);
    inputRef.current.focus();
}

const handleGetCommentByPost = (postId)=>{
    dispatch(getCommentByPost(postId))
}

// const handleShowCommentChild = (index)=>{
//     if(indexChildShow.indexOf(index) === -1){
//         setIndexChildShow(indexChild => [...indexChild,index]); 
//         return; 
//     }
//     const newIndexChild = indexChildShow.filter(item => item !== index); 
//     setIndexChildShow(newIndexChild); 
// }


  return (
    <div className='post-container'>
        <div className="post-top">
            <img src={item?.user?.avatar} alt="" />
             <ul>
                <li>{item?.user?._id?.userName}</li>
                <li>{moment(item?.createdDate).calendar()}</li>
             </ul>
             <ul>
                
             </ul>
             <span className='post-follow'>Theo dõi</span>
             {
                 user?.data._id === item?.user?._id?._id && (
                     <HiOutlineDotsHorizontal className='post-action' onClick={()=>setIsShowActionActive(active => !active)}/>
                     )
                    }
             <HiOutlineDotsHorizontal className='post-action' onClick={()=>setIsShowActionActive(active => !active)}/>

            <div className={ isShowActionActive === true ? 'post-action-item-wrapper':'post-action-item-wrapper'}>            
                    <span>Ẩn bài viết</span>
                    <span>Xóa bài viết</span>
                    <span>Chỉnh sửa đối tượng xem </span>             
            </div>
        </div>
        <div className='post-content'>
            {item?.content}
        </div>
        <div className="post-center">
            {
                item?.images.length === 1 && (
                <div className='post-img-single'>
                    <img src={item?.images[0]} alt="" />
                </div>
                )
            }

            {
                item?.images.length > 1 && (
                    <div className='post-img-list'>
                        {
                            item.images?.map(item =>{
                                return (
                                    <img src={item} alt="" />
                                )
                            })
                        }
        
                    </div>
                )
            }

            {
                    item?.images?.length === 0  && (
                        <div className='post-video'>
                            <video width="100%" height="100%" controls ref={videoRef} poster={item.thumb} >
                                <source src={item.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                

                
            }

            {
                 (item?.thumb === undefined || item?.thumb === null || item.thumb === "") && (
                    item?.images?.length === 0  && (
                        <div className='post-video'>
                            <video width="100%" height="100%" controls ref={videoRef} >
                                <source src={item.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                )
            }



            <ul className='post-center-action'>
                <li onClick={()=>handleLikePost(item?._id)}><LuHeartCrack/>&nbsp;Thích&nbsp;( {likeNumber} )</li>
                <li className='post-comment' onClick={()=> handleGetCommentByPost(item?._id)}><FaRegCommentDots/>&nbsp;Bình Luận&nbsp;( {item?.comment?.number} )</li>
                <li><CiShare2/>&nbsp;Chia sẻ&nbsp;( {item?.share?.number} )</li>
            </ul>
        </div>
        <div className="post-bottom">

            <div className='post-comment-list'>
                {
                    item?.commentList?.length > 0 && item?.commentList.map((comment,index)=>{
                        return (
                            <>
                            {
                                comment.parent === null && (
                                    <>
                                    <Comment level={0} key={index}   index = {index} handleSetReplyComment = {handleSetReplyComment} comment =  {comment}/>
                                    <div className='child-comment'>
                                        {
                                            comment?.children?.length > 0 && comment?.children.map((child,index) =>{
                                                if(typeof child !== 'string'){
                                                    return (                                               
                                                        <Comment level={1} key={index}  index = {index}  handleSetReplyComment = {handleSetReplyComment} comment = {child}/>   
                                                        )
                                                }
                                            })
                                        }
                                    </div>          
                                    </>
                                )
                            }
                            </>
                    
                        )
                    })
                }
                {
                    item?.commentList?.length > 0 && (
                    <div className='more-comment'>
                        <span>Xem các bình luận trước</span>
                    </div>
                    )
                }
                
            </div>
            {
                image.trim() !== "" && (
                    <div className='preview-img'>
                        <img src={image} alt="" />
                    </div>
                )            
            }
            {
                 video.trim() !== "" && (
                    <div className='video-preview'> 
                        <video width="30%" height="30%" controls>
                            <source src={`${video}`} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                  )
            }
            <div className='post-user-input'>
                <img src={user.data?.avatar} alt="" />
                <form  onSubmit={handleSubmitForm}>
                    <input value={content} type="text" ref={inputRef} placeholder='Viết bình luận của bạn ...' onChange={(e)=>setContent(e.target.value)} />
                    <label htmlFor="" className='post-input icon'>
                        <VscSmiley/>
                    </label>
                    <label className='post-input image' htmlFor="input-file"><CiImageOn/></label>
                    <input type="file" id='input-file' onChange={handleChooseImage} />
                </form>
                <div className='send-icon'>
                    <RiSendPlane2Line/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post