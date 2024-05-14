import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View className="flex-1 justify-center items-center p-6 bg-slate-100">
            <Text className="text-[25px] font-bold">Let's Get Started</Text>
            <Image source={require('./../../assets/images/loginScImg.png')}
                className="w-[250px] h-[250px] " />
            <View className="w-full">
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="w-full h-[45px] bg-black items-center justify-center rounded-md">
                    <Text className="text-white font-medium">Sign Up</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center mt-4">
                    <Text className="text-[15px]">Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="text-orange-600 text-[15px] ml-1">Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default WelcomeScreen; 
