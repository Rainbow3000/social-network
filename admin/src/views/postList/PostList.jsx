import React, { useEffect } from 'react'
import {
    Row,
    Col,
  } from "reactstrap";

  import {useSelector,useDispatch}  from 'react-redux'
  import {getPostList} from '../../store/slice/postSlice'
import {moment} from 'moment'
import Post from "../../components/dashboard/Post";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";


const PostList = () => {

const dispatch = useDispatch(); 
const {postList} = useSelector(state => state.post); 


useEffect(()=>{
    dispatch(getPostList()); 
},[])

  return (
    <div>
                  <div style={{width:850,margin:'0 auto'}}>
                    <h5 className="mb-3">Danh sách bài viết</h5>
                    <Row>
                        {postList?.length > 0 && postList.map((post, index) => (
                        <Col sm="6" lg="6" xl="12" key={index}>
                            <Post
                               post = {post}
                            />
                        </Col>
                        ))}
                    </Row>
                  </div>

    </div>
  )
}

export default PostList