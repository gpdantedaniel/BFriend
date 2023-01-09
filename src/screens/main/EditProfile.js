import { Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'

import { BackgroundWrapper, PrimaryButton, GhostButton, GhostTextInput, BottomBackButton, SimpleInterfaceContainer } from '../../components'

const EditProfile = ({ navigation, route }) => {
  const [username, setUsername] = useState(route.params.username);
  const [fullname, setFullname] = useState(route.params.fullname);

  const onSaveChanges = () => {
    const currentUser = getAuth().currentUser;
    const docRef = doc(getFirestore(), 'users', currentUser.uid);
    updateDoc(docRef, {username, fullname}).then(() => {
      navigation.navigate('Profile');
    })
  };

  return ( 
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
        <Image source={require('../../assets/images/BFriend_logo.png')} style={styles.BFriendLogo}/>
        <Text style={styles.heading}>Edit My Profile</Text>
        <GhostTextInput placeholder="Username" value={username} onChangeText={(username) => setUsername(username)}/>
        <GhostTextInput placeholder="Full Name" value={fullname} onChangeText={(fullname) => setFullname(fullname)}/>
        <PrimaryButton title="Save Changes" onPress={() => onSaveChanges()}/>
        <GhostButton title="Change Password" onPress={() => navigation.navigate('ChangePassword')}/>
        <GhostButton title="Delete Account" onPress={() => navigation.navigate('DeleteAccount')}/>
      </SimpleInterfaceContainer>
      <BottomBackButton onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default EditProfile
