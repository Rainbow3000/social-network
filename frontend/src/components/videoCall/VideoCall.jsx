import React, { useEffect, useRef, useState } from 'react'
import './videocall.scss'
import { setCallIdList,setCurrentCallId,setIsPlayCall,setIsShowCallLayout } from '../../store/slice/chatSlice';
import {createInstanceSocket} from '../../utils/socket'
import { Peer } from "peerjs";
import { useDispatch, useSelector } from 'react-redux';
import { ImPhoneHangUp } from "react-icons/im";
const VideoCall = () => {
 const friendVideoRef = useRef();
 const myVideoRef = useRef();
 const peerRef = useRef(); 
 const socket = useRef(); 
 const dispatch  = useDispatch(); 
 const [stream,setStream] = useState(null); 
 const [call,setCall] = useState(null); 

 const {callIdList,isPlayCall,currentCallId,userChatCurrent,isShowCallLayout} = useSelector(state => state.chat); 
 const {user}  = useSelector(state => state.user); 

  const openStream = ()=>{
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia({  audio: true, video: true });   
    }
    else {
    navigator.getWebcam({ audio: true, video: true }, 
         function (stream) {
         }, 
         function () { console.log("Không thể truy cập camera."); });
    }
}

function cameraoff() {
    const myStream = myVideoRef.current.srcObject;
    const friendStream = friendVideoRef.current.srcObject;
    if (myStream) {
      const tracks = myStream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });

      myVideoRef.current.srcObject = null;
   }

   if (friendStream) {
    const tracks = friendStream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
    friendVideoRef.current.srcObject = null;
 }
}


const playStream = (videoObject,stream)=>{
    if(videoObject.current){
        videoObject.current.srcObject = stream;
        if(videoObject.current?.paused && 
            videoObject.current?.currenttime > 0 && !videoObject.current?.ended) {
            videoObject.current.play();
         } 
    }
}

const handleCloseCall = ()=>{
    dispatch(setIsPlayCall(false));
    cameraoff(); 
    dispatch(setIsShowCallLayout(false)); 
    
    if(socket.current){
        socket.current.emit('user-end-call',userChatCurrent?._id?._id)
    }
}


useEffect(()=>{
    socket.current = createInstanceSocket();
    const peer = new Peer();
    peerRef.current = peer; 
    if(peerRef.current){
        peerRef.current.on('open',(id)=>{
            if(socket.current){            
                const data = {
                    userId:user?.data._id,
                    callId:id
                }
                socket.current.emit('user-call-id',data); 
            }
        })

        peerRef.current.on('call', function(call) {
            openStream().then(stream =>{
                setStream(stream); 
                playStream(friendVideoRef,stream)
                call.answer(stream);
                playStream(myVideoRef,stream)
                call.on('stream',remoteStream =>playStream(friendVideoRef,remoteStream))
                dispatch(setIsShowCallLayout(true))
                setCall(call); 
            }); 
        });

    }

    if(socket.current){
        socket.current.on('send-callId-to-client',data =>{
            dispatch(setCallIdList(data)); 
        })
    }
 
},[user])


useEffect(()=>{
    socket.current.on('end-call',(data) =>{
        if(data === user?.data._id){
            dispatch(setIsPlayCall(false));
            cameraoff(); 
            dispatch(setIsShowCallLayout(false)); 
        }
    })
},[])


useEffect(()=>{

    const callItem = callIdList?.find(item => item.userId === userChatCurrent?._id?._id); 
    if(callItem !== undefined){
        dispatch(setCurrentCallId(callItem.callId)); 
    }

},[callIdList])


useEffect(()=>{
    if(isPlayCall){
        openStream().then(stream =>{
            playStream(myVideoRef,stream)
            const call = peerRef.current.call(currentCallId,stream);
            call.on('stream',remoteStream =>playStream(friendVideoRef,remoteStream))
        }); 
    }
},[isPlayCall === true])


  return (
    <div className={isShowCallLayout === true ? 'video-call-container active':'video-call-container'}>
        <video ref={myVideoRef} className='my-video' width={200} height={200} autoplay="autoplay"></video>
        <video ref={friendVideoRef} className='friend-video' width={750} height={500} autoplay="autoplay"></video>
        <div className='btn-action-list'>
            <div className='phone-end' onClick={handleCloseCall}>
                <ImPhoneHangUp/>
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default VideoCall