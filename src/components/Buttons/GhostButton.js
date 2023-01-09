import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const GhostButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.ghostButton, ...style}}>
      <Text style={styles.ghostButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default GhostButton

const styles = StyleSheet.create({
  ghostButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',    
    backgroundColor: 'transparent',  
  },

  ghostButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
  },
})