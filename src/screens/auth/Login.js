import { React, useState } from 'react';
import { Text, View, TextInput, ImageBackground, Image } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../assets/styles';

import { BackgroundWrapper, PrimaryButton, GhostButton, GhostTextInput, SimpleInterfaceContainer } from '../../components';
 
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
    const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <BackgroundWrapper>
            <SimpleInterfaceContainer>
                <Image source={require('../../assets/images/BFriend_logo.png')} style={styles.BFriendLogo}/>
                <GhostTextInput placeholder='Email' onChangeText={(email) => setEmail(email)}/>
                <GhostTextInput placeholder='Password' onChangeText={(password) => setPassword(password)} secureTextEntry={true}/>
                <PrimaryButton title={'Login'} onPress={() => onLogin()}/>
                <Text style={styles.bodyText} onPress={() => navigation.navigate("ChangePassword")}>
                    Forgot password?
                </Text>
            </SimpleInterfaceContainer>
            <GhostButton style={{marginBottom: 60}} title='Create Account' onPress={() => navigation.navigate("SignUp")}/>
        </BackgroundWrapper>
    )
}

export default Login;