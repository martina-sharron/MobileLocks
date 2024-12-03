import React from 'react'
import { Provider } from 'react-redux'
import store from './ReduxPin/store'
import PinLockScreen from './ReduxPin/PinLockScreen'


const App1 = () => {


  return (

    <Provider store={store}>
      <PinLockScreen />
    </Provider>

  )
}

export default App1
