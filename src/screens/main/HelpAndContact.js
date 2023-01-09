import { Text, View } from 'react-native'
import React from 'react'
import styles from '../../assets/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { BackgroundWrapper, BottomBackButton, SimpleInterfaceContainer } from '../../components';

const HelpAndContact = ({ navigation }) => {
  return (
    <BackgroundWrapper>
      <SimpleInterfaceContainer>
        <Icon name='chatbubble-ellipses' color={'white'} size={120}/>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>Need help? Just email us at the following address!</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bigHeading}>bfriend@gmail.com</Text>
        </View>
      </SimpleInterfaceContainer>
      <BottomBackButton title='← Back' onPress={() => navigation.goBack()}/>
    </BackgroundWrapper>
  )
}

export default HelpAndContact