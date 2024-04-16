import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { getDatabase, ref, child, get } from "firebase/database";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import Product from '../components/Product';
import InvalidResult from '../components/InvalidResult';
import LoadingScreen from './LoadingScreen';

export default function ExploreScreen() {
  const dbRef = ref(getDatabase());
  const navigation = useNavigation()
  const [isSearch, setIsSearch] = useState(false)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])
  const searchInput = useRef(null)

  useEffect(() => {
    getProductList()
    getCategoryList()
  }, [])

  const getProductList = () => {
    get(child(dbRef, `Products`)).then((snapshot) => {
      if (snapshot.exists()) {
        setProducts(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  const getCategoryList = async () => {
    setCategory([])
    get(child(dbRef, `Categories`)).then((snapshot) => {
      if (snapshot.exists())
        setCategory(snapshot.val())
      else
        console.log("No data available");
    }).catch((error) => {
      console.error(error);
    });
  }
  const handelSearch = (value) => {
    // Loại bỏ tất cả các khoảng trắng khỏi giá trị tìm kiếm;
    const searchValue = value.toLowerCase().replace(/\s/g, '');
    const filteredProducts = products.filter(product => {
      // Loại bỏ tất cả các khoảng trắng khỏi tên sản phẩm và danh mục sản phẩm
      const productName = product.name.toLowerCase().replace(/\s/g, '');
      const productCategory = product.category.toLowerCase().replace(/\s/g, '');
      // So sánh tên sản phẩm hoặc danh mục sản phẩm với giá trị tìm kiếm
      return productName.includes(searchValue) || productCategory.includes(searchValue);
    });
    // Cập nhật state products với các sản phẩm đã lọc
    setData(filteredProducts);
    setIsSearch(true);
    console.log(searchValue);
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
            <Text className="text-white text-[12px] items-center">0</Text>
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
