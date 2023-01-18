import { Text, View } from 'react-native'
import React from 'react'
import styles from '../../assets/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { BackgroundWrapper, BottomBackButton, SimpleInterfaceContainer, Title } from '../../components';

const HelpAndContact = ({ navigation }) => {
  return (
    <BackgroundWrapper>
      <Title title='Help & Contact'/>
      <SimpleInterfaceContainer style={{width: 300}}>
        <Icon name='chatbubble-ellipses' color={'white'} size={120}/>
        <Text style={styles.bodyText}>
          Need help? Just email us at the following address!
        </Text>
        <Text style={styles.bigHeading}>
          bfriend@gmail.com
        </Text>
      </SimpleInterfaceContainer>
      <BottomBackButton title='← Back' onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default HelpAndContact