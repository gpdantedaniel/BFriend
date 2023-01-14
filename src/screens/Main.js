import { React, useEffect, useState } from 'react';
import { Text, View, TextInput, ImageBackground, Image } from 'react-native'
import { useFonts } from 'expo-font';
import styles from '../assets/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileScreen from './main/Profile';
import FriendGroupsScreen from './main/FriendGroups';
import NotificationsScreen from './main/Notifications';
import EventsScreen from './main/Events';

const Tab = createBottomTabNavigator();

const Main = (props) => {    
    return (
        <Tab.Navigator 
            initialRouteName='Profile'

            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#F2BE5C',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: [
                    {
                        backgroundColor: '#2e1a4d',
                        borderTopWidth: 0,
                        // position: 'absolute',
                        // borderTopWidth: 0,
                        // borderTopColor: 'white',
                        height: 60,
                        // elevation: 0,
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
                        <Icon name="ios-people" color={color} size={26}/>
                    )
                }}
                />
            <Tab.Screen 
                name="Events" 
                component={EventsScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-map" color={color} size={26}/>
                    )
                }}/>

            <Tab.Screen 
                name="Notifications" 
                component={NotificationsScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="notifications" color={color} size={26}/>
                    )
                }}/>
            
            <Tab.Screen 
                name='Profile' 
                component={ProfileScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person-circle" color={color} size={26}/>
                    )
                }}/>
        </Tab.Navigator>    
    )
}

export default Main;
