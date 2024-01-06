import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GrLike } from "react-icons/gr";
import { FaRegCommentDots, FaSlack } from "react-icons/fa";
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
import {getCommentByPost,getPostByUser,updateStatusPost,deletePost} from '../../store/slice/postSlice'
import { RiSendPlane2Line } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import moment from 'moment/dist/moment';
import 'moment/dist/locale/vi'
moment.locale('vi');


const Post = ({item,userIdProfile}) => {
  const [likeNumber,setLikeNumber] = useState(item?.like?.number);
  const [shareNumber,setShareNumber] = useState(item?.share?.number);
  const [content,setContent] = useState(""); 
  const [image,setImage] = useState(""); 
  const [video,setVideo] = useState(""); 
  const [parent,setParent] = useState(null); 
  const [indexChildShow,setIndexChildShow] = useState([]); 
  const [isShowActionActive,setIsShowActionActive] = useState(false); 
  const [emojiShow, setEmojiShow] = useState(false);
  const [parentName,setParentName] = useState('')
  const [level,setLevel] = useState(0); 
  const dispatch = useDispatch(); 
  const {user}= useSelector(state => state.user); 
  const inputRef = useRef(); 
  const videoRef = useRef();
  const [userShare,setUserShare] = useState(null); 

  const handleLikePost = (postId,type)=>{
    const userId = user.data._id 

    if(type === 'SHARE'){
        dispatch(updatePostByOtherUser({postId,userId,type:1,isShare:true})); 
        return; 
    }

    dispatch(updatePostByOtherUser({postId,userId,type:1,isShare:false})); 
  }

  const handleSharePost = (postId)=>{
    setShareNumber(item?.share?.number + 1); 
    const userId = user.data._id 
    dispatch(updatePostByOtherUser({postId,userId,type:2})); 
  }


  const onEmojiClick = (object) => {
    let text = content + object.emoji;
    setContent(text);
  };


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
    setEmojiShow(false)
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

const handleHiddenSharePost = ()=>{

}

const handleDeleteSharePost = ()=>{

}

const handleHiddenPost = (postId)=>{
    dispatch(updateStatusPost({postId,status:0})); 
    setIsShowActionActive(false); 
}

const handleDeletePost = (postId)=>{
    dispatch(deletePost(postId)); 
    setIsShowActionActive(false); 
}


useEffect(()=>{
    if(item.type !== undefined && item.type === 'SHARE'){
        const shareFilter = item?.share?.userShared?.filter(item => item.user?._id._id === user.data?._id)
        const share = shareFilter?.length > 0 && shareFilter[shareFilter.length - 1]
        setUserShare(share); 
    }
},[item])


  return (
    <div className='post-container'>
        {
            item?.type === 'SHARE'  ? (
                <>
                {
                   
                }
                    <div className="post-top">
            <img src={userShare?.user?.avatar} alt="" />
             <ul>
                <li>{userShare?.user._id.userName} <span style={{fontWeight:'normal'}}>đã chia sẻ một bài viết</span></li>
                <li>{moment(userShare?.timeShare).calendar()}</li>
             </ul>
             <ul>
                
             </ul>
           
             {
                 user?.data._id === item?.user?._id?._id && (
                     <HiOutlineDotsHorizontal className='post-action' onClick={()=>setIsShowActionActive(active => !active)}/>
                     )
                    }
          

            <div className={ isShowActionActive === true ? 'post-action-item-wrapper active':'post-action-item-wrapper'}>            
                    <span onClick={()=>handleHiddenSharePost(item._id)}>Ẩn bài viết</span>
                    <span onClick={()=>handleDeleteSharePost()}>Xóa bài viết</span>                          
            </div>
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
                    item?.images?.length === 0  && item.video.trim() !== "" (
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
                    item?.images?.length === 0  && item?.video?.trim() !== "" &&(
                        <div className='post-video'>
                            <video width="100%" height="100%" controls ref={videoRef} >
                                <source src={item.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                )
            }

                    <div className="post-top">
                        <img src={item?.user?.avatar} alt="" />
                        <ul>
                            <li>{item?.user?._id?.userName}</li>
                            <li>{moment(item?.createdDate).calendar()}</li>
                        </ul>
                        <ul>
                            
                        </ul>
                        
                      
                      
                    </div>

                    <div className='post-content'>
                        {item?.content}
                    </div>




            <ul className='post-center-action'>
                <li className={item.like?.userLiked?.find(item => item === user?.data._id) !== undefined && 'liked'} onClick={()=>handleLikePost(item?._id,item.type)}><GrLike/>&nbsp;Thích&nbsp;( {item?.like?.number} )</li>
                <li className='post-comment' onClick={()=> handleGetCommentByPost(item?._id)}><FaRegCommentDots/>&nbsp;Bình Luận&nbsp;( {item?.comment?.number} )</li>
                <li onClick={()=>handleSharePost(item?._id)}><CiShare2/>&nbsp;Chia sẻ&nbsp;( {shareNumber} )</li>
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
                                            comment?.children?.length > 0 && comment?.children?.map((child,indexTwo) =>{
                                                if(typeof child !== 'string'){
                                                    return ( 
                                                        <>
                                                            <Comment level={1} key={indexTwo}  index = {indexTwo}  handleSetReplyComment = {handleSetReplyComment} comment = {child}/>  
                                                            <div className='child-comment'>
                                                            {
                                                                child?.children?.length > 0 && child?.children.map((childTwo,indexThree) =>{
                                                                    if(typeof childTwo !== 'string'){
                                                                        return (   
                                                                            <>
                                                                                <Comment level={2} key={indexThree}  index = {indexThree}  handleSetReplyComment = {handleSetReplyComment} comment = {childTwo}/>  
                                                                                <div className='child-comment'>
                                                                                {
                                                                                    childTwo?.children?.length > 0 && childTwo?.children.map((childThree,indexFour) =>{
                                                                                        if(typeof childThree !== 'string'){
                                                                                            return (                                               
                                                                                                <Comment level={3} key={indexFour}  index = {indexFour}  handleSetReplyComment = {handleSetReplyComment} comment = {childThree}/>  
                                                                                                
                                                                                                )
                                                                                        }
                                                                                    })
                                                                                }
                                                                                </div>      
                                                                            </>                                            
                                                                            )
                                                                    }
                                                                })
                                                            }
                                                            </div>      
                                                        </>                                              
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
                {emojiShow && (
                    <div className="emoji">
                        <EmojiPicker theme='light' onEmojiClick={onEmojiClick} />
                    </div>
                 )}
                    <input value={content} type="text" ref={inputRef} placeholder='Viết bình luận của bạn ...' onChange={(e)=>setContent(e.target.value)} />
                    <label htmlFor="" className='post-input icon'>
                        <VscSmiley onClick={() => setEmojiShow(!emojiShow)}/>
                    </label>
                    <label className='post-input image' htmlFor="input-file"><CiImageOn/></label>
                    <input type="file" id='input-file' onChange={handleChooseImage} />
                </form>
                <div className='send-icon' onClick={handleSubmitForm}>
                    <RiSendPlane2Line/>
                </div>
            </div>
        </div>
                </>
            ):(

                <>
                    <div className="post-top">
                        <img src={item?.user?.avatar} alt="" />
                        <ul>
                            <li>{item?.user?._id?.userName}</li>
                            <li>{moment(item?.createdDate).calendar()}</li>
                        </ul>
                        <ul>
                            
                        </ul>
                       
                        {
                            user?.data._id === item?.user._id._id && (
                                <HiOutlineDotsHorizontal className='post-action' onClick={()=>setIsShowActionActive(active => !active)}/>
                                )
                        }
                       

                        <div className={ isShowActionActive === true ? 'post-action-item-wrapper active':'post-action-item-wrapper'}>            
                                <span onClick={()=>handleHiddenPost(item._id)}>Ẩn bài viết</span>
                                <span onClick={()=>handleDeletePost(item._id)}>Xóa bài viết</span>
                                     
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
                                item?.images?.length === 0  && item?.video?.trim() !== "" && (
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
                                item?.images?.length === 0 && item?.video?.trim() !== "" &&(
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
                            <li style={{display:'flex',alignItems:'center'}} className={item?.like?.userLiked?.find(item => item === user?.data._id) !== undefined && 'liked'} onClick={()=>handleLikePost(item?._id)}><FaRegHeart/>&nbsp;Thích&nbsp;( {item?.like?.number} )</li>
                            <li className='post-comment' onClick={()=> handleGetCommentByPost(item?._id)}><FaRegCommentDots/>&nbsp;Bình Luận&nbsp;( {item?.comment?.number} )</li>
                            <li onClick={()=>handleSharePost(item?._id)}><CiShare2/>&nbsp;Chia sẻ&nbsp;( {shareNumber} )</li>
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
                                                        comment?.children?.length > 0 && comment?.children?.map((child,indexTwo) =>{
                                                            if(typeof child !== 'string'){
                                                                return ( 
                                                                    <>
                                                                        <Comment level={1} key={indexTwo}  index = {indexTwo}  handleSetReplyComment = {handleSetReplyComment} comment = {child}/>  
                                                                        <div className='child-comment'>
                                                                        {
                                                                            child?.children?.length > 0 && child?.children.map((childTwo,indexThree) =>{
                                                                                if(typeof childTwo !== 'string'){
                                                                                    return (   
                                                                                        <>
                                                                                            <Comment level={2} key={indexThree}  index = {indexThree}  handleSetReplyComment = {handleSetReplyComment} comment = {childTwo}/>  
                                                                                            <div className='child-comment'>
                                                                                            {
                                                                                                childTwo?.children?.length > 0 && childTwo?.children.map((childThree,indexFour) =>{
                                                                                                    if(typeof childThree !== 'string'){
                                                                                                        return (                                               
                                                                                                            <Comment level={3} key={indexFour}  index = {indexFour}  handleSetReplyComment = {handleSetReplyComment} comment = {childThree}/>  
                                                                                                            
                                                                                                            )
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                            </div>      
                                                                                        </>                                            
                                                                                        )
                                                                                }
                                                                            })
                                                                        }
                                                                        </div>      
                                                                    </>                                              
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
                            <img src={user?.data?.avatar} alt="" />
                            <form  onSubmit={handleSubmitForm}>
                            {emojiShow && (
                                <div className="emoji">
                                    <EmojiPicker theme='light' onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                                <input value={content} type="text" ref={inputRef} placeholder='Viết bình luận của bạn ...' onChange={(e)=>setContent(e.target.value)} />
                                <label htmlFor="" className='post-input icon'>
                                    <VscSmiley onClick={() => setEmojiShow(!emojiShow)}/>
                                </label>
                                <label className='post-input image' htmlFor="input-file"><CiImageOn/></label>
                                <input type="file" id='input-file' onChange={handleChooseImage} />
                            </form>
                            <div className='send-icon' onClick={handleSubmitForm}>
                                <RiSendPlane2Line/>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

    </div>
  )
}

export default Post