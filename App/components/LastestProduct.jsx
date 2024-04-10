import { View, Text, FlatList, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import helper from '../../helper';
import { useNavigation } from '@react-navigation/native'

const LastestProduct = ({ lastTestPd }) => {
    const navigation = useNavigation()
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            className="flex-1 p-2 m-1 bg-[#f2f3f8] rounded-xl "
            onPress={() => {
                navigation.navigate('detail', { detail: item.name })
            }}
        >
            <Image className="h-[180]" source={{ uri: item.images[0] }} />
            <Text className=" mb-7 mt-2 text-[12px] text-gray-700 font-medium leading-5" >{item.name}</Text>
            <Text className=" p-2 absolute bottom-1 text-[15px] text-gray-800 font-semibold mt-2">{helper.convertToFormattedString(item.price)} VND</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            className=""
            data={lastTestPd}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
        />
    );
};
export default LastestProduct;
