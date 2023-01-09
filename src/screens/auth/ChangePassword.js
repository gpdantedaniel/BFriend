import { Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import styles from '../../assets/styles';

import { BackgroundWrapper, PrimaryButton, BottomBackButton, GhostTextInput, SimpleInterfaceContainer } from '../../components';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const onChangePassword = () => {
    navigation.navigate("EmailSent");
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.navigate("EmailSent");
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
        <Image source={require('../../assets/images/BFriend_logo.png')} style={styles.BFriendLogo}/>
        <Text style={styles.heading}>Change Your Password</Text>
        <GhostTextInput placeholder="Email" onChangeText={(email) => setEmail(email)}/>
        <PrimaryButton title='Send Email' onPress={() => onChangePassword()}/>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>We'll send you an email with further instructions!</Text>
        </View>
      </SimpleInterfaceContainer> 
      <Text style={styles.helpAndContact} onPress={() => navigation.navigate('helpAndContact')}>Help & Contact</Text>
      <BottomBackButton onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default ResetPassword