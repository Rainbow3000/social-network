

const userOnline = new Map(); 
let socketObject = null;
let ioObject = null;  
module.exports = {
    getSocketIo:()=>{
        return {ioObject,socketObject,userOnline};
    },
    getInstanceSocketIo :(io)=>{
        io.on('connection', async(socket) => {
            socket.on('user-connected',(data)=>{
                if(!userOnline.has(data)){
                    userOnline.set(data,socket.id); 
                    socket.join(socket.id);
                }  
            })
            
            socketObject = socket; 
            
        });

        ioObject = io;
      
    }
}




