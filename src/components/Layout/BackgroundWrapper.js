import { View, ImageBackground, StyleSheet } from 'react-native';
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BackgroundWrapper = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{...safeViewStyles(insets), overflow: 'hidden'}}>
      <ImageBackground source={require('../../assets/images/BFriend_bg.png')} resizeMode="cover" style={{...styles.backgroundImage, ...style}}>
        {children}
      </ImageBackground>
    </View>
  )
}

export default BackgroundWrapper

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
  } 
})

const safeViewStyles = (insets) => {
  return ({
    flex: 1,
    // Paddings to handle safe area
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    backgroundColor: '#101474',
  })
}