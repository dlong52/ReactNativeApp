import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screen/CartScreen';
import ExploreScreen from '../screen/ExploreScreen';
import Detail from '../screen/Detail';
import CheckoutScreen from '../screen/CheckoutScreen';

const Stack = createStackNavigator();
const ExploreScreenStackNav = ({ products, categories, cart }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        options={{ headerShown: false, }}
        component={ExploreScreen}
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
        component={CheckoutScreen}
      />
    </Stack.Navigator>
  )
}

export default ExploreScreenStackNav