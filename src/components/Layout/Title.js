import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeading} numberOfLines={1}>
        {props.title}
      </Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  titleHeading: {
    color: 'white',
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    textAlign: 'center'
  },
})