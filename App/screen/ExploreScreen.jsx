import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import Product from '../components/Product';
import InvalidResult from '../components/InvalidResult';
import LoadingScreen from './LoadingScreen';
import helper from '../../helper';

export default function ExploreScreen() {
  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [cartLength, setCartLength] = useState([])
  const [data, setData] = useState([])
  
  const [isSearch, setIsSearch] = useState(false)
  const searchInput = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await helper.fetchProductsData()
      const categoryData = await helper.fetchCategoriesData()
      const cartData = await helper.fetchCartData()
      setProducts(productsData)
      setCategory(categoryData)
      setCartLength(cartData.length)
    }
    fetchData()
  }, [])
  const handelSearch = (value) => {
    const filteredProducts = helper.handelSearch(value, products)
    setData(filteredProducts);
    setIsSearch(true);
  }

  if (!products || !Object.keys(products).length)
    return <LoadingScreen />;
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
            <Text className="text-white text-[12px] items-center">{cartLength}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" flex-row gap-2 justify-between my-6">
        <View className="flex-1 gap-x-3 rounded-md bg-slate-200 flex-row items-center justify-between">
          <Ionicons name="search" size={24} color="gray" />
          <TextInput ref={searchInput} onChange={(event) => handelSearch(event.nativeEvent.text)} className="flex-1 rounded-md h-full" placeholder='Search products' type="text" />
          {isSearch ? <TouchableOpacity onPress={() => { setData(products); searchInput.current.clear(), setIsSearch(false) }} className="mr-1">
            <FontAwesome6 name="xmark" size={24} color="gray" />
          </TouchableOpacity> : ""}
        </View>
        <TouchableOpacity className="w-[45px] h-[45px] bg-black items-center justify-center rounded-md">
          <MaterialCommunityIcons name="sort-ascending" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-x-2 mb-4">
        <TouchableOpacity onPress={() => { setData(products) }} className="px-4 py-2 bg-gray-800 rounded-2xl ">
          <Text className="text-white font-medium">All</Text>
        </TouchableOpacity>
        {category.map((category, index) => (
          <TouchableOpacity key={index} className="px-4 py-2">
            <Text className="text-black font-medium">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isSearch && data.length == 0 ? <InvalidResult /> : <Product data={isSearch ? data : products} />}
    </ScrollView>
  )
}
