import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const BottomBackButton = ({title='← Back', style, onPress}) => {
  return (
    <TouchableOpacity style={{...styles.bottomBackButton, ...style}} onPress={onPress}>
      <Text style={styles.bottomBackButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default BottomBackButton

const styles = StyleSheet.create({
  bottomBackButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60, 
    width: '100%',
    borderTopWidth: 1, 
    borderTopColor: 'white', 
  },

  bottomBackButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
  },
})


