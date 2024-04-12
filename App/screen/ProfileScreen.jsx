import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useUser, useAuth } from "@clerk/clerk-expo";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user } = useUser();

  const { isLoaded, signOut } = useAuth();
  const handleLogout = () => {
    Alert.alert(
      "Xác nhận Log Out",
      "Bạn có chắc chắn muốn đăng xuất không?",
      [
        {
          text: "Hủy",
          style: "cancel" // Nút hủy sẽ ở bên trái
        },
        {
          text: "Xác nhận",
          onPress: () => {
            signOut(); // Thực hiện log out khi người dùng xác nhận
          }
        }
      ],
      { cancelable: true }
    );
  };
  if (!isLoaded) {
    return null;
  }

  return (
    <View className="p-6 pt-7">
      <View className="items-center">
        <Image source={{ uri: user?.imageUrl }} className="w-[90px] h-[90px] rounded-full" />
        <Text className=" text-[25px] mt-3 font-bold">{user?.fullName}</Text>
        <Text className=" text-[16px] mt-1 text-gray-700">{user.primaryEmailAddress.emailAddress}</Text>
      </View>
      <View className="mt-6">
        <View className="flex flex-row justify-between h-[55px] items-center border-b border-gray-400">
          <MaterialCommunityIcons name="order-bool-ascending" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">My Orders</Text>
          <AntDesign name="right" size={24} color="gray" />
        </View>
        <View className="flex flex-row justify-between h-[55px] items-center border-b border-gray-400">
          <MaterialIcons name="payment" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Payment Methods</Text>
          <AntDesign name="right" size={24} color="gray" />
        </View>
        <View className="flex flex-row justify-between h-[55px] items-center border-b border-gray-400">
          <Ionicons name="settings-outline" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Setting</Text>
          <AntDesign name="right" size={24} color="gray" />
        </View>
        <View className="flex flex-row justify-between h-[55px] items-center border-b border-gray-400">
          <Feather name="help-circle" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Help Center</Text>
          <AntDesign name="right" size={24} color="gray" />
        </View>
        <TouchableOpacity onPress={handleLogout} className="flex flex-row justify-between h-[55px] items-center border-b border-gray-400">
          <MaterialIcons name="logout" size={24} color="gray" />
          <Text className="font-bold text-gray-700 text-[15px]">Log Out</Text>
          <AntDesign name="right" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  )
}