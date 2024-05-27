import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import helper from '../../helper';
const CartIcon = ({cart}) => {
    const navigation = useNavigation()
    return ( 
        <TouchableOpacity
            className="w-fit absolute right-0"
            onPress={() => { navigation.navigate('cart', { cart: "Cart" }) }}
        >
            <View className="">
                <Ionicons name="bag-handle-outline" size={28} color="black" />
            </View>
            <View className="absolute w-[17px] h-[17px] bg-red-500 rounded-full right-[-6px] top-[-5px] flex-1 items-center">
                <Text className="text-white text-[12px] items-center">{cart ? cart.length : 0}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CartIcon