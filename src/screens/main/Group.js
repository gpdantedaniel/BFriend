import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { BackgroundWrapper, SimpleInterfaceContainer, GhostTextInput, PrimaryButton, BottomBackButton, GhostButton } from '../../components'
import styles from '../../assets/styles'
import { addDoc, collection, doc, deleteDoc, getFirestore, onSnapshot, updateDoc, arrayRemove, deleteField, arrayUnion } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const Group = ({ navigation, route }) => {
  const groupData = route.params.data;
  console.log('groupData: ', groupData);
  console.log(groupData.members.length);
  console.log(groupData.members[0]);

  const onLeave = () => {
    const groupId = route.params.groupId;
    const currentUserUid = getAuth().currentUser.uid;
    const groupDocRef = doc(getFirestore(), 'groups', groupId);
    const soleUser = groupData.members.length === 1 && groupData.members[0] == currentUserUid;
    console.log('currentUserUid: ', currentUserUid);

    const groupDocAction = soleUser ? (
      deleteDoc(groupDocRef)
    ) : (
      updateDoc(groupDocRef, {members: arrayRemove(currentUserUid)})
    );

    console.log('groupDocAction: ', groupDocAction);
    groupDocAction.then(() => {
      const userDocRef = doc(getFirestore(), 'users', currentUserUid);
      updateDoc(userDocRef, {groups: arrayRemove(groupId)}).then(() => {
        navigation.navigate('FriendGroups');
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  const onStartEvent = async () => {
    const currentUserUid = getAuth().currentUser.uid;

    // Create the unconfirmed event document
    const eventsColRef = collection(getFirestore(), 'events');
    const eventData = {
      availableMembers: [currentUserUid],
      unavailableMembers: [],
      allMembers: groupData.members,
      groupId: route.params.groupId,
      groupname: groupData.groupname,
      confirmed: false,
    };

    const eventDoc = await addDoc(eventsColRef, eventData);
    const eventId = eventDoc.id;

    console.log('eventId: ', eventId);
    
    // Send an invitation to every user's 'eventIntiations' collection
    groupData.members.forEach(memberId => {
      const eventInvitationsColRef = collection(getFirestore(), 'users', memberId, 'eventInvitations');      
      addDoc(eventInvitationsColRef, {
        eventId: eventId,
        groupId: route.params.groupId,
        groupname: groupData.groupname,
        members: groupData.members,
      }).catch((error) => {
        console.log(error);
      })  
    })
    
    // Add the eventId to the user's 'events' property
    const currentUserDocRef = doc(getFirestore(), 'users', currentUserUid);
    const update = {events: arrayUnion(eventId)};
    updateDoc(currentUserDocRef, update).catch((error) => {
      console.log(error)
    });

    // Add the eventId to the group's 'eventId' property
    const groupDocRef = doc(getFirestore(), 'groups', route.params.groupId);
    const groupDocUpdate = {eventId: eventId};
    updateDoc(groupDocRef, groupDocUpdate).catch((error) => {
      console.log(error)
    });

    navigation.navigate('Events');

  }
  
  if (Object.keys(groupData).length !== 0) {
    return (
      <BackgroundWrapper>
        <View style={{flexDirection: 'column', overflow: 'scroll', display: 'flex', maxHeight: '100%', flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        
          <View style={{...localStyles.translucidInterface, flex: 1, marginTop: 20, marginBottom: 10,}}>

            <View style={{alignItems: 'flex-start', width: 300}}>
              <Text style={{...styles.bigHeading, fontSize: 19}}>{groupData.groupname}</Text>
              
              <FlatList 
                style={{overflow: 'hidden', maxWidth: '100%'}}
                numColumns={1} 
                horizontal={false} 
                data={groupData.members}  
                renderItem={({item}) => (
                <TouchableOpacity style={{paddinTop: 10, height: 30, justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}} >
                    <Icon name='person' size={15} color='white'/>
                    <Text style={{...styles.bodyText, fontSize: 13, paddingLeft: 10}} numberOfLines={1} ellipsizeMode='tail'>{item}{item}</Text>
                  </View>
                </TouchableOpacity>
              )}/>

            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 300}}>
              <GhostButton title='Leave' style={{width: 140}} onPress={() => onLeave()}/>
              <GhostButton title='Add' onPress={() => navigation.navigate('AddFriend', {groupId: route.params.groupId, groupData})} style={{width: 140}}/>
            </View>
          </View>
  
          <View style={{...localStyles.translucidInterface, marginTop: 10, marginBottom: 20,}}>
                    
            { true ? (
              <View style={{alignItems: 'flex-start', width: 300}}>
                <Text style={{...styles.bigHeading, fontSize: 19}}>
                  Group Event
                </Text>
                <Text style={{...styles.bodyText, paddingTop: 7, paddingBottom: 7, textAlign: 'left'}}>
                  No event at the moment... 😔
                </Text>
                <Text style={{...styles.bodyText, paddingTop: 7, paddingBottom: 7, textAlign: 'left'}}>
                  Tell the others that you’re ready to do something today!
                </Text>
                <PrimaryButton title="Let's do something!" style={{marginTop: 10, marginBottom: 0,}} onPress={() => onStartEvent()}/>
              </View>
            ):(
              <Text>Event!</Text>
            )}
  
          </View>
        </View>
        <BottomBackButton onPress={() => navigation.goBack()}/>

      </BackgroundWrapper>
    )
  }

  return (
    <BackgroundWrapper/>
  )
  
}

export default Group

const localStyles = StyleSheet.create({
  translucidInterface: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,

    /*
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    height: '50%',
    borderRadius: 25,
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    */
  }
})

/*
*/