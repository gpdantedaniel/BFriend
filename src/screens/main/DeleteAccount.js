import { Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { BackgroundWrapper, PrimaryButton, BottomBackButton, GhostTextInput, SimpleInterfaceContainer } from '../../components'
import { doc, getFirestore, deleteDoc } from 'firebase/firestore';

const DeleteAccount = ({ navigation }) => {

  const [password, setPassword] = useState('');

  const onDeleteAccount = () => {
    const currentUser = getAuth().currentUser;
    const email = currentUser.email;
    
    const credential = EmailAuthProvider.credential(email, password);
    reauthenticateWithCredential(currentUser, credential).then(() => {
      const docRef = doc(getFirestore(), "users", currentUser.uid);
      deleteDoc(docRef).then(() => {
        deleteUser(currentUser).catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <BackgroundWrapper source={require('../../assets/images/BFriend_bg.png')} resizeMode="cover" style={styles.backgroundImage}>
      <SimpleInterfaceContainer>
        <Icon name="ios-warning" color={'white'} size={120}/>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Careful! Are you sure you want to do this?</Text>
        </View>
        <GhostTextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
        <PrimaryButton title='Delete Account' onPress={() => onDeleteAccount()}/>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>To delete your account, you must enter your password.</Text>
        </View>
      </SimpleInterfaceContainer> 
      <BottomBackButton onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default DeleteAccount
