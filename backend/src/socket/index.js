

const userOnline = new Map(); 
let socketObject = null;
let ioObject = null;  
let online = [] 
module.exports = {
    getSocketIo:()=>{
        return {ioObject,socketObject,userOnline};
    },
    getInstanceSocketIo :(io)=>{
        io.on('connection', async(socket) => {

            socket.on('user-connected',(data)=>{
                if(!userOnline.has(data)){
                    userOnline.set(data,socket.id); 
                    online.push(data); 
                }  
                socket.emit('user-online',online)           
            })

            socket.on('disconnect', () => {       
               const keys = Array.from(userOnline.keys()); 
               let keyDisconnected = null; 
               
               keys.forEach(item =>{
                if(userOnline.get(item) === socket.id){
                    keyDisconnected = item; 
                }
               })
               online = online.filter(item => item !== keyDisconnected); 
               socket.emit('user-online',online)
               userOnline.delete(keyDisconnected);

            });
            
            socketObject = socket; 
            
        });

        ioObject = io;
      
    }
}




