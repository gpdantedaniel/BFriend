import { Text, View, Image } from 'react-native'
import React from 'react'
import styles from '../../assets/styles';

import { BackgroundWrapper, BottomBackButton, SimpleInterfaceContainer } from '../../components';


const EmailSent = ({ navigation }) => {
  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
        <Image source={require('../../assets/images/BFriend_logo.png')} style={styles.BFriendLogo}/>
        <View style={styles.textContainer}>
          <Text style={styles.bigHeading}>Email Sent!</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>An email was sent for you to reset your password!</Text>
        </View>
      </SimpleInterfaceContainer>
      <BottomBackButton onPress={() => navigation.popToTop()}/>
    </BackgroundWrapper>
  )
}

export default EmailSent