import React, { useState } from 'react'
import { Text, Image } from 'react-native'
import { BackgroundWrapper, PrimaryButton, GhostButton, GhostTextInput, BottomBackButton, SimpleInterfaceContainer, Title } from '../../../components'
import styles from '../../../assets/styles'

import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, setUsernameAndFullname } from '../../../redux/slice/userSlice'

const EditProfile = ({ navigation, route }) => {
  const userInfo = useSelector(selectUserInfo);
  const [newUsername, setNewUsername] = useState(userInfo.username);
  const [newFullname, setNewFullname] = useState(userInfo.fullname);
  const dispatch = useDispatch();

  const onSaveChanges = () => {
    // If nothing changed, go back and return without overwriting information
    if (userInfo.username === newUsername && userInfo.fullname === newFullname) {navigation.goBack(); return}

    dispatch(setUsernameAndFullname({newUsername, newFullname})).then(() => {
      navigation.goBack();
    }).catch((error) => {
      console.log(error);
    })
  };

  return ( 
    <BackgroundWrapper>
      <Title title='Edit Profile'/>
      <SimpleInterfaceContainer>
        <Image source={require('../../../assets/images/BFriend_logo.png')} style={styles.BFriendLogo}/>
        <Text style={styles.heading}>Account Details</Text>
        <GhostTextInput placeholder="Username" value={newUsername} onChangeText={(username) => setNewUsername(username)}/>
        <GhostTextInput placeholder="Full Name" value={newFullname} onChangeText={(fullname) => setNewFullname(fullname)}/>
        <PrimaryButton title="Save Changes" onPress={() => onSaveChanges()}/>
        <GhostButton title="Change Password" onPress={() => navigation.navigate('ChangePassword')}/>
        <GhostButton title="Delete Account" onPress={() => navigation.navigate('DeleteAccount')}/>
      </SimpleInterfaceContainer>
      <BottomBackButton onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default EditProfile
