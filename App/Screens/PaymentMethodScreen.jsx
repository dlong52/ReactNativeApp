import { View, Text, Image } from 'react-native'
import React from 'react'

const PaymentMethodScreen = () => {
  return (
    <View  className="flex items-center justify-center h-full w-full p-8">
      <Image source={{uri: "https://logos-world.net/wp-content/uploads/2020/04/PayPal-Emblem.png"}} className="h-[100px] w-[150px]"/>
      <Text className="text-[16px] text-center text-gray-600 font-[500] mt-2 leading-7">Currently Draco only supports payment via Paypal !</Text>
    </View>
  )
}
export default PaymentMethodScreen  