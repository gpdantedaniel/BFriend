import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackgroundWrapper, BottomBackButton, SimpleInterfaceContainer, PrimaryButton, GhostButton, Title} from '../../components'
import styles from '../../assets/styles'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore, getDoc } from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'


const Events = ({ navigation, route }) => {
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

    // if (Object.keys(events).length > 0) {
    if (true) {
        return (
            <BackgroundWrapper>
                <Title title='Events'/>
                <Image style={{width: 360, height: 180, borderRadius: 25}} source={require('../../assets/images/eggs.jpg')} resizeMode="cover"/>

                <SimpleInterfaceContainer style={{ justifyContent: 'center', width: 360, marginTop: 20, borderRadius: 25, paddingBottom: 25, paddingTop: 10, backgroundColor: 'rgba(0, 0, 0, 0.25)', }}>
                    <View style={{alignItems: 'center', width: 300,}}>
                        <Text style={{...styles.bigHeading}}>Chez Bong</Text>
                        <Text style={{...styles.heading, marginBottom: 10}}>Korean Restaurant</Text>
                        <Text style={{fontFamily: 'Inter-Regular', fontSize: 15, color: 'white', textAlign: 'center', marginBottom: 0}}>Open 4:00pm to 11:00pm</Text>
                        <Text style={{fontFamily: 'Inter-Regular', fontSize: 15, color: 'white', textAlign: 'center', marginBottom: 20}}>Popular around 6:00pm</Text>
                        <Text style={{...styles.bodyText, marginBottom: 20}}>Ben, Veronica, and others are going!</Text>                        
                        
                    </View>       
                </SimpleInterfaceContainer>

                <SimpleInterfaceContainer style={{ justifyContent: 'center', width: 360, marginBottom: 20, marginTop: 20, borderRadius: 25, paddingBottom: 10, paddingTop: 10, backgroundColor: 'rgba(0, 0, 0, 0.25)', }}>
                    <PrimaryButton title='Open In Maps'/>
                    <View style={{flexDirection: 'row', width: 300, justifyContent: 'space-between'}}>
                        <GhostButton title='Leave' style={{width: 140}}/>
                        <GhostButton title='Change' style={{width: 140}}/>
                    </View>
                </SimpleInterfaceContainer>
            </BackgroundWrapper>
        )
    }

    return (
        <BackgroundWrapper>
            <Title title='Events'/>
            <SimpleInterfaceContainer style={{width: 300}}>
                <Icon name='ios-people-circle' size={120} color='white'/>
                <Text style={styles.bigHeading}>No event at the moment</Text>
                <Text style={styles.bodyText}>To create an event, go to one of your groups to start one!</Text>
                <PrimaryButton title='← Go To Groups' onPress={() => navigation.navigate()}/>
            </SimpleInterfaceContainer>
        </BackgroundWrapper>
    )
}

export default Events

// width: 360, paddingLeft: 30, paddingRight: 30, borderRadius: 25, backgroundColor: 'rgba(0, 0, 0, 0.25)', marginBottom: 20,

/*
<View style={{width: 230, height: 230, backgroundColor: '#3E3C73', justifyContent: 'center', alignItems: 'center', borderRadius: 25}}>
    <Icon name='people-circle-outline' size={150} color={'white'}/>
</View>
*/

// <Image style={{width: 230, height: 230, borderRadius: 25, elevation: 0, position: 'absolute'}} source={require('D:/Downloads/eggs.jpg')} resizeMode="cover"/>
//                     <Image style={{width: 360, height: 230, alignItems: 'center'}} source={require('D:/Downloads/grid.jpg')}/>
