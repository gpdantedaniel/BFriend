import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackgroundWrapper, BottomBackButton, GhostButton, PrimaryButton, SimpleInterfaceContainer } from '../../components'
import styles from '../../assets/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { getAuth } from 'firebase/auth'
import { updateDoc, deleteDoc, doc, getFirestore, arrayUnion, } from 'firebase/firestore'

const EventInvitation = ({navigation, route}) => {
    const invitationData = route.params.invitationData;
    const invitationId = route.params.invitationId;

    const currentUserUid = getAuth().currentUser.uid;
    const eventId = invitationData.eventId;

    const onJoin = () => {
        // Add the group to the user's 'events' property
        const userDocRef = doc(getFirestore(), 'users', currentUserUid);
        const userDocUpdate = {events: arrayUnion(eventId)};
        updateDoc(userDocRef, userDocUpdate);

        // Add the user to the group's 'availableMembers' property
        const eventDocRef = doc(getFirestore(), 'events', eventId);
        const eventDocUpdate = {availableMembers: arrayUnion(currentUserUid)};
        updateDoc(eventDocRef, eventDocUpdate);

        // Remove the invitation from the user's 'eventInvitations' collection
        const eventInvitationDocRef = doc(getFirestore(), 'users', currentUserUid, 'eventInvitations', invitationId);
        deleteDoc(eventInvitationDocRef);

        navigation.navigate('Main');
    }

    const onDecline = () => {
        // Add the user to the group's 'unavailableMembers' property
        const eventDocRef = doc(getFirestore(), 'events', eventId);
        const eventDocUpdate = {unavailableMembers: arrayUnion(currentUserUid)};
        updateDoc(eventDocRef, eventDocUpdate);

        // Remove the invitation from the user's 'eventInvitations' collection
        const eventInvitationDocRef = doc(getFirestore(), 'users', currentUserUid, 'eventInvitations', invitationId);
        deleteDoc(eventInvitationDocRef);

        navigation.navigate('Main');
    }
    
    return (
        <BackgroundWrapper>
            <SimpleInterfaceContainer style={{width: 360, backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>
                
                <View style={{width: 230, height: 230, backgroundColor: '#3E3C73', justifyContent: 'center', alignItems: 'center', borderRadius: 25}}>
                    <Icon name='people-circle-outline' size={100} color={'white'}/>

                </View>
                
                <Text style={styles.bigHeading}>
                    The Magog Club is getting together!          
                </Text>
                <Text style={styles.bodyText}>
                    Join quickly! Everyone's waiting for you!
                </Text>

                <Text style={styles.bigHeading}>
                    Friends who joined:          
                </Text>
                <Text style={styles.bodyText}>
                    Tristan, Heng Rui, Jiayi, Andy...
                </Text>

                <PrimaryButton title='Join Event' onPress={() => onJoin()}/>
                <GhostButton title='Decline'/>

            </SimpleInterfaceContainer>
            <BottomBackButton onPress={() => navigation.goBack()}/>
        </BackgroundWrapper>
    )
}

export default EventInvitation

