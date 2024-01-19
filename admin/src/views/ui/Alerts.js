import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getNotifiList,updateNotifiList,setIsSuccess} from '../../store/slice/notificationSlice'
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
  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);
  const [content,setContent] = useState("");
  const dispatch = useDispatch(); 
  const {notifiList,isSuccess,successMessage} = useSelector(state => state.notification)
  const [emojiShow, setEmojiShow] = useState(false);
  const {user} = useSelector(state => state.user);
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


  useEffect(()=>{
    dispatch(getNotifiList(user?.data._id)); 
  },[])

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
            <Form>
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

                                   
                                    <FaRegFaceSmile className='icon' onClick={() => setEmojiShow(!emojiShow)}/>
                                  
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
        <button className="btn btn-success"><i class="bi bi-pencil-square"></i> Tạo thông báo</button>
        </CardTitle>
        <CardBody className="">
          <div className="mt-3">
            {
              notifiList.length > 0 && notifiList.filter(item => item.notifiType === 'CREATE_ACCOUNT').sort((x,y)=>{
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
                    <i class="bi bi-x" style={{position:'absolute', right:5,top:3,cursor:'pointer',fontSize:20,fontWeight:'bold'}}></i>
                  </div>
                </Alert>
                )
              })
            }     
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Thông báo bài viết
        </CardTitle>
        <CardBody className="">
          <div className="mt-3">
            {
              notifiList.length > 0 && notifiList.filter(item => item.notifiType === 'CREATE_POST').sort((x,y)=>{
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
