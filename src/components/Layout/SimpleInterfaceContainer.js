import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SimpleInterfaceContainer = ({ children, style }) => {
  return (
    <View style={{...styles.simpleInterfaceContainer, ...style}}>
      { (Array.isArray(children) ? children : [children]).map((child, index) => (
          <View key={index} style={{paddingTop: 10, paddingBottom: 10}}>{ child }</View>
        )
      )}
    </View>
  )
}

export default SimpleInterfaceContainer

const styles = StyleSheet.create({
  simpleInterfaceContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignText: 'center',
  }
})