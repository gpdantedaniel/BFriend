import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { BackgroundWrapper, SimpleInterfaceContainer, PrimaryButton, Title } from '../../components'
import styles from '../../assets/styles'
import { useSelector } from 'react-redux';
import { selectGroups } from '../../redux/slice/groupsSlice';

const FriendGroups = ({ navigation }) => {

  const groups = useSelector(selectGroups);

  /*
  const [groups, setGroups] = useState({});
  console.log('groups: ', groups);
  
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
  */

  if (Object.keys(groups).length !== 0) {
    return (
      <BackgroundWrapper>
        <Title title='Friend Groups'/>
        <SimpleInterfaceContainer style={{overflow: 'scroll', backgroundColor: 'rgba(0, 0, 0, 0.25)', width: 360, borderRadius: 25}}>

          <FlatList style={{ flex: 1, maxHeight: '100%', }} numColumns={1} horizontal={false} data={Object.keys(groups)} renderItem={({item}) => {
            return (
              <TouchableOpacity style={listStyles.listItem} onPress={() => navigation.navigate('Group', {groupId: item, data: groups[item]})}>
                <Icon name='people-circle-outline' size={30} color='white' style={{paddingRight: 12,}}/>
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                  <Text style={{...styles.bodyText, color: '#F2BE5C', textAlign: 'left'}} numberOfLines={1} ellipsizeMode='tail'>
                    {groups[item].groupname}
                  </Text>
                  <Text style={{fontFamily: 'Inter-Regular', fontSize: 12, color: 'white', textAlign: 'left', fontSize: 13}} numberOfLines={1} ellipsizeMode='tail'>
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

  glassMorphism: {
    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    backdropFilter: "blur(10px)",

  },

  listItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12, 
    borderBottomColor: 'white',

    width: 320,
    borderWidth: 0,
    borderColor: 'white',
    padding: 10,
    borderRadius: 10,
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