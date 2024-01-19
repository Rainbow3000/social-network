import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getNotifiList,updateNotifiList,setIsSuccess,createNotifi,deleteNotifi} from '../../store/slice/notificationSlice'
import { ToastContainer, toast } from 'react-toastify';
import { FaRegFaceSmile } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import './ui.scss'
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from "reactstrap";
import EmojiPicker from "emoji-picker-react";
import moment from 'moment'
import 'moment/locale/vi';
const Alerts = () => {
  const [visible, setVisible] = useState(true);
  const [content,setContent] = useState("");
  const dispatch = useDispatch(); 
  const {notifiList,isSuccess,successMessage} = useSelector(state => state.notification)
  const [emojiShow, setEmojiShow] = useState(false);
  const {user} = useSelector(state => state.user);
  const [notifiAccountList,setNotifiAccountList] = useState([]); 
  const [notifiPostList,setNotifiPostList] = useState([]); 
  const [typeFilterAccount,setTypeFilterAccount] = useState("0"); 
  const [typeFilterPost,setTypeFilterPost] = useState("0"); 
  const [notiFilter,setNotifilter] = useState([]); 

  const [notifiAccountView,setNotifiAccountView] = useState([])
  const [notifiPostView,setNotifiPostView] = useState([])

  const onDismiss = () => {
    setVisible(false);
  };

  const handleSetChecked = (value)=>{
    dispatch(updateNotifiList(value)); 
  }

  if(isSuccess){
    toast.success(successMessage)
    dispatch(setIsSuccess(false)); 
  }

  const onEmojiClick = (object) => {
    let text = content + object.emoji;
    setContent(text);
};

const handleDeleteNoti = (id)=>{
  dispatch(deleteNotifi(id))
}

const handleSubmit= (e)=>{
    e.preventDefault();
    dispatch(createNotifi({content}))
    setEmojiShow(false); 
    setContent(""); 
}

  useEffect(()=>{
    dispatch(getNotifiList(user?.data._id)); 
  },[])

  useEffect(()=>{
    const post = notifiList.filter(item => item.notifiType === 'CREATE_POST'); 
    const account = notifiList.filter(item => item.notifiType === 'CREATE_ACCOUNT'); 
    setNotifiAccountList(account); 
    setNotifiPostList(post);

  },[notifiList])


  
  useEffect(()=>{
      
    let filter = [];
    if(typeFilterAccount === "0"){
    
        filter = notifiAccountList.filter(item => item.isReaded === true || item.isReaded === false);

        setNotifiAccountView(filter); 
    }else if(typeFilterAccount === "1") {
      
        filter = notifiAccountList.filter(item => item.isReaded === false);
        setNotifiAccountView(filter); 
    }else{
        filter = notifiAccountList.filter(item => item.isReaded === true);
        setNotifiAccountView(filter); 
    }
  },[typeFilterAccount,notifiAccountList])


  useEffect(()=>{
      
    let filter = [];
    if(typeFilterPost === "0"){
    
        filter = notifiPostList.filter(item => item.isReaded === true || item.isReaded === false);

        setNotifiPostView(filter); 
    }else if(typeFilterPost === "1") {
      
        filter = notifiPostList.filter(item => item.isReaded === false);
        setNotifiPostView(filter); 
    }else{
        filter = notifiPostList.filter(item => item.isReaded === true);
        setNotifiPostView(filter); 
    }
  },[typeFilterPost,notifiPostList])

  return (
    <div>

      <div>
      <Row>
      <Col>
      
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Gửi thông báo đến người dùng
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup style={{position:'relative'}}>
                <Label for="exampleEmail">Nội dung thông báo</Label>
                <input
                  value={content}
                  className="notifi-input"
                  id="exampleEmail"
                  name="email"
                  placeholder="Nhập nội dung thông báo..."
                  type="text"
                  onChange={(e)=> setContent(e.target.value)}
                />
                  <div style={{display:'flex',alignItems:'center',position:'absolute',bottom:-30}}>
                                    {emojiShow && (
                                        <div className="emoji-container">
                                            <EmojiPicker theme='light' onEmojiClick={onEmojiClick} />
                                        </div>
                                    )}

                                   
                                    <FaRegFaceSmile style={{cursor:'pointer'}} className='icon' onClick={() => setEmojiShow(!emojiShow)}/>
                                  
                                </div>
              </FormGroup>
              <Button className="send-btn mt-2" style={{backgroundColor:'#5D96FF',border:'none',float:'right'}}>Gửi</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
      </div>

      <ToastContainer/>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span>
          <i className="bi bi-bell me-2"> </i>
          Thông báo tài khoản
          </span>
          <select onChange={(e)=> setTypeFilterAccount(e.target.value)} className='noti-filter'>
                            <option  selected value="0">Tất cả</option>
                            <option  value="1">Chưa đọc</option>
                            <option  value="2">Đã đọc</option>
                        </select>
        </CardTitle>
        <CardBody className="">
          <div className="mt-3">
            {
              notifiAccountView.length > 0 && notifiAccountView.sort((x,y)=>{
                return  new Date(y.createdAt) - new Date(x.createdAt)
              }).map(item =>{
                return (
                <Alert style={{display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative'}} color="light">
                  <div className="notifi-wrap">
                    
                    <img src={item?.fromUser?.avatar} alt="" />
                    
                    <div className="info-user">
                      <span >{item?.fromUser?._id?.userName} <span>{item.content}</span></span>
                      <span>{moment(item?.createdAt).calendar()}</span>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <input checked = {item.isReaded} onChange={()=> handleSetChecked(item._id)} title="Đánh dấu đã đọc" style={{cursor:'pointer',width:16,height:16,marginRight:10}} type="checkbox" />  
                   <div className={item.isReaded === true ?'new checked':'new'}></div>
                    <span style={{marginLeft:5,fontSize:13}}>
                      {
                        item.isReaded === true ? 'đã đọc':'chưa đọc'
                      }
                    </span>
                    <i onClick={()=>handleDeleteNoti(item._id)} class="bi bi-x" style={{position:'absolute', right:5,top:3,cursor:'pointer',fontSize:20,fontWeight:'bold'}}></i>
                  </div>
                </Alert>
                )
              })
            }     
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span>
          <i className="bi bi-bell me-2"> </i>
           Thông báo bài viết
          </span>
          <select onChange={(e)=> setTypeFilterPost(e.target.value)} className='noti-filter'>
                            <option  selected value="0">Tất cả</option>
                            <option  value="1">Chưa đọc</option>
                            <option  value="2">Đã đọc</option>
                        </select>
        </CardTitle>
        <CardBody className="">
          <div className="mt-3">
            {
              notifiPostView.length > 0 && notifiPostView.sort((x,y)=>{
                return  new Date(y.createdAt) - new Date(x.createdAt)
              }).map(item =>{
                return (
                <Alert style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} color="light">
                  <div className="notifi-wrap">
                    
                    <img src={item?.fromUser?.avatar} alt="" />
                    
                    <div className="info-user">
                      <span >{item?.fromUser?._id?.userName} <span>{item?.content}</span></span>
                      <span>{moment(item?.createdAt).calendar()}</span>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <input checked = {item.isReaded} onChange={()=> handleSetChecked(item._id)} title="Đánh dấu đã đọc" style={{cursor:'pointer',width:16,height:16,marginRight:10}} type="checkbox" />  
                   <div className={item.isReaded === true ?'new checked':'new'}></div>
                   <span style={{marginLeft:5,fontSize:13}}>
                      {
                        item.isReaded === true ? 'đã đọc':'chưa đọc'
                      }
                    </span>
                    <i onClick={()=>handleDeleteNoti(item._id)} class="bi bi-x" style={{position:'absolute', right:5,top:3,cursor:'pointer',fontSize:20,fontWeight:'bold'}}></i>
                  </div>
                </Alert>
                )
              })
            }       
          </div>
        </CardBody>
      </Card>
      </div>
  )
};

export default Alerts;
