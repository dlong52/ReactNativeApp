import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import helper from '../../helper';
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../screen/LoadingScreen';

const Product = ({ data }) => {
    const navigation = useNavigation()
    if (!data || !Object.keys(data).length)
        return <LoadingScreen/>;
    return (
        <View>  
            <View className="flex-row flex-wrap">
                {data.map((item, index) => (
                    <View key={index} className="p-1 w-1/2">
                        <TouchableOpacity
                            className=" w-full p-2 bg-[#f2f3f8] rounded-xl "
                            onPress={() => {
                                navigation.navigate('detail', { detail: item.name })
                            }}
                        >
                            <Image className="h-[180px]" source={{ uri: item.images[0] }} />
                            <Text className="h-[65px] mt-2 text-[12px] text-gray-700 font-medium leading-4" >{item.name}</Text>
                            <Text className=" p-2 absolute bottom-1 text-[15px] text-gray-800 font-semibold mt-2">{helper.convertToFormattedString(item.price)} VND</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};
export default Product;
