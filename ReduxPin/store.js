
import { configureStore } from '@reduxjs/toolkit'
import pinLockReducer from './PinLockSlice'

const store = configureStore({
  reducer: {
    pinLock: pinLockReducer,
  },
})

export default store
