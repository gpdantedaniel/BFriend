import { React, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../redux/slice/userSlice';
import { fetchGroups, selectGroups } from '../redux/slice/groupsSlice';

import ProfileScreen from './main/profile/Profile';
import FriendGroupsScreen from './main/FriendGroups';
import NotificationsScreen from './main/Notifications';
import EventsScreen from './main/Events';
import { View, Text, Image } from 'react-native';

const Tab = createBottomTabNavigator();

const Main = () => {  
    const dispatch = useDispatch();      

    useEffect(() => {
        dispatch(fetchUserInfo())
        dispatch(fetchGroups());
    }, [])

    return (
        <Tab.Navigator 
            initialRouteName='FriendGroups'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#F2BE5C',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: [{
                    height: 60,
                    backgroundColor: 'rgba(46, 26, 77, 1)',
                    borderTopWidth: 1,
                    borderTopColor: 'white'                       
                    // position: 'absolute',
                    // elevation: 0,
                }, null]
            }}>
            <Tab.Screen 
                name="FriendGroups" 
                component={FriendGroupsScreen} 
                options={{
                    headerStyle: {
                        backgroundColor: '#101474',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        flex: 1,

                    },
                    headerTitle: (props) => (
                        <Icon name="ios-person-circle" color={'white'} size={26}/>
              
                    ),

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
            }}
            />
            <Tab.Screen 
                name="Notifications" 
                component={NotificationsScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="notifications" color={color} size={26}/>
                    )
            }}
            />
            <Tab.Screen 
                name='Profile' 
                component={ProfileScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person-circle" color={color} size={26}/>
                    )
            }}
            />
        </Tab.Navigator>    
    )
}

export default Main;
