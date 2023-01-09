import { React, useEffect, useState } from 'react';
import { Text, View, TextInput, ImageBackground, Image } from 'react-native'
import { useFonts } from 'expo-font';
import styles from '../assets/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileScreen from './main/Profile';
import FriendGroupsScreen from './main/FriendGroups';

const Tab = createBottomTabNavigator();

import { BackgroundWrapper } from '../components';

const HomeScreenTwo = () => {
    return (
        <BackgroundWrapper>
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20}}>
                    <View style={styles.textContainer}>
                        <Text style={styles.bodyText}>Events</Text>
                    </View>
                </View>
            </View>
        </BackgroundWrapper>
    )
}

const Main = (props) => {    
    return (
        <Tab.Navigator 
            initialRouteName='FriendGroups'

            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#F2BE5C',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: [
                    {
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        borderTopWidth: 1,
                        borderTopColor: 'white',
                        height: 60,
                        elevation: 0,
                    },
                    null
                ]
            }}>
            <Tab.Screen 
                name="FriendGroups" 
                component={FriendGroupsScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-people" color={color} size={30}/>
                    )
                }}
                />
            <Tab.Screen 
                name="Events" 
                component={HomeScreenTwo} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-map" color={color} size={30}/>
                    )
                }}/>
            <Tab.Screen 
                name='Profile' 
                component={ProfileScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person-circle" color={color} size={30}/>
                    )
                }}/>
        </Tab.Navigator>    
    )
}

export default Main;
