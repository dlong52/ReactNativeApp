import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigation = useNavigation()
    return (
        <ImageBackground source={{ uri: "https://i.pinimg.com/564x/92/28/62/9228627fcfb215817f12d0fe7b21aec4.jpg" }} className="flex-1 justify-end items-center p-6 bg-slate-100">
            <Text className="absolute text-[35px] text-white font-bold top-1/2">DRACO STORE</Text>
            <View className="w-full mb-10">
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="w-full h-[45px] bg-white items-center justify-center rounded-2xl">
                    <Text className="text-black text-[15px] font-semibold">Sign Up</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center my-2">
                    <Text className="text-[15px] text-gray-300">Already have an account?</Text>
                </View>
                <TouchableOpacity className="w-full h-[45px] bg-black items-center justify-center rounded-2xl" onPress={() => navigation.navigate('Login')}>
                    <Text className="text-white text-[15px] font-semibold">Log In</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
export default WelcomeScreen; 
