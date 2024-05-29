import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import CartScreen from '../Screens/CartScreen';
import ItemList from '../Screens/ItemList';
import HomeScreen from '../Screens/HomeScreen';
import Detail from '../Screens/Detail';
import CheckoutScreen from '../Screens/CheckoutScreen';
import AddressScreen from '../Screens/AddressScreen';
import SettingScreen from '../Screens/SettingScreen';
import NotiOrderSuccessScreen from '../Screens/NotiOrderSuccessScreen';
import MyOrderScreen from '../Screens/MyOrderScreen';

const Stack = createStackNavigator();
const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false, }}
        component={() => <HomeScreen />}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}  
        options={
          ({ route }) => ({ title: route.params.category, headerBackTitleStyle: { textTransform: 'capitalize' } })}
      />
      <Stack.Screen
        name="cart"
        component={CartScreen}
        options={
          ({ route }) => ({ title: route.params.cart, headerBackTitleStyle: { textTransform: 'capitalize' } })}
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
        name="checkout"
        component={() => <CheckoutScreen />}
        options={
          ({ route }) => ({
            title: "Checkout",
            headerBackTitleStyle: { textTransform: 'capitalize' },
          })}
      />
      <Stack.Screen
        name="Setting"
        component={() => <SettingScreen />}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
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

export default HomeScreenStackNav