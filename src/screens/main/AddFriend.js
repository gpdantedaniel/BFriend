import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BackgroundWrapper, BottomBackButton, SimpleInterfaceContainer, GhostTextInput, PrimaryButton } from '../../components'
import styles from '../../assets/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { collection, getDocs, getFirestore, where, query, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const AddFriend = ({ navigation, route }) => { 
  const groupId = route.params.groupId;
  const groupData = route.params.groupData;

  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  console.log('groupData: ', groupData);
  console.log('groupId: ', groupId);

  const onSend = () => {
    const usersColRef = collection(getFirestore(), 'users');
    const q = query(usersColRef, where('username', '==', recipient));

    getDocs(q).forEach((doc) => {
      const recipientId = doc.id;
      const authorUid = getAuth().currentUser.uid;
      const groupInvitationsColRef = collection(getFirestore(), 'users', recipientId, 'groupInvitations');

      addDoc(groupInvitationsColRef, {
        groupId: groupId,
        groupname: groupData.groupname,
        author: authorUid,
        message: message,
      }).then(() => {
        navigation.goBack();
      })

    })
      
  }

  const onSendInvitation = async () => {
    console.log('recipient: ', recipient);
    console.log('message: ', message);

    const colUsersRef = collection(getFirestore(), 'users');
    const q = query(colUsersRef, where('username', '==', recipient));
    
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const recipientId = doc.id;
      const colGroupInvitationsRef = collection(getFirestore(), 'users', recipientId, 'groupInvitations');
      
      addDoc(colGroupInvitationsRef, {
        author: 'author',
        message: message,
        groupname: groupData.groupname,
        groupId: groupId,
      })
    })
  }

  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
        <Icon name="paper-plane" color={'white'} size={120}/>
        <Text style={styles.heading}>Invitation to join</Text>

        <Text style={styles.bigHeading}>{groupData.groupname}</Text>

        <GhostTextInput placeholder="Recipient Username" style={styles.textInput} onChangeText={(recipient) => setRecipient(recipient)}/>
        <GhostTextInput placeholder="Message" style={styles.textInput} onChangeText={(message) => setMessage(message)}/>

        <PrimaryButton title='Send Invitation' onPress={() => onSendInvitation()}/>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>Careful! Make sure you know this person.</Text>
        </View>
      </SimpleInterfaceContainer>
      <BottomBackButton onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default AddFriend

