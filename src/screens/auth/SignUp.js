import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import styles from '../../assets/styles';

import { BackgroundWrapper, PrimaryButton, BottomBackButton, GhostTextInput, SimpleInterfaceContainer } from '../../components';

const SignUp = (props) => {
  const {navigation} = props;
  const [fullname, setFullname] = useState('');
  const [username, setUsername ] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setDoc(doc(getFirestore(), "users", userCredential.user.uid), {
        birthyear: birthyear,
        email: email, 
        fullname: fullname,
        username: username,        
      }).then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
        <Image source={require('../../assets/images/BFriend_logo.png')} style={styles.BFriendLogo}/>
        <Text style={styles.heading}>Create Your Account</Text>
        <GhostTextInput placeholder="Full Name" onChangeText={(fullname) => setFullname(fullname)}/>
        <GhostTextInput placeholder="Username" onChangeText={(username) => setUsername(username)}/>
        <GhostTextInput placeholder="Birth Year" onChangeText={(birthyear) => setBirthyear(birthyear)}/>
        <GhostTextInput placeholder="Email" onChangeText={(email) => setEmail(email)}/>
        <GhostTextInput placeholder="password"  onChangeText={(password) => setPassword(password)} secureTextEntry={true}/>
        <PrimaryButton title="Sign Up" onPress={() => onSignUp()}/>
      </SimpleInterfaceContainer>
      <BottomBackButton onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default SignUp