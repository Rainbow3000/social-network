import { configureStore } from '@reduxjs/toolkit'
import {appSlice,statSlice,userSlice,postSlice,notificationSlice} from './slice'

export const store = configureStore({
  reducer: {
    app: appSlice,
    stat: statSlice,
    user:userSlice,
    post:postSlice,
    notification:notificationSlice
  },
})