import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '@clerk/clerk-expo'

import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const AuthScreenStack = () => {
    const { user } = useUser()
    const [isNavigatorReady, setNavigatorReady] = useState(false);

    useEffect(() => {
        // Mock asynchronous loading time for navigator initialization
        setTimeout(() => {
            setNavigatorReady(true);
        }, 1000); // 1 second delay
    }, []);

    if (!isNavigatorReady) {
        return <Text>Loading...</Text>; // Or any loading indicator you prefer
    }
    return (
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
    )
}

export default AuthScreenStack
