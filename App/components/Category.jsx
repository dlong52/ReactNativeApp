import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Category = ({ category }) => {
  const navigation = useNavigation()
  const backgroundColors = ['#c9ddf3', '#c5eaea', '#e4e3e3', '#f6e1c2', '#f6e1c2'];
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{ backgroundColor: backgroundColors[index % backgroundColors.length], }}
      className="flex-row h-[180] bg-slate-200 px-3 my-1 rounded-xl "
      onPress={()=>{
        navigation.navigate('item-list',{category: item.name})
      }}
    >
      <Text className="text-[24px] p-6 font-semibold">{item.name}</Text>
      <Image className="absolute right-0 h-full w-[170px] object-cover object-center rounded-r-xl rounded-bl-[100px] rounded-tl-[30px]" source={{ uri: item.img_url }} />
    </TouchableOpacity>
  );
  return (
    <View className="mt-4">
      <FlatList
        data={category}
        renderItem={renderItem}
      ></FlatList>
    </View>
  )
}
export default Category