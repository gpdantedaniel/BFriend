    import { StyleSheet, Text, View, FlatList, TouchableOpacity,  } from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { BackgroundWrapper, SimpleInterfaceContainer } from '../../components'
    import styles from '../../assets/styles'
    import Icon from 'react-native-vector-icons/Ionicons'
    import { getAuth } from 'firebase/auth'
    import { collection, getDocs, getFirestore } from 'firebase/firestore'

    const Notifications = ({ navigation, route }) => {
        const [groupInvitations, setGroupInvitations] = useState({});   
        const [eventInvitations, setEventInvitations] = useState({});
        console.log(groupInvitations);
        console.log(eventInvitations);

        useEffect(() => {
            const currentUserUid = getAuth().currentUser.uid;        
            const groupInvitationsColRef = collection(getFirestore(), 'users', currentUserUid, 'groupInvitations');
            const eventInvitationsColRef = collection(getFirestore(), 'users', currentUserUid, 'eventInvitations');

            getDocs(groupInvitationsColRef).then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    const invitationId = doc.id;
                    const data = doc.data();
                    const invitation = {[invitationId]: data};
                    setGroupInvitations(loadedInvitations => ({...loadedInvitations, ...invitation}));
                })
            });

            getDocs(eventInvitationsColRef).then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    const invitationId = doc.id;
                    const data = doc.data();
                    const invitation = {[invitationId]: data};
                    setEventInvitations(loadedInvitations => ({...loadedInvitations, ...invitation}));
                })
            })
        }, [])
        
        console.log('Object.keys(groupInvitations).length: ', Object.keys(groupInvitations).length);
        if (true) {
            return (
                <BackgroundWrapper>
                    <SimpleInterfaceContainer style={{overflow: 'scroll', backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>
                        <FlatList style={{ flex: 1, width: 360, maxHeight: '100%',}} numColumns={1} horizontal={false} data={Object.keys(groupInvitations)} renderItem={({item}) => {
                            return (
                            <TouchableOpacity style={listStyles.listItem} onPress={() => navigation.navigate('Invitation', {invitationId: item, invitationData: groupInvitations[item]})}>
                                <Icon name='mail' size={30} color='white' style={{paddingRight: 12,}}/>
                                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                <Text style={{...styles.bodyText, color: '#F2BE5C', textAlign: 'left'}} numberOfLines={1} ellipsizeMode='tail'>
                                    An invitation to {groupInvitations[item].groupname}
                                </Text>
                                <Text style={{...styles.bodyText, textAlign: 'left', fontSize: 13}} numberOfLines={1} ellipsizeMode='tail'>
                                From: {groupInvitations[item].author}
                                </Text>
                                </View>
                            </TouchableOpacity>
                            )
                        }}/>

                        <FlatList style={{ flex: 1, width: 360, maxHeight: '100%',}} numColumns={1} horizontal={false} data={Object.keys(eventInvitations)} renderItem={({item}) => {
                            return (
                            <TouchableOpacity style={listStyles.listItem} onPress={() => navigation.navigate('EventInvitation', {invitationId: item, invitationData: eventInvitations[item]})}>
                                <Icon name='md-happy' size={30} color='white' style={{paddingRight: 12,}}/>
                                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                <Text style={{...styles.bodyText, color: '#F2BE5C', textAlign: 'left'}} numberOfLines={1} ellipsizeMode='tail'>
                                    {eventInvitations[item].groupname} is gathering!
                                </Text>
                                <Text style={{...styles.bodyText, textAlign: 'left', fontSize: 13}} numberOfLines={1} ellipsizeMode='tail'>
                                    Quick! Your friends could be gathering!
                                </Text>
                                </View>
                            </TouchableOpacity>
                            )
                        }}/>

                    </SimpleInterfaceContainer>
                </BackgroundWrapper>
            )
        }

        return (
            <BackgroundWrapper>
                <SimpleInterfaceContainer>
                    <Icon name='notifications' color={'white'} size={120}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.bigHeading}>No notifications...</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.subHeading}>We'll let you know when there's something new!</Text>
                    </View>
                    
                </SimpleInterfaceContainer>
            </BackgroundWrapper>
        )
    }

    export default Notifications

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