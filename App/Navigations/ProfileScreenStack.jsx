import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ProfileScreen from '../screen/ProfileScreen'
import MyOrderScreen from '../screen/MyOrderScreen'
import PaymentMethodScreen from '../screen/PaymentMethodScreen'
import SettingScreen from '../screen/SettingScreen'
import HelpCenterScreen from '../screen/HelpCenterScreen'
import AddressScreen from '../screen/AddressScreen';

const Stack = createStackNavigator();
const ProfileScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={
                {
                    headerShown: false,
                }
            } />
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
                component={SettingScreen}
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