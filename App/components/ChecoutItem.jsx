import { View, Text, Image } from 'react-native'
import React from 'react'
import helper from '../../helper'

const ChecoutItem = (props) => {
    const data = props.data
    return (
        <View className="flex-row bg-gray-300 my-2 rounded-xl shadow-xl">
            <Image className="h-[80px] w-[80px] rounded-lg m-2" source={{ uri: data.image ? data.image : "" }} />
            <View className="m-2 flex-1">
                <View className="flex-1">
                    <View className="">
                        <Text className="text-[13px] font-semibold">{data.name ? data.name : ""}</Text>
                        <Text className="my-3">Classify: Size {data.size ? data.size : ""}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="font-bold text-[15px]">${helper.convertToFormattedString(data.price)}.00</Text>
                        <Text className="">X{data.quantity}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default ChecoutItem