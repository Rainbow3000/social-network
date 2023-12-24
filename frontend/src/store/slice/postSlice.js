import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'

export const createPost = createAsyncThunk(
  'post/create',
   async (data) => {
    const response = await _userRequest.post('post',data); 
    return response.data
  }
)


export const createComment = createAsyncThunk(
  'comment/create',
   async (data) => {
    const response = await _userRequest.post('comment',data); 
    return response.data
  }
)



export const getPostList = createAsyncThunk(
  'post/getList',
   async () => {
    const response = await _userRequest.get('post'); 
    return response.data
  }
)


export const updatePostByOtherUser = createAsyncThunk(
  'post/updatePostByOtherUser',
   async ({postId,userId}) => {
    const response = await _userRequest.put(`post/update/byotheruser/${postId}`,{userId}); 
    return response.data
  }
)

export const getCommentByPost = createAsyncThunk(
  'comment/getCommentByPost',
   async (postId) => {
    const response = await _userRequest.get(`comment/getbypost/${postId}`); 
    return {commentData:response.data,postId}
  }
)

export const getPostByUser= createAsyncThunk(
  'comment/getPostByUser',
   async (userId) => {
    const response = await _userRequest.get(`post/getbyuser/${userId}`); 
    return response.data
  }
)

const postState = {
  isShowCreatePost:false,
  postList:[],
  postOfUser:[],
  isSuccess:false,
  isLoading:false,
  isError:false,
  error:null
}

export const postSlice = createSlice({
  name: 'post',
  initialState:postState,
  reducers: {
    showCreatePost : (state)=>{
      state.isSuccess = false; 
      state.isShowCreatePost = true; 
    },
    hiddenShowCreatePost:(state)=>{
        state.isShowCreatePost = false; 
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(createPost.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false; 
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.isSuccess = true;
      state.postList = [...state.postList,action.payload?.data].reverse();
      state.postOfUser = [...state.postOfUser,action.payload?.data].reverse(); 

    })
    builder.addCase(createPost.rejected, (state, action) => {
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })

    builder.addCase(getPostList.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })
    builder.addCase(getPostList.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.postList = action.payload?.data?.reverse();
    })
    builder.addCase(getPostList.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
      state.isLoading = false;
    })

    builder.addCase(getPostByUser.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })
    builder.addCase(getPostByUser.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.postOfUser = action.payload?.data?.reverse();
    })
    builder.addCase(getPostByUser.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
      state.isLoading = false;
    })


    builder.addCase(getCommentByPost.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })

    builder.addCase(getCommentByPost.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.postList = state.postList.map(item =>{
        if(item._id === action.payload.postId){
            item.commentList = action.payload?.commentData?.data.reverse();
        }
        return item; 
      })
    })
    
    builder.addCase(getCommentByPost.rejected, (state, action) => {
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

    builder.addCase(createComment.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false; 
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.isSuccess = true; 
      if(action.payload.data?.parent === null){
         state.postList = state.postList.map(item =>{
          if(item._id === action.payload.data?.post){
            if(item.commentList === undefined){
              item.commentList = []; 
            }
            item.commentList.push(action.payload.data); 
          }
          return item; 
         })
      }else {
        state.postList = state.postList.map(item=>{
          if(item._id === action.payload.data?.post){
            item.commentList = item.commentList.map(comment =>{
              if(comment._id === action.payload.data.parent){
                  comment.children.push(action.payload.data); 
                }
                return comment; 
            })
          }
          return item; 
        })
      }

      state.postList = state.postList.map(item =>{
        if(item._id === action.payload.data?.post){
            item.comment.number ++; 
        }
        return item; 
      }) 
    })
    builder.addCase(createComment.rejected, (state, action) => {
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })
  }
})

export const { showCreatePost,hiddenShowCreatePost } = postSlice.actions

export default postSlice.reducer