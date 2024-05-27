import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../Screens/CartScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import Detail from '../Screens/Detail';
import CheckoutScreen from '../Screens/CheckoutScreen';
import AddressScreen from '../Screens/AddressScreen';
import SettingScreen from '../Screens/SettingScreen';
import NotiOrderSuccessScreen from '../Screens/NotiOrderSuccessScreen';
import MyOrderScreen from '../Screens/MyOrderScreen';
import CartIcon from '../components/CartIcon';

const Stack = createStackNavigator();
const ExploreScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        options={{ headerShown: false, }}
        component={() => <ExploreScreen />}
      />
      <Stack.Screen
        name="cart"
        component={CartScreen}
        options={
          ({ route }) => ({ title: route.params.cart, headerBackTitleStyle: { textTransform: 'capitalize' } })}
      />
      <Stack.Screen
        name="checkout"
        component={() => <CheckoutScreen />}
        options={
          ({ route }) => ({
            title: "Checkout",
            headerBackTitleStyle: { textTransform: 'capitalize' },
          })}
      />
      <Stack.Screen
        name="detail"
        component={Detail}
        options={
          ({ route }) => ({
            title: "Detail",
            headerBackTitleStyle: { textTransform: 'capitalize' },
          })}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
      />
      <Stack.Screen
        name="Setting"
        component={() => <SettingScreen />}
      />
      <Stack.Screen
        name="NotiOrder"
        options={{ headerShown: false, }}
        component={NotiOrderSuccessScreen}
      />
      <Stack.Screen
        name="MyOrder"
        component={MyOrderScreen}
      />
    </Stack.Navigator>
  )
}

export default ExploreScreenStackNav   