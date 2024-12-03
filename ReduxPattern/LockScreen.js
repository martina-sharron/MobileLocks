import React from 'react'
import { View, Image, StyleSheet } from 'react-native'


const LockScreenImage = () => (
  <View style={styles.container}>
    <Image source={require('../assets/images/img3.jpg')} style={styles.image} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
   
  },
})

export default LockScreenImage
