import { configureStore } from '@reduxjs/toolkit'
import {appSlice,postSlice,userSlice,commentSlice,notificationSlice} from './slice'

export const store = configureStore({
  reducer: {
    app: appSlice,
    post:postSlice,
    user:userSlice,
    comment:commentSlice,
    notification:notificationSlice
  },
})