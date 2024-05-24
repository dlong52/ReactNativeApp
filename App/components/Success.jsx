import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
const Success = ({content}) => {
    return (
        <View className="flex-row items-center p-3 rounded-lg bg-white absolute z-10 top-2 right-0 shadow-lg">
            <AntDesign name="checkcircle" size={24} color="green" />
            <Text className=" text-green-600 ml-1 font-bold">{content}</Text>
        </View>
    )
}

export default Success