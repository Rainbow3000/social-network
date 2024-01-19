import React,{useEffect,useRef} from "react";
import {useSelector,useDispatch} from 'react-redux'
import {getNotifiList,addNotifi} from '../../store/slice/notificationSlice.js'
import {getDenounceList} from '../../store/slice/postSlice.js'
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import {createInstanceSocket} from '../../utils/socket.js'
import {setUserActive} from '../../store/slice/userSlice.js'


const Feeds = () => {
  const {notifiList} = useSelector(state => state.notification)
  const {denounceList} = useSelector(state => state.post); 
  const {user} =useSelector(state => state.user); 
  const {registerToday} =useSelector(state => state.stat); 
  const dispatch = useDispatch(); 
  console.log(notifiList)
  const socket = useRef(); 
  useEffect(()=>{
    dispatch(getNotifiList(user?.data._id)); 
  },[])

  useEffect(()=>{
    socket.current = createInstanceSocket(); 
    if(socket.current){
      socket.current.on('connect', () => {
         socket.current.emit('user-connected',user?.data?._id); 
      });

      socket.current.on('user-online',(data)=>{
            dispatch(setUserActive(data));         
      })

      socket.current.on('user-create-post',(data)=>{
            dispatch(addNotifi(data)); 
      })
   
    }

  },[])
  useEffect(()=>{
    dispatch(getDenounceList()); 
  },[]) 
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Hoạt động</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Các hoạt động gần đây
        </CardSubtitle>
        <ListGroup flush className="mt-4">
        
        <ListGroupItem
             
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="primary"
              >
                <i className="bi bi-bell"></i>
              </Button>
              Thông báo
              <small className="ms-auto text-muted text-small">
                  {notifiList.length}
              </small>
            </ListGroupItem>


            <ListGroupItem
             
             action
             href="/"
             tag="a"
             className="d-flex align-items-center p-3 border-0"
           >
             <Button
               className="rounded-circle me-3"
               size="sm"
               color="info"
             >
               <i className="bi bi-person"></i>
             </Button>
             Người dùng đăng ký hôm nay
             <small className="ms-auto text-muted text-small">
                 {registerToday}
             </small>
           </ListGroupItem>


           <ListGroupItem
             
             action
             href="/"
             tag="a"
             className="d-flex align-items-center p-3 border-0"
           >
             <Button
               className="rounded-circle me-3"
               size="sm"
               color="danger"
             >
               <i className="bi bi-chat-dots"></i>
             </Button>
             Tin nhắn mới
             <small className="ms-auto text-muted text-small">
                 {notifiList.length}
             </small>
           </ListGroupItem>

           <ListGroupItem
             
             action
             href="/"
             tag="a"
             className="d-flex align-items-center p-3 border-0"
           >
             <Button
               className="rounded-circle me-3"
               size="sm"
               color="success"
             >
               <i className="bi bi-flag"></i>
             </Button>
                Bài viết bị tố cáo
             <small className="ms-auto text-muted text-small">
                 {denounceList.length}
             </small>
           </ListGroupItem>
        </ListGroup>


        
      </CardBody>
    </Card>
  );
};

export default Feeds;
