import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackgroundWrapper, BottomBackButton, PrimaryButton, SimpleInterfaceContainer, GhostButton} from '../../components'
import styles from '../../assets/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { doc, getFirestore, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const Invitation = ({ navigation, route }) => {
    const invitationId = route.params.invitationId;
    const invitationData = route.params.invitationData;

    const onAccept = () => {
        // Add the group in the user's 'groups'
        const currentUserUid = getAuth().currentUser.uid;
        const userDocRef = doc(getFirestore(), 'users', currentUserUid);
        const update = {groups: arrayUnion(invitationData.groupId)};

        updateDoc(userDocRef, update).then(() => {
            // Add the user in the group's 'members'
            const groupDocRef = doc(getFirestore(), 'groups', invitationData.groupId);
            const update = {members: arrayUnion(currentUserUid)};

            updateDoc(groupDocRef, update).then(() => {
                // Remove the invitation from the user's 'groupInvitations' collection
                const invitationDocRef = doc(getFirestore(), 'users', currentUserUid, 'groupInvitations', invitationId);
                
                deleteDoc(invitationDocRef).then(() => {
                    // Send the user to the 'Main' screen
                    navigation.navigate('Main');
                })
            })
        })
    }

    const onDecline = () => {
        // Remove the invitation from the user's 'groupInvitations' collection
        const currentUserUid = getAuth().currentUser.uid;
        const invitationDocRef = doc(getFirestore(), 'users', currentUserUid, 'groupInvitations', invitationId);
        
        deleteDoc(invitationsDocRef).then(() => {
            // Send the user to the 'Main Screen'
            navigation.navigate('Main');
        })
    }

    return (
        <BackgroundWrapper>
            <SimpleInterfaceContainer style={{width: 300}}>
                <Icon name='people-circle-outline' color={'white'} size={120}/>
                <Text style={styles.heading}>{invitationData.author} is inviting you to</Text>
                <Text style={styles.bigHeading}>{invitationData.groupname}</Text>
                <Text style={{...styles.bodyText, fontStyle: 'italic'}}>{invitationData.message}</Text> 
                <PrimaryButton title='Accept' onPress={() => onAccept()}/>
                <GhostButton title='Decline' onPress={() => onDecline()}/>
                <Text style={styles.bodyText}>Careful! Make sure you know this person.</Text>
            </SimpleInterfaceContainer>
            <BottomBackButton onPress={() => navigation.goBack()}/>
        </BackgroundWrapper>
    )
}

export default Invitation

// const styles = StyleSheet.create({})