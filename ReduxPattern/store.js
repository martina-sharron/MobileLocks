
import { configureStore } from '@reduxjs/toolkit'
import patternLockReducer from './PatternSlice'

export const store = configureStore({
  reducer: {
    patternLock: patternLockReducer,
  },
})
