import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setPin, verifyPin, resetPin } from './PinLockSlice'

const PinLockScreen = () => {
    const dispatch = useDispatch();
    const { pin, isPinSet, isError } = useSelector((state) => state.pinLock)
    const [inputPin, setInputPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')

    const handleSetPin = () => {
        if (inputPin.length >= 4 && inputPin.length <= 16 && inputPin === confirmPin) {
            dispatch(setPin(inputPin))
            setInputPin('')
            setConfirmPin('')
            Alert.alert("PIN Set", "Your PIN has been set successfully.")
        } else if (inputPin !== confirmPin) {
            Alert.alert("PIN Mismatch", "Both PIN entries must match.")
        } else {
            Alert.alert("Invalid PIN", "PIN must be between 4 and 16 digits.")
        }
    }

    const handleVerifyPin = () => {
        dispatch(verifyPin(inputPin))

        
        setTimeout(() => {
            if (isError) {
                Alert.alert("Error", "Invalid PIN. Try again.")
            } else {
                Alert.alert("Unlocked", "Access granted!")
            }
            setInputPin('')
        }, 100); // Delay to allow Redux state to update
    };

    const handleResetPin = () => {
        dispatch(resetPin())
        setInputPin('')
        setConfirmPin('')
        Alert.alert("Reset", "Reset a new PIN.")
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/img2.jpg')} style={styles.backgroundImage}>
                <Text style={styles.header}>{isPinSet ? "Enter your PIN" : "Set a 4-16 digit PIN"}</Text>

                {!isPinSet ? (
                    <View style={styles.pinRow}>
                        <TextInput
                            style={styles.pinInput}
                            placeholder="Set PIN"
                            placeholderTextColor="#bbb"
                            keyboardType="numeric"
                            maxLength={16}
                            secureTextEntry
                            value={inputPin}
                            onChangeText={(text) => setInputPin(text)}
                        />
                        <TextInput
                            style={styles.pinInput}
                            placeholder="Confirm PIN"
                            placeholderTextColor="#bbb"
                            keyboardType="numeric"
                            maxLength={16}
                            secureTextEntry
                            value={confirmPin}
                            onChangeText={(text) => setConfirmPin(text)}
                        />
                    </View>
                ) : (
                    <TextInput
                        style={styles.pinInput}
                        placeholder="Enter PIN"
                        placeholderTextColor="#bbb"
                        keyboardType="numeric"
                        maxLength={16}
                        secureTextEntry
                        value={inputPin}
                        onChangeText={(text) => setInputPin(text)}
                    />
                )}

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isPinSet ? "#4CAF50" : "#FF5722" }]}
                    onPress={isPinSet ? handleVerifyPin : handleSetPin}
                >
                    <Text style={styles.buttonText}>{isPinSet ? "Unlock" : "Set PIN"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleResetPin}>
                    <Text style={styles.buttonText}>Reset PIN</Text>
                </TouchableOpacity>

                {isError && <Text style={styles.errorText}>Incorrect PIN, try again.</Text>}
            </ImageBackground>
        </View>
    )
}

export default PinLockScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        color: 'white',
    },
    pinRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    pinInput: {
        fontSize: 22,
        textAlign: 'center',
        width: '45%',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#4CAF50',
        color: 'white',
    },
    button: {
        width: '70%',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    resetButton: {
        backgroundColor: '#757575',
    },
    errorText: {
        color: '#FF3D00',
        fontSize: 14,
        marginTop: 10,
    },
})
