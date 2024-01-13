import {
  Card,
  CardBody,
  CardImg,
} from "reactstrap";
import "./dashboard.scss"
import moment from 'moment'
import 'moment/locale/vi';
import { useState } from "react";
const Post = ({post}) => {
  const [isShowAction,setIsShowAction] = useState(false); 
  return (
    <Card style={{padding:10}}>
      <div className="avatar">
        <img src={post?.user?.avatar} alt="" />
        <div className="info-top">
          <span>{post.user._id.userName}</span>
          <span>{moment(post.createdDate).calendar()}</span>
        </div>
        <div className="dot-icon" onClick={()=>setIsShowAction(value => !value)}>
          <i class="bi bi-three-dots"></i>
          <ul className={isShowAction === true ?"list-action active":"list-action"}>
              <li>Khóa bài viết</li>
              <li>Xóa bài viết</li>
          </ul>
        </div>
      </div>
      <span>{post.content}</span>
      {
        post.images?.length === 1 && (
          <CardImg alt="Card image cap" src={post.images[0]} />
        )
      }

      {
        post.images?.length > 1 && (
          <div className="image-wrapper">
            {
              post.images.map(item =>{
                return (
                  <img src={item} alt="" />
                 
                )
              })
            }
          </div>
        )
      }



            {
                    post?.images?.length === 0  && post.video.trim() !== "" && (
                        <div className='post-video'>
                            <video width="100%" height="100%" controls  poster={post.thumb} >
                                <source src={post.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                

                
            }

            {
                 (post?.thumb === undefined || post?.thumb === null || post.thumb === "") && (
                    post?.images?.length === 0  && post?.video?.trim() !== "" &&(
                        <div className='post-video'>
                            <video width="100%" height="100%" controls >
                                <source src={post.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                )
            }


      <CardBody className="p-4">
        <div className="bottom-info">
          <span>{post.like.number} Thích</span>
          <span>{post.comment.number} Bình luận</span>
          <span>{post.share.number} Chia sẻ</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
