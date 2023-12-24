const env = require('dotenv'); 
env.config(); 
const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
const PORT = process.env.PORT || 5000
const connectDatabase = require('./src/database/connect');
app.use(express.json());
app.use(cors()); 
connectDatabase(); 

const postRouter = require('./src/router/postRouter'); 
const authRouter = require('./src/router/accountRouter'); 
const commentRouter = require('./src/router/commentRouter')
const userRouter = require('./src/router/userRouter')

app.use(postRouter); 
app.use(authRouter); 
app.use(commentRouter); 
app.use(userRouter); 

app.listen(PORT,()=>console.log(`server is runing at http://localhost:${PORT}`))

