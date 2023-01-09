import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const GhostTextInput = ({placeholder, value, style, onChangeText, secureTextEntry=false}) => {
  return (
    <TextInput 
      placeholder={placeholder} 
      value={value} 
      onChangeText={onChangeText} 
      secureTextEntry={secureTextEntry} 
      style={{...styles.textInput, ...style}}  
      placeholderTextColor='white' 
    />
  )
}

export default GhostTextInput

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    height: 40,
    borderBottomWidth: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomColor: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
  },
}) 