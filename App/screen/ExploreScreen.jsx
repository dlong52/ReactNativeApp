import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import LastestProduct from '../components/LastestProduct';

import { getDatabase, ref, child, get } from "firebase/database";

import { useNavigation } from '@react-navigation/native'
export default function ExploreScreen() {
  const navigation = useNavigation()
  const [lastTestPd, setLastTestPd] = useState([])
  const dbRef = ref(getDatabase());
  useEffect(() => {
    getProductList()
  }, [])

  const getProductList = () => {
    setLastTestPd([])
    get(child(dbRef, `Products`)).then((snapshot) => {
      if (snapshot.exists()) {
        setLastTestPd(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  return (
    <ScrollView className="py-8 px-[25] bg-white">
      <View className="flex-row items-center justify-center">
        <Text className="text-[22px] font-semibold">FASHION</Text>
        <TouchableOpacity
          className="w-fit absolute right-0"
          onPress={() => {
            navigation.navigate('cart', { cart: "Cart" })
          }}
        >
          <View className="">
            <Ionicons name="bag-handle-outline" size={28} color="black" />
          </View>
          <View className="absolute w-[17px] h-[17px] bg-red-500 rounded-full right-[-6px] top-[-5px] flex-1 items-center">
            <Text className="text-white text-[12px] items-center">0</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className=" flex-row gap-2 justify-between my-6">
        <View className="flex-1 gap-x-3 rounded-md bg-slate-200 flex-row items-center justify-between">
          <Ionicons name="search" size={24} color="gray" />
          <TextInput className="flex-1 rounded-md h-full" placeholder='Search products' type="text" />
        </View>
        <TouchableOpacity className="w-[45px] h-[45px] bg-black items-center justify-center rounded-md">
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <LastestProduct lastTestPd={lastTestPd} />
    </ScrollView>
  )
}
