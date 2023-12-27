import React from 'react'
import { IoTimeOutline } from "react-icons/io5";
import moment from 'moment/dist/moment';
import './comment.scss'
import 'moment/dist/locale/vi'
import {setChildrentComment} from '../../store/slice/postSlice'
import { useDispatch } from 'react-redux';

moment.locale('vi');
const Comment = ({comment,handleSetReplyComment,index,level}) => {

const dispatch = useDispatch(); 

 const handleShowCommentChild = (commentId,postId,children)=>{
    if(children.length > 0){
        dispatch(setChildrentComment({commentId,postId,children}));
    }
 }


  return (
    <div className='post-comment'>
    <div className='post-comment-item'>
        <img src={comment.user?.avatar} alt="" />
        <div className= 'comment-content'>
            <div className={comment.image !== "" || comment.video !== "" ?"comment-content-main outline":"comment-content-main"}>
                <div className='comment-top'>
                    <span className='user-name'>{comment.user?._id?.userName}</span>
                    <span className='time-comment'><IoTimeOutline/>&nbsp;{moment(comment.createdDate).startOf('hour').fromNow()}</span>
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
                <div>
                    <span>Thích</span>
                    <span onClick={()=>handleSetReplyComment(`${comment.user?._id?.userName} `,comment._id,level)}>Phản hồi</span>
                    <span onClick={()=>handleShowCommentChild(comment._id,comment.post,comment.children)} className='child-comment-num'>{comment.children?.length} Bình luận</span>
                </div>
                <span>Báo cáo</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default Comment