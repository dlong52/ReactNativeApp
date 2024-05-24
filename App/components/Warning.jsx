import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Warning = ({content}) => {
    return (
        <View className="flex-row items-center p-3 rounded-lg bg-white absolute z-10 top-2 right-0 shadow-xl">
            <Ionicons name="warning" size={24} color="#d98200" />
            <Text className="text-[#d98200] ml-1 font-medium ">{content}</Text>
        </View>
    )
}

export default Warning 