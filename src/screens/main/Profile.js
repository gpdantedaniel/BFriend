import { Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../../assets/styles'
import { getAuth, signOut } from 'firebase/auth'
import { doc, getFirestore, onSnapshot, getDoc } from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons';

import { BackgroundWrapper, PrimaryButton, GhostButton, SimpleInterfaceContainer} from '../../components'

const Profile = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  console.log('userInfo: ', userInfo);

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    const docRef = doc(getFirestore(), 'users', currentUser.uid);
    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setUserInfo(data);
        
      }
    })
  }, [])

  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("Signed out!");
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <BackgroundWrapper>
        <SimpleInterfaceContainer>
            <Icon name="ios-person-circle-outline" color={'white'} size={120}/>
            <Text style={styles.bigHeading}>{userInfo.username ? userInfo.username : ''}</Text>
            <Text style={styles.subHeading}>{userInfo.fullname ? userInfo.fullname : ''}</Text>
            <PrimaryButton title='Edit My Profile' onPress={() => navigation.navigate('EditProfile', {username: userInfo.username, fullname: userInfo.fullname})}/>
            <GhostButton title='Sign Out' onPress={() => onSignOut()}/>
        </SimpleInterfaceContainer>
        <Text style={styles.helpAndContact} onPress={() => navigation.navigate('HelpAndContact')}>Help & Contact</Text>
    </BackgroundWrapper>
  )
}

export default Profile

