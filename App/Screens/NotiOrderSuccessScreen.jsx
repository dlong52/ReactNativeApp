import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const NotiOrderSuccessScreen = () => {
    const navigation = useNavigation()
    return (
        <View className="flex-col flex-1 items-center py-20 px-10 justify-center">
            <Ionicons name="checkmark-circle-sharp" size={60} color="green" />
            <Text className="text-[20px] text-center my-4 font-medium">
                You have placed your order successfully!
            </Text>
            <View className="flex-row w-11/12 justify-between">
                <TouchableOpacity
                    className="w-6/12 h-[50px] bg-black rounded-full flex-row justify-center items-center my-3 mr-1"
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Text className='text-white text-[15px] font-medium'>Go Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-6/12 h-[50px] shadow-sm bg-white rounded-full flex-row justify-center items-center my-3 ml-1"
                    onPress={() => { navigation.navigate('MyOrder') }}
                >
                    <Text className='text-blacktext-[15px] font-medium'>View order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}  

export default NotiOrderSuccessScreen