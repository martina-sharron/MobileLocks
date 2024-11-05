import { createSlice } from '@reduxjs/toolkit'
import { Alert } from 'react-native'

const initialState = {
  savedPattern: [],
  userPattern: [],
  isPatternSet: false,
  isPatternMatched: false,
};

const patternLockSlice = createSlice({
  name: 'patternLock',
  initialState,
  reducers: {
    setPattern: (state, action) => {
      state.savedPattern = action.payload
      state.isPatternSet = true;
      Alert.alert('Pattern Set', 'Your pattern has been set successfully.')
    },
    addUserPattern: (state, action) => {
      state.userPattern.push(action.payload)
    },
    clearUserPattern: (state) => {
      state.userPattern = []
    },
    validatePattern: (state) => {
      state.isPatternMatched = JSON.stringify(state.savedPattern) === JSON.stringify(state.userPattern)
    },
    
    resetPattern: (state) => {
      state.savedPattern = []
      state.userPattern = []
      state.isPatternSet = false
      state.isPatternMatched = false
      Alert.alert('Pattern Reset', 'Please set a new pattern.')
    },
  },
});

export const { setPattern, addUserPattern, clearUserPattern, validatePattern, resetPattern } = patternLockSlice.actions

export default patternLockSlice.reducer
