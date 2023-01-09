import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { BackgroundWrapper, SimpleInterfaceContainer, GhostTextInput, PrimaryButton, BottomBackButton, GhostButton } from '../../components'
import styles from '../../assets/styles'
import { doc, getFirestore, onSnapshot, updateDoc, arrayRemove, deleteField } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const Group = ({ navigation, route }) => {
  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    const groupID = route.params.groupID;
    const docRef = doc(getFirestore(), 'groups', groupID);

    onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        console.log('groupdata: ', data);
        setGroupData(data);
      }
    })
  }, [])


  const onLeaveGroup = () => {
    const groupId = route.params.groupID;
    const currentUser = getAuth().currentUser; 
    const groupDocRef = doc(getFirestore(), 'groups', groupId);

    updateDoc(groupDocRef, {users: arrayRemove(currentUser.uid)}).then(() => {
      const userDocRef = doc(getFirestore(), 'users', currentUser.uid);
      const docUpdate = {[`groups.${route.params.groupID}`]: deleteField()};

      updateDoc(userDocRef, docUpdate).then(() => {
        navigation.navigate('FriendGroups');
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  
  if (Object.keys(groupData).length !== 0) {
    return (
      <BackgroundWrapper>
        <SimpleInterfaceContainer style={{flex: 1}}>
        
          <View style={{...localStyles.translucidInterface,}}>
            <View style={{alignItems: 'flex-start', width: 300}}>
              <Text style={{...styles.bigHeading, fontSize: 19}}>{groupData.groupname}</Text>
              
              <FlatList 
                style={{overflow: 'hidden', maxWidth: '100%', minHeight: 150, maxHeight: 300}}
                numColumns={1} 
                horizontal={false} 
                data={groupData.users}  
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
              <GhostButton title='Leave' style={{width: 140}} onPress={() => onLeaveGroup()}/>
              <GhostButton title='Add' onPress={() => navigation.navigate('AddFriend', {groupId: route.params.groupID, groupData})} style={{width: 140}}/>
            </View>
          </View>
  
          <View style={localStyles.translucidInterface}>
                    
            { true ? (
              <View style={{alignItems: 'flex-start', width: 300,}}>
                <Text style={{...styles.bigHeading, fontSize: 19}}>
                  Group Event
                </Text>
                <Text style={{...styles.bodyText, paddingTop: 7, paddingBottom: 7, textAlign: 'left'}}>
                  No event at the moment... 😔
                </Text>
                <Text style={{...styles.bodyText, paddingTop: 7, paddingBottom: 7, textAlign: 'left'}}>
                  Tell the others that you’re ready to do something today!
                </Text>
                <PrimaryButton title="Let's do something!" style={{marginTop: 10, marginBottom: 0,}} onPress={() => navigation.navigate(' ')}></PrimaryButton>
              </View>
            ):(
              <Text>Event!</Text>
            )}
  
          </View>
        </SimpleInterfaceContainer>
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
    borderRadius: 25,
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    

  }
})
