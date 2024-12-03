import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/img1.jpg')} 
                style={styles.backgroundImage}
            >
               
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SplashScreen
