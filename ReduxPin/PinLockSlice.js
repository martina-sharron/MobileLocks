// pinLockSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pin: '',
  isPinSet: false,
  isError: false,
};

const pinLockSlice = createSlice({
  name: 'pinLock',
  initialState,
  reducers: {
    setPin(state, action) {
      state.pin = action.payload;
      state.isPinSet = true;
    },
    verifyPin(state, action) {
      state.isError = action.payload !== state.pin;
    },
    resetPin(state) {
      return initialState;
    },
  },
});

export const { setPin, verifyPin, resetPin } = pinLockSlice.actions;
export default pinLockSlice.reducer;