import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'

const Slider = ({ slider }) => {
    const screenWidth = Dimensions.get('window').width - 30;
    const rederDots = () => {
        return slider.map(() => {
            return <View className="w-[20px] h-[10px] rounded-full bg-gray-600 mx-2" />
        })
    }
    return (
        <View className="mt-5 w-full rounded-lg">
            <FlatList
                className="rounded-lg"
                data={slider}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <View className="">
                        <Image source={{ uri: item.img_url }} className=" h-[200px] mr-2 w-screen px-6 rounded-lg object-contain" />
                    </View>
                )} />
            <View className="flex flex-row justify-center mt-4">
                {rederDots()}
            </View>
        </View>
    )
}

export default Slider