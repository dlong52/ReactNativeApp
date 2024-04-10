import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
const Header = () => {
    const navigation = useNavigation()
    
    const { user } = useUser()
    return (
        <View className="flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-4">
                <Image source={{ uri: user?.imageUrl }}
                    className=" rounded-full w-12 h-12" />
                <View>
                    <Text className="text-[15px]">Welcome</Text>
                    <Text className="text-[18px] font-bold">{user?.fullName}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('cart', { cart: "Cart" })
                }}
            >
                <Ionicons name="bag-handle-outline" size={28} color="black" />
                <View className="absolute w-[17px] h-[17px] bg-red-500 rounded-full right-[-6px] top-[-5px] flex-1 items-center">
                    <Text className="text-white text-[12px] items-center">0</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Header