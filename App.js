import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'

// React Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Firebase Imports
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, onSnapshot, doc } from 'firebase/firestore'

// Screen Imports from /auth & components
import LoginScreen from './src/screens/auth/Login'
import SignUpScreen from './src/screens/auth/SignUp'
import ChangePasswordScreen from './src/screens/auth/ChangePassword'
import EmailSentScreen from './src/screens/auth/EmailSent'
import { BackgroundWrapper } from './src/components'

// Screen Imports from /main
import MainScreen from './src/screens/Main'
import HelpAndContactScreen from './src/screens/main/HelpAndContact'
import EditProfileScreen from './src/screens/main/EditProfile'
import DeleteAccountScreen from './src/screens/main/DeleteAccount'
import GroupCreationScreen from './src/screens/main/GroupCreation'
import GroupScreen from './src/screens/main/Group'
import AddFriendScreen from './src/screens/main/AddFriend'

// Redux imports
import { store } from './src/redux/store';
import { Provider } from 'react-redux'


const firebaseConfig = {
  apiKey: "AIzaSyCC64AZAPEs1iIGAD9wUbUhGlC1GtMs5pE",
  authDomain: "bfriend-2fc16.firebaseapp.com",
  projectId: "bfriend-2fc16",
  storageBucket: "bfriend-2fc16.appspot.com",
  messagingSenderId: "486330304773",
  appId: "1:486330304773:web:630a711e83e1c4e4090f6c",
  measurementId: "G-X87E5HBTZ3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const Stack = createNativeStackNavigator();
const defaultScreenOptions = {headerShown: false,  animation: 'none'};

const AppWrapped = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./src/assets/fonts/Inter/Inter-Bold.otf'),
    'Inter-ExtraBold': require('./src/assets/fonts/Inter/Inter-ExtraBold.otf'),
  });  

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoaded(true);
        setLoggedIn(true);
      } else {
        setLoaded(true);
        setLoggedIn(false);
      }
    })
  }, [auth])

  if (!loaded || !fontsLoaded) {
    return (
      <SafeAreaProvider>
        <BackgroundWrapper/>
      </SafeAreaProvider>
    )
  } 
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <StatusBar style="light"/>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={defaultScreenOptions}/>
              <Stack.Screen name="SignUp" component={SignUpScreen} options={defaultScreenOptions}/>
              <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={defaultScreenOptions}/>
              <Stack.Screen name="EmailSent" component={EmailSentScreen} options={defaultScreenOptions}/>
              <Stack.Screen name="helpAndContact" component={HelpAndContactScreen } options={defaultScreenOptions}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
  
  return (
    <NavigationContainer>
      <StatusBar style="light"/>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} auth={auth} options={defaultScreenOptions}/>
            <Stack.Screen name="HelpAndContact" component={HelpAndContactScreen} options={defaultScreenOptions}/>
            <Stack.Screen name='EditProfile' component={EditProfileScreen} options={defaultScreenOptions}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={defaultScreenOptions}/>
            <Stack.Screen name='DeleteAccount' component={DeleteAccountScreen} options={defaultScreenOptions}/>
            <Stack.Screen name='GroupCreation' component={GroupCreationScreen} options={defaultScreenOptions}/>
            <Stack.Screen name='Group' component={GroupScreen} options={defaultScreenOptions}/>
            <Stack.Screen name='AddFriend' component={AddFriendScreen} options={defaultScreenOptions}/>
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapped/>
    </Provider>
  )
}