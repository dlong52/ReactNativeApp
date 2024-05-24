import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import Product from '../components/Product';
import InvalidResult from '../components/InvalidResult';
import LoadingScreen from './LoadingScreen';
import helper from '../../helper';

export default function ExploreScreen() {
  const navigation = useNavigation()

  const [isSort, setIsSort] = useState(false)

  const [data, setData] = useState([])

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [cart, setCart] = useState([])

  const [selectedCategory, setSelectedCategory] = useState('All')
  useEffect(() => {
    getProducts()
    getCategories()
    getCart()
  }, [])
  const getProducts = async () => {
    const productsData = await helper.fetchProductsData()
    setProducts(productsData)
  }
  const getCategories = async () => {
    const categoriesData = await helper.fetchCategoriesData()
    setCategories(categoriesData) 
  }     
  const getCart = async () => {
    const cartData = await helper.fetchCartData()
    setCart(cartData)
  }
  const [isSearch, setIsSearch] = useState(false)
  const searchInput = useRef(null)

  const handelSearch = (value) => {
    const filteredProducts = helper.handelSearch(value, products)
    setData(filteredProducts);
    setIsSearch(true);
  }
  const handleSort = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      if (a.price > b.price)
        return 1;
      if (a.price < b.price)
        return -1;
      return 0;
    });

    if (isSort) 
      sortedProducts.reverse();

    setData(sortedProducts);
    setProducts(sortedProducts)
    setIsSort(!isSort);
  }
  const handelAll = (value) => {
    setSelectedCategory(value)
    setIsSearch(false)
    getProducts() 
  }
  const handelTab = (category) => {
    setSelectedCategory(category)
    const filteredProducts = helper.handelSearch(category, products)
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
          onPress={() => { navigation.navigate('cart', { cart: "Cart" }) }}
        >
          <View className="">
            <Ionicons name="bag-handle-outline" size={28} color="black" />
          </View>
          <View className="absolute w-[17px] h-[17px] bg-red-500 rounded-full right-[-6px] top-[-5px] flex-1 items-center">
            <Text className="text-white text-[12px] items-center">{cart ? cart.length : 0}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" flex-row gap-2 justify-between my-6">
        <View className="flex-1 gap-x-3 rounded-md bg-slate-200 flex-row items-center justify-between">
          <Ionicons name="search" size={24} color="gray" />
          <TextInput ref={searchInput} onChange={(event) => handelSearch(event.nativeEvent.text)} className="flex-1 rounded-md h-full" placeholder='Search products' type="text" />
        </View>
        {isSort ? <TouchableOpacity onPress={() => { handleSort() }} className="w-[45px] h-[45px] bg-black items-center justify-center rounded-md">
          <MaterialCommunityIcons name="sort-ascending" size={24} color="white" />
        </TouchableOpacity> :
          <TouchableOpacity onPress={() => { handleSort() }} className="w-[45px] h-[45px] bg-black items-center justify-center rounded-md">
            <MaterialCommunityIcons name="sort-descending" size={24} color="white" />
          </TouchableOpacity>}
      </View>
      <View className="flex-row gap-x-2 mb-4">
        <TouchableOpacity onPress={() => { handelAll("All") }} className={selectedCategory == 'All' ? "px-4 py-2 bg-gray-800 rounded-2xl " : "px-4 py-2"}>
          <Text className={selectedCategory == 'All' ? "text-white font-medium" : "text-black font-medium"}>All</Text>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className={selectedCategory == category.name ? "px-4 py-2 bg-gray-800 rounded-2xl " : "px-4 py-2"}
            onPress={() => {
              handelTab(category.name)
            }}
          >
            <Text className={selectedCategory == category.name ? "text-white font-medium" : "text-black font-medium"}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isSearch && data.length == 0 ? <InvalidResult /> : <Product data={isSearch ? data : products} />}
    </ScrollView>
  )
}
