import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'

export const getChatListByUser = createAsyncThunk(
  'chat/getListByUser',
   async (data) => {
    const {id,friendId} = data; 
    const response = await _userRequest.get(`chat/getbyuser/${id}&${friendId}`); 
    return response.data
  }
)

export const createChat = createAsyncThunk(
    'chat/create',
     async (chatData) => {
      const response = await _userRequest.post('chat',chatData); 
      return response.data
    }
  )

export const updatePostByOtherUser = createAsyncThunk(
  'chat/updatePostByOtherUser',
   async ({postId,userId}) => {
    const response = await _userRequest.put(`post/update/byotheruser/${postId}`,{userId}); 
    return response.data
  }
)


const chatState = {
  chatList:[],
  userChatCurrent:null,
  isSuccess:false,
  isLoading:false,
  isError:false,
  error:null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState:chatState,
  reducers: {
    showCreatePost : (state)=>{
      state.isSuccess = false; 
      state.isShowCreatePost = true; 
    },
    hiddenShowCreatePost:(state)=>{
        state.isShowCreatePost = false; 
    },

    setUserChatCurrent:(state,action)=>{
        state.userChatCurrent = action.payload; 
    }
  },
  extraReducers:(builder)=>{

    builder.addCase(createChat.pending, (state, action) => {
        state.isLoading = true; 
        state.isSuccess = false;
      })
      builder.addCase(createChat.fulfilled,(state, action) => {
        state.isLoading = false;
        state.error = null; 
        state.isError = false;
        state.chatList = [...state.chatList,action.payload.data];
      })
      builder.addCase(createChat.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload;
        state.isLoading = false;
      })



    builder.addCase(getChatListByUser.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })
    builder.addCase(getChatListByUser.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.chatList = action.payload?.data;
    })
    builder.addCase(getChatListByUser.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
      state.isLoading = false;
    })

    builder.addCase(updatePostByOtherUser.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })
    builder.addCase(updatePostByOtherUser.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.postList =  state.postList.map(item=>{
         if(item._id === action.payload?.data?._id){
            item = action.payload?.data;
            return item; 
         }
         return item; 
      })
    })
    builder.addCase(updatePostByOtherUser.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
      state.isLoading = false;
    })
  }
})

export const { showCreatePost,hiddenShowCreatePost,setUserChatCurrent } = chatSlice.actions

export default chatSlice.reducer