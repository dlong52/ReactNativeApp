import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import helper from '../../helper'
import { useNavigation } from '@react-navigation/native'

const CheckoutCart = ({ data }) => {
    const navigation = useNavigation()
    const [totalPayment, setTotalPayment] = useState(0)
    useEffect(() => {
        setTotalPayment(data.reduce((totalPayment, item) => totalPayment + item.price * item.quantity, 0))
    }, [data])
    return (
        <View className="bg-gray-200 rounded-t-3xl">
            <View className="p-6">
                <View className="flex-row justify-between my-1">
                    <Text className="text-[14] font-medium text-gray-500">Total Items ({data.length})</Text>
                    <Text className="text-[14] font-semibold">${helper.convertToFormattedString(totalPayment)}.00</Text>
                </View>  
                <View className="flex-row justify-between my-1">
                    <Text className="text-[14] font-medium text-gray-500">Total Payment</Text>
                    <Text className="text-[14] font-semibold">${helper.convertToFormattedString(totalPayment)}.00</Text>
                </View>
            </View>
            <TouchableOpacity
                className="mx-6 my-3 flex items-center justify-center rounded-full bg-black h-[50px]"
                onPress={() => {
                    navigation.navigate('checkout')
                }}
            >
                <Text className="text-white">Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CheckoutCart