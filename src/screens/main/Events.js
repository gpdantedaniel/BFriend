import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackgroundWrapper, BottomBackButton, SimpleInterfaceContainer, PrimaryButton, GhostButton} from '../../components'
import styles from '../../assets/styles'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore, getDoc } from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'


const Events = () => {
    const [events, setEvents] = useState([]);
    console.log('events: ', events);

    const fetchEventData = async (eventId) => {
        const eventDocRef = await doc(getFirestore(), 'events', eventId);
        return eventDocRef.data();
    }
    
    useEffect(() => {
        // Get the user's events ids under the property 'events'
        const currentUserUid = getAuth().currentUser.uid;
        const userDocRef = doc(getFirestore(), 'users', currentUserUid);

        getDoc(userDocRef).then((snapshot) => {
            if (snapshot.exists) {
                const data = snapshot.data();
                const eventIds = data.events;

                eventIds.map(eventId => {
                    const eventDocRef = doc(getFirestore(), 'events', eventId);
                    getDoc(eventDocRef).then((snapshot) => {
                        if (snapshot.exists) {
                            const data = snapshot.data();
                            const event = {[eventId]: data};
                            setEvents(loadedEvents => ({...loadedEvents, ...event}))
                        }
                    })
                })
            }
        })
    }, [])

    if (Object.keys(events).length > 0) {
        return (
            <BackgroundWrapper>
                
                <SimpleInterfaceContainer style={{backgroundColor: 'rgba(0, 0, 0, 0.25)', flex: 1, marginBottom: 20, marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 25,}}>
                    <View style={{width: 230, height: 230, backgroundColor: '#3E3C73', justifyContent: 'center', alignItems: 'center', borderRadius: 25}}>
                        <Icon name='people-circle-outline' size={150} color={'white'}/>
    
                    </View>
                    
                    <Text style={styles.bigHeading}>
                        {Object.values(events)[0].groupname} is getting together!          
                    </Text>
                    <Text style={styles.bodyText}>
                        Join quickly! Everyone's waiting for you!
                    </Text>
    
                    <Text style={styles.bigHeading}>
                        Waiting for more friends... 
                    </Text>
                    <Text style={styles.bodyText}>
                        {Object.values(events)[0].availableMembers.join(', ')}
                    </Text>
    
                    <GhostButton title='Leave'/>
       
                </SimpleInterfaceContainer>
            </BackgroundWrapper>
        )
    }

    return (
        <BackgroundWrapper/>
    )
 
}

export default Events

