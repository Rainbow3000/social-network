import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./header/Header.jsx";
import { Container } from "reactstrap";
import { useEffect,useRef} from "react";
import {useSelector,useDispatch} from 'react-redux'
import {createInstanceSocket} from '../utils/socket.js'
import {setUserActive} from '../store/slice/userSlice.js'
import {addNotifi} from '../store/slice/notificationSlice.js'
const FullLayout = () => {
  const socket = useRef(); 
  const {user} = useSelector(state => state.user);
  const navigate = useNavigate('');  
  const dispatch = useDispatch()
  useEffect(()=>{
    if(user === null || user?.data.role !== 'ADMIN'){
      navigate('/auth')
    }
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

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
