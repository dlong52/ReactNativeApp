import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import WelcomeScreen from '../screen/WelcomeScreen';

const Stack = createNativeStackNavigator();
const AuthScreenStack = () => {
    const [isNavigatorReady, setNavigatorReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setNavigatorReady(true);
        }, 1000);
    }, []);

    if (!isNavigatorReady) {
        return <Text>Loading...</Text>;
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
