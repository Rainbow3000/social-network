import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'

export const getUserStat = createAsyncThunk(
    'stat/userStat',
     async () => {
      const response = await _userRequest.get('user/stat'); 
      return response.data
    }
  )
  

export const getPostStat = createAsyncThunk(
'stat/postStat',
    async () => {
    const response = await _userRequest.get('post/stat'); 
    return response.data
}
)



const statState = {
  userStat:[],
  postStat:[],
  userLength :0, 
  postLength :0 
}

export const statSlice = createSlice({
  name: 'stat',
  initialState:statState,
  reducers: {
  
  },

  extraReducers:(builder)=>{

    builder.addCase(getUserStat.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })
    builder.addCase(getUserStat.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.userLength = action.payload.data?.reduce((cur,next) =>{
         return cur + next.quantity; 
      },0)
      state.userStat = action.payload.data?.filter(item => item._id.year === new Date().getFullYear()).map(item => item.quantity);
    })
    builder.addCase(getUserStat.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
      state.isLoading = false;
    })


    builder.addCase(getPostStat.pending, (state, action) => {
        state.isLoading = true; 
        state.isSuccess = false;
      })
      builder.addCase(getPostStat.fulfilled,(state, action) => {
        state.isLoading = false;
        state.error = null; 
        state.isError = false;
        state.postLength = action.payload.data?.reduce((cur,next) =>{
            return cur + next.quantity; 
         },0)
        state.postStat = action.payload.data.filter(item => item._id.year === new Date().getFullYear()).map(item => item.quantity);
      })
      builder.addCase(getPostStat.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload;
        state.isLoading = false;
      })

  }


})


export const {} = statSlice.actions

export default statSlice.reducer