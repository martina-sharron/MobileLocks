import React, { useState, useCallback } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Svg, { Line } from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {
  setPattern,
  addUserPattern,
  clearUserPattern,
  validatePattern,
  resetPattern,
} from './PatternSlice'

const DOT_COORDINATES = [
  { x: 20, y: 20 },
  { x: 60, y: 20 },
  { x: 100, y: 20 },
  { x: 20, y: 60 },
  { x: 60, y: 60 },
  { x: 100, y: 60 },
  { x: 20, y: 100 },
  { x: 60, y: 100 },
  { x: 100, y: 100 },
]

const PatternLock = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const { savedPattern, userPattern, isPatternSet } = useSelector((state) => state.patternLock)
  const [linePoints, setLinePoints] = useState([])

  const handleDotPress = useCallback((dotIndex) => {
    if (!userPattern.includes(dotIndex)) {
      dispatch(addUserPattern(dotIndex))
      setLinePoints((prevPoints) => [...prevPoints, DOT_COORDINATES[dotIndex]])
    }
  }, [dispatch, userPattern])

  const handleConfirmPattern = useCallback(() => {
    if (!isPatternSet) {
      dispatch(setPattern(userPattern));
    } else {
      const isValid = dispatch(validatePattern())
      if (isValid) {
        navigation.navigate('lock')
      } else {
        alert('Incorrect Pattern')
      }
    }
    dispatch(clearUserPattern())
    setLinePoints([]);
  }, [dispatch, isPatternSet, userPattern, navigation])

  const handleClearPattern = () => {
    dispatch(clearUserPattern())
    setLinePoints([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.zoomView}>
        <Text style={styles.title}>{isPatternSet ? 'Enter Pattern' : 'Set Pattern'}</Text>
        <Text>Draw an unlock pattern:</Text>

        <View style={styles.gridContainer}>
          <Svg height="120" width="120" style={StyleSheet.absoluteFill}>
            {linePoints.map((point, index) => {
              if (index === 0) return null
              const prevPoint = linePoints[index - 1]
              return (
                <Line
                  key={`line-${index}`}
                  x1={prevPoint.x}
                  y1={prevPoint.y}
                  x2={point.x}
                  y2={point.y}
                  stroke="#d3d3d3"
                  strokeWidth="3"
                />
              );
            })}
          </Svg>

          <View style={styles.grid}>
            {[...Array(9)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  userPattern.includes(index) && styles.activeDot,
                ]}
                onPress={() => handleDotPress(index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleClearPattern}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleConfirmPattern}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PatternLock

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  gridContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    height: 120,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
    margin: 10,
  },
  activeDot: {
    backgroundColor: '#d3d3d3',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  zoomView: {
    transform: [{ scale: 1.5 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
