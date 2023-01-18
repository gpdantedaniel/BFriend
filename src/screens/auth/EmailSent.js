import { Text, View, Image } from 'react-native'
import React from 'react'
import styles from '../../assets/styles';
import Icon from 'react-native-vector-icons/Ionicons'

import { BackgroundWrapper, BottomBackButton, SimpleInterfaceContainer } from '../../components';


const EmailSent = ({ navigation }) => {
  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer style={{width: 300}}>
        <Icon name='mail' size={120} color='white'/>
        <Text style={styles.bigHeading}>
          Email Sent!
        </Text>
        <Text style={styles.bodyText}>
          An email was sent for you to reset your password!
        </Text>
      </SimpleInterfaceContainer>
      <BottomBackButton onPress={() => navigation.popToTop()}/>
    </BackgroundWrapper>
  )
}

export default EmailSent