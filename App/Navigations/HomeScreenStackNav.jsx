import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import CartScreen from '../screen/CartScreen';
import ItemList from '../screen/ItemList';
import HomeScreen from '../screen/HomeScreen';
import Detail from '../screen/Detail';

const Stack = createStackNavigator();
const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} options={
        {
          headerShown: false,
        }
      } />
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
    </Stack.Navigator>
  )
}

export default HomeScreenStackNav