import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screen/CartScreen';
import ExploreScreen from '../screen/ExploreScreen';
import Detail from '../screen/Detail';

const Stack = createStackNavigator();
const ExploreScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="explore" component={ExploreScreen} options={
        {
          headerShown: false,
        }
      } />
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

export default ExploreScreenStackNav