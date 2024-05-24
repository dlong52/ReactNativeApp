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
            <TouchableOpacity 
            className="w-full h-[50px] bg-black rounded-full flex-row justify-center items-center my-3"
            onPress={()=>{navigation.navigate('Home')}}
            >
                <Text className='text-white text-[15px] font-medium'>GO HOME</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NotiOrderSuccessScreen