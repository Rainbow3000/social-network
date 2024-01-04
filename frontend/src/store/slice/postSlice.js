import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'
import {findComment,addComment} from '../../helper/commentHelper'
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
   async ({postId,userId,type}) => {
    const response = await _userRequest.put(`post/update/byotheruser/${postId}`,{userId,type}); 
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

export const getCommentByParent = createAsyncThunk(
  'comment/getCommentByParent',
   async ({commentId,postId}) => {
    const response = await _userRequest.get(`comment/${commentId}`); 
    const {data} = response.data; 
    return {commentId,postId,data}
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
  commentIdList:[],
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
    },
    setChildrentComment:(state,action)=>{
      state.postList = state.postList.map(post =>{
        if(post._id === action.payload.postId){
          let childComment = null; 
        
          childComment =  post.commentList?.filter(comment =>{
              if(action.payload.children.includes(comment._id)){
                return comment;
              }
            });   
          
         
          post.commentList = post.commentList.map(comment=>{

            if(comment._id === action.payload.commentId){
               if(state.commentIdList.find(item => item === action.payload.commentId) === undefined){
                 comment.children = childComment; 
                 state.commentIdList = [...state.commentIdList,action.payload.commentId]
               }else {              
                comment.children = action.payload.children.map(item => item._id)   
                state.commentIdList = state.commentIdList.filter(comId => comId !== action.payload.commentId); 
               }
            }

            
    
            return comment;
          })

          

        }
        return post;
      })


      state.postOfUser = state.postOfUser.map(post =>{
        if(post._id === action.payload.postId){
          const childComment =  post.commentList?.filter(comment =>{
            if(action.payload.children.includes(comment._id)){
              return comment;
            }
          });
         
          post.commentList = post.commentList.map(comment=>{
            if(comment._id === action.payload.commentId){
               comment.children = childComment; 
            }
            return comment;
          })
        }
        return post;
      })
    }
  },
  extraReducers:(builder)=>{


    builder.addCase(getCommentByParent.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false; 
    })
    builder.addCase(getCommentByParent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.isSuccess = true;
     
      state.postList = state.postList.map(post => {
        if(post._id === action.payload.postId){
            post.commentList = post.commentList.map(comment =>{
              findComment(comment,action.payload.commentId,action.payload.data);           
              return comment; 
            })
        }
        return post; 
      })


      state.postOfUser = state.postOfUser.map(post => {
        if(post._id === action.payload.postId){
            post.commentList = post.commentList.map(comment =>{
              findComment(comment,action.payload.commentId,action.payload.data);           
              return comment; 
            })
        }
        return post; 
      })
   
    })
    builder.addCase(getCommentByParent.rejected, (state, action) => {
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })




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

      state.postOfUser = state.postOfUser.map(item =>{
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
      // state.postList =  state.postList.map(item=>{
      //    if(item._id === action.payload?.data?._id){
      //       item = action.payload?.data;
      //    }
      //    return item; 
      // })
      
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
     
      state.postList = state.postList.map(post =>{
        if(post._id === action.payload.data.post){
          post.comment.number ++; 

          if(action.payload.data.parent === null){
          if(post.commentList === undefined){
              post.commentList = []; 
            }
            post.commentList = [...post.commentList,action.payload.data]; 
          }else{
            post.commentList = post.commentList.map(comment =>{
              addComment(comment,action.payload.data.parent,action.payload.data); 
              return comment; 
            })
          }

        }

        return post; 
      })


      state.postOfUser = state.postOfUser.map(post =>{
        if(post._id === action.payload.data.post){
          post.comment.number ++; 

          if(action.payload.data.parent === null){
          if(post.commentList === undefined){
              post.commentList = []; 
            }
            post.commentList = [...post.commentList,action.payload.data]; 
          }else{
            post.commentList = post.commentList.map(comment =>{
              addComment(comment,action.payload.data.parent,action.payload.data); 
              return comment; 
            })
          }

        }

        return post; 
      })

    
    })
    builder.addCase(createComment.rejected, (state, action) => {
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })
  }
})

export const { showCreatePost,hiddenShowCreatePost,setChildrentComment } = postSlice.actions

export default postSlice.reducer