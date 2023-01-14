import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { BackgroundWrapper, SimpleInterfaceContainer, PrimaryButton } from '../../components'
import styles from '../../assets/styles'
import { collection, doc, documentId, getDoc, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FriendGroups = ({ navigation }) => {
  const [groups, setGroups] = useState({});
  console.log('groups: ', groups);

  /*
  const getUser = (userID) => {
    const docRef = doc(getFirestore(), 'users', userID);
    getDoc(docRef).then((userDoc) => {
      if (userDoc.exists) {
        const data = userDoc.data();
        console.log(data.username);
        return data.username;
      }
    })
  }

  const getGroup = (groupID) => {
    const docRef = doc(getFirestore(), 'groups', groupID);
    onSnapshot(docRef, (doc) => {
      if (doc.exists) {
        const data = doc.data();
        const newGroup = {[groupID]: data};
        setGroups(currentGroups => ({...currentGroups, ...newGroup}))
      }
    })
  }
  */

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    const docRef = doc(getFirestore(), 'users', currentUser.uid);

    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        const groupIds = data.groups;

        groupIds.map(groupId => {
          const docRef = doc(getFirestore(), 'groups', groupId);

          getDoc(docRef).then((snapshot) => {
            if (snapshot.exists) {
              const data = snapshot.data();
              const group = {[groupId]: data};
              setGroups(loadedGroups => ({...loadedGroups, ...group}))
            }
          })
        })
        
      }
    })


    const getGroupsData = async (groups) => {
      return groups.map(group => {
        const docRef = doc(getFirestore(), 'groups', groupId);
          getDoc(docRef).then((snapshot) => {
            if (snapshot.exists) {
              const data = snapshot.data();
              return data;
            }
          })
      })
    }

 
    
    const fetchGroupInvitations = async (uid) => {
      const colGroupInvitationsRef = collection(getFirestore(), 'users', uid, 'groupInvitations');
      const q = query(colGroupInvitationsRef);
  
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({type: 'invitation', invitationId: doc.id, ...doc.data()}));
    }

  }, [])

  if (Object.keys(groups).length !== 0) {
    return (
      <BackgroundWrapper>
        <SimpleInterfaceContainer style={{overflow: 'scroll', backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>

          <FlatList style={{ flex: 1, width: 360, maxHeight: '100%',}} numColumns={1} horizontal={false} data={Object.keys(groups)} renderItem={({item}) => {
            return (
              <TouchableOpacity style={listStyles.listItem} onPress={() => navigation.navigate('Group', {groupId: item, data: groups[item]})}>
                <Icon name='people-circle-outline' size={30} color='white' style={{paddingRight: 12,}}/>
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                  <Text style={{...styles.bodyText, color: '#F2BE5C', textAlign: 'left'}} numberOfLines={1} ellipsizeMode='tail'>
                    {groups[item].groupname}
                  </Text>
                  <Text style={{...styles.bodyText, textAlign: 'left', fontSize: 13}} numberOfLines={1} ellipsizeMode='tail'>
                    {groups[item].eventId === '' ? 'No event happening yet' : 'An event is happening!'}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}/>
           
        </SimpleInterfaceContainer>
        <PrimaryButton style={{marginBottom: 20, marginTop: 20, position: 'relative'}} title='+ Create Group' onPress={() => navigation.navigate("GroupCreation")}/>
      </BackgroundWrapper>
    )
  }

  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
        <Icon name="people-circle-outline" color={'white'} size={120}/>
        <View style={styles.textContainer}>
          <Text style={styles.bigHeading}>Let's get started!</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>Bring your friends to BFriend and create a friend group.</Text>
        </View>
        <PrimaryButton title='+ Create Group' onPress={() => navigation.navigate("GroupCreation")}/>
      </SimpleInterfaceContainer>
    </BackgroundWrapper>
  )
}

export default FriendGroups

const listStyles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12, 
  }
})

/*
<FlatList numColumns={1} horizontal={false} data={Object.keys(groups)} renderItem={({item}) => (
  <TouchableOpacity style={listStyles.listItem} onPress={() => navigation.navigate('Group', {groupID: item, data: groups[item]})}>
    <Icon name='people-circle-outline' size={30} color='white' />
    <View style={{flexDirection: 'column', justifyContent: 'center', paddingLeft: 12}}>
      <Text style={{...styles.bodyText, color: '#F2BE5C', textAlign: 'left', width: 280}} numberOfLines={1} ellipsizeMode='tail'>
        {groups[item].groupname}
      </Text>
      <Text style={{...styles.bodyText, textAlign: 'left', fontSize: 13}} numberOfLines={1} ellipsizeMode='tail'>
        Most recent text message Most recent text message
      </Text>
    </View>
  </TouchableOpacity>
)}/>
*/