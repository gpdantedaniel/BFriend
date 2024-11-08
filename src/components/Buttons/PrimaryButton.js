import {Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const PrimaryButton = ({title, style, onPress}) => {
  return (
    <TouchableOpacity style={{...styles.primaryButton, ...style}} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  primaryButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#1C25FF',
  },

  primaryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
  },
})