import { View, Text } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screen/HomeScreen';
import ExploreScreen from '../screen/ExploreScreen';
import NotificationScreen from '../screen/NotificationScreen';
import ProfileScreen from '../screen/ProfileScreen';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false,
                            tabBarActiveTintColor:"#000" }}
        >
            <Tab.Screen
                name='home'
                test="test"
                component={HomeScreenStackNav}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12 }} >Home</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={24} color={color} />
                    )
                }} />
            <Tab.Screen
                name='explore'
                component={ExploreScreenStackNav}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12 }} >Explore</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="search" size={24} color={color} />
                    )
                }} />
            <Tab.Screen
                name='notification'
                component={NotificationScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12 }} >Notifications</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="bell" size={24} color={color} />
                    )
                }} />
            <Tab.Screen
                name='profile'
                component={ProfileScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12 }} >Profile</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-circle" size={24} color={color} />
                    )
                }} />
        </Tab.Navigator>
    )
}