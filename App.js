import React from 'react'
import { Provider } from 'react-redux'
import { store } from './ReduxPattern/store'
import PatternLock from './ReduxPattern/PatternLock'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LockScreenImage from './ReduxPattern/LockScreen'
import { enableScreens } from 'react-native-screens'
import { StatusBar } from 'react-native';

enableScreens()
const Stack = createNativeStackNavigator()

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar hidden={true} /> 
      <Stack.Navigator initialRouteName='pattern'>
        <Stack.Screen
          name='lock'
          component={LockScreenImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='pattern'
          component={PatternLock}
          options={{ headerShown: false }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App
