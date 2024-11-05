// SplashScreen.js
import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/img1.jpg')} // Ensure the path to your image is correct
                style={styles.backgroundImage}
            >
                {/* Additional content (like a logo) can be added here */}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen;
