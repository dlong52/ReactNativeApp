import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import ProfileScreen from '../Screens/ProfileScreen'
import MyOrderScreen from '../Screens/MyOrderScreen'
import PaymentMethodScreen from '../Screens/PaymentMethodScreen'
import SettingScreen from '../Screens/SettingScreen'
import HelpCenterScreen from '../Screens/HelpCenterScreen'
import AddressScreen from '../Screens/AddressScreen';

const Stack = createStackNavigator();
const ProfileScreenStack = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MyOrder"
                component={MyOrderScreen}
            />
            <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethodScreen}
            />
            <Stack.Screen
                name="Setting"
                component={() => <SettingScreen />}
            />
            <Stack.Screen
                name="HelpCenter"
                component={HelpCenterScreen}
            />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
            />
        </Stack.Navigator>
    )
}
export default ProfileScreenStack