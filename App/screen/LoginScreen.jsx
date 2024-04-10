import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View>
            <Image source={require('./../../assets/images/loginScImg.png')}
                className=" bg-blue-100 w-full h-[350px] " />
            <View className="p-5 mt-[-20px] bg-white rounded-t-3xl">
                <Text className=" my-5 text-[30px] font-bold">Welcome to Draco</Text>
                <TouchableOpacity onPress={onPress} className=" bg-blue-700 p-4 rounded-full">
                    <Text className=" text-[18px] text-center text-white">Get Started</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default LoginScreen;
