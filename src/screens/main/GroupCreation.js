import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { BackgroundWrapper, SimpleInterfaceContainer, PrimaryButton, GhostTextInput, BottomBackButton } from '../../components'
import { doc, addDoc, collection, getFirestore, arrayUnion, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const GroupCreation = ({ navigation }) => {
  const [groupname, setGroupname] = useState('');

  const onAddGroup = (currentUserUid) => {
    const docRef = doc(getFirestore(), 'users', currentUser.uid);
    updateDoc(docRef, {username, fullname}).then(() => {
      navigation.navigate('Profile');
    })
  }

  const onCreateGroup = () => {
    const currentUser = getAuth().currentUser;
    const groupColRef = collection(getFirestore(), 'groups');
    const groupInfo = {groupname: groupname, users: [currentUser.uid]};

    addDoc(groupColRef, groupInfo).then((groupDocRef) => {      
      const docRef = doc(getFirestore(), 'users', currentUser.uid);
      const userGroupsUpdate = {
        [`groups.${groupDocRef.id}`]: {
          groupname: groupname
        }
      }

      updateDoc(docRef, userGroupsUpdate).then((result) => {
        console.log(result)
        navigation.goBack();

      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  
  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
      <Icon name="people-circle-outline" color={'white'} size={120}/>
        <Text style={styles.bigHeading}>Create Your Group</Text>
        <Text style={styles.bodyText}>Give your friend group a name!</Text>
        <GhostTextInput placeholder='Group Name' onChangeText={(groupname) => setGroupname(groupname)}/>
        <PrimaryButton style={{marginBottom: 60}} title='+ Create Group' onPress={() => onCreateGroup()}/>
      </SimpleInterfaceContainer>
      <BottomBackButton onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default GroupCreation

