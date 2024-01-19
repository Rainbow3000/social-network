import React from 'react'
import { IoTimeOutline } from "react-icons/io5";
import moment from 'moment/dist/moment';
import './comment.scss'
import 'moment/dist/locale/vi'
import {setChildrentComment,getCommentByParent} from '../../store/slice/postSlice'
import { useDispatch } from 'react-redux';
import { IoMdArrowDropright } from "react-icons/io";
moment.locale('vi');
const Comment = ({comment,handleSetReplyComment,index,level}) => {
console.log(comment); 
const dispatch = useDispatch(); 

 const handleShowCommentChild = (commentId,postId,children)=>{   
    dispatch(getCommentByParent({commentId,postId}));  
 }


  return (
    <div className='post-comment'>
    <div className='post-comment-item'>
        <img src={comment?.user?.avatar} alt="" />
        <div className= 'comment-content'>
            <div className={comment.image !== "" || comment.video !== "" ?"comment-content-main outline":"comment-content-main"}>
                <div className='comment-top'>
                    <span className='user-name' style={{display:'flex',alignItems:'center'}}>{comment.user?._id?.userName} {comment.level === 3 && <span style={{display:'flex',alignItems:'center'}}><IoMdArrowDropright style={{color:'gray'}}/>{comment.parentName}</span>}</span>
                    <span className='time-comment'><IoTimeOutline/>&nbsp;{moment(comment.createdDate).calendar()}</span>
                </div>
                    {
                        comment?.video !== "" && (
                        <div className='post-video'>
                            <video width="50%" height="50%" controls>
                                <source src={comment.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        )
                    }
                     {
                        comment?.image !== "" && (
                         
                        <div className='comment-img'>
                            <img src={comment.image} alt="" />
                        </div>
                        )
                     }
                <div>
                    <span className='user-comment'>{comment.content}</span>
                </div>
            </div>

            <div className='user-action'>
                <div style={{paddingLeft:20}}>
                   
                    <span onClick={()=>handleSetReplyComment(`${comment.user?._id?.userName} `,comment._id,level,comment.parent)}>Phản hồi</span>
                    <span onClick={()=>handleShowCommentChild(comment._id,comment.post,comment.children)} className='child-comment-num'>{comment.children?.length} Bình luận</span>
                </div>
                
            </div>
        </div>
    </div>
</div>
  )
}

export default Comment