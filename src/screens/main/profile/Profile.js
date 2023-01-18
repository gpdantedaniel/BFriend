import React from 'react'
import { Text } from 'react-native'
import { BackgroundWrapper, PrimaryButton, GhostButton, SimpleInterfaceContainer, Title} from '../../../components'
import styles from '../../../assets/styles'
import Icon from 'react-native-vector-icons/Ionicons';

import { getAuth, signOut } from 'firebase/auth';

import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../../redux/slice/userSlice'

const Profile = ({ navigation }) => {
  const userInfo = useSelector(selectUserInfo);  
  
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
        <Title title='Profile'/>
        <SimpleInterfaceContainer>
            <Icon name="ios-person-circle-outline" color={'white'} size={120}/>
            <Text style={styles.bigHeading}>{userInfo.username ? userInfo.username : ''}</Text>
            <Text style={styles.subHeading}>{userInfo.fullname ? userInfo.fullname : ''}</Text>
            <PrimaryButton title='Edit My Profile' onPress={() => navigation.navigate('EditProfile')}/>
            <GhostButton title='Sign Out' onPress={() => onSignOut()}/>
        </SimpleInterfaceContainer>
        <Text style={styles.helpAndContact} onPress={() => navigation.navigate('HelpAndContact')}>Help & Contact</Text>
    </BackgroundWrapper>
  )
}

export default Profile

