import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';

export default function ProfileScreen() {
  const navigation = useNavigation()

  const userInfo = auth.currentUser;

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  const handleLogout = () => {
    Alert.alert(
      "Confirm logout",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel" 
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            signOut();
          }
        }
      ],
      { cancelable: true }
    );
  };
  const styleButtonProfile = "flex flex-row justify-between h-[55px] items-center border-b border-gray-400"
  return (
    <View className="p-6 pt-7">
      <View className="items-center">
        <View className="w-[90px] h-[90px] bg-slate-600 rounded-full flex items-center justify-center">
          <Text className="text-[40px] text-white">{userInfo.displayName.charAt(0)}</Text>
        </View>
        <Text className=" text-[25px] mt-3 font-bold">{userInfo.displayName}</Text>
        <Text className=" text-[16px] mt-1 text-gray-700">{userInfo.email}</Text>
      </View>
      <View className="mt-6">
        <TouchableOpacity
          className={styleButtonProfile}
          onPress={() => { navigation.navigate('MyOrder') }}
        >
          <MaterialCommunityIcons name="order-bool-ascending" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">My Orders</Text>
          <AntDesign name="right" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          className={styleButtonProfile}
          onPress={() => { navigation.navigate('PaymentMethod') }}
        >
          <MaterialIcons name="payment" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Payment Methods</Text>
          <AntDesign name="right" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          className={styleButtonProfile}
          onPress={() => { navigation.navigate('Setting') }}
        >
          <Ionicons name="settings-outline" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Setting</Text>
          <AntDesign name="right" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          className={styleButtonProfile}
          onPress={() => { navigation.navigate('HelpCenter') }}
        >
          <Feather name="help-circle" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Help Center</Text>
          <AntDesign name="right" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          className={styleButtonProfile}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Log Out</Text>
          <AntDesign name="right" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  )
}