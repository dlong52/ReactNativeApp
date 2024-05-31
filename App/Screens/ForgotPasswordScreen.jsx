import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");

    const handleResetPassword = async () => {
        console.log("handleResetPassword");
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Success", "Please check your email for password reset instructions.");
            console.log("Success", "Please check your email for password reset instructions");
        } catch (error) {
            console.log(error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View className="bg-black">
            <View className=" bg-black p-6">
                <View className="flex-row justify-start">
                    <TouchableOpacity className="flex items-center justify-center w-[40px] h-[30px] rounded-tr-xl rounded-bl-xl bg-white mt-2" onPress={() => { navigation.goBack() }} >
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center h-[140px] items-center">
                    <View className="w-[70px] aspect-square bg-white rounded-b-xl rounded-tl-xl flex-row justify-center items-center">
                        <FontAwesome6 name="key" size={30} color="black" />
                    </View>
                </View>
            </View>
            <View className="w-full h-full bg-white p-6 rounded-tl-[80]">
                <Text className="text-center text-[25px] font-semibold text-gray-700">Forgot Password</Text>
                <View className="mt-3">
                    <View className="my-2">
                        <Text className="text-gray-600 font-medium">Email Address</Text>
                        <TextInput
                            className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
                            placeholder='Email address'
                            onChangeText={(value) => { setEmail(value) }}
                        />
                    </View>
                    {/* {error && <Text style={{ color: 'red' }}>{error}</Text>} */}
                </View>
                <Text className="mb-2 text-gray-400">
                    *Note: We will send a notification to your email to change your password
                </Text>
                <TouchableOpacity
                    className="w-full h-[45px] bg-black items-center justify-center rounded-md"
                    onPress={handleResetPassword}
                >
                    <FontAwesome name="send-o" size={20} color="white" />
                </TouchableOpacity>
                <View className="flex-row justify-center mt-4">
                    <Text className="text-[15px] text-gray-500">New to Draco?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="text-[15px] ml-1">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ForgotPasswordScreen