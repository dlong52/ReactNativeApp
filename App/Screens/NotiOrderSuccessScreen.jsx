import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import helper from '../helper';
import { auth } from '../../firebaseConfig';
const NotiOrderSuccessScreen = () => {
    const navigation = useNavigation()
    const currenUser = auth.currentUser.displayName
    const [address, setAddress] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    useEffect(() => {
        fetchCheckoutInfo();
    }, [])
    const fetchCheckoutInfo = async () => {
        const [addressData, phoneNumberData] = await Promise.all([
            helper.getAddress(),
            helper.getPhone()
        ]);
        setAddress(addressData);
        setPhoneNumber(phoneNumberData);
    };
    console.log(address);
    return (
        <View className="flex-col flex-1 items-center py-20 px-10 justify-center">
            <Ionicons name="checkmark-circle-sharp" size={60} color="green" />
            <Text className="text-[20px] text-center my-4 font-medium">
                You have placed your order successfully!
            </Text>
            <Text className="text-center">
                <Text className="font-[500]">Your order will be shipped to: </Text>
                {currenUser}'(+84){phoneNumber?.slice(1)} ' {address?.detailAddress}, {address?.ward}, {address?.district}, {address?.province}
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