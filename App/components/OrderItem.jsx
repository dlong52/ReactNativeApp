import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChecoutItem from './ChecoutItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import helper from '../helper';
const OrderItem = ({ updateUi, data }) => {
    const [products, setProducts] = useState([])
    const [totalPayment, setTotalPayment] = useState(null)
    useEffect(() => {
        setProducts(data.products)
    }, [data])
    useEffect(() => {
        setTotalPayment(products?.reduce((totalPayment, item) => totalPayment + item.price * item.quantity, 0))
    }, [products])
    const cancelOrder = (id) => {
        Alert.alert(
            "Confirm cancellation",
            "Are you sure you want to cancel this order?",
            [
                {
                    text: "Back",
                    style: "cancel"
                },
                {
                    text: "Cancel",
                    style: "destructive",
                    onPress: () => {
                        helper.cancelOrder(id, updateUi)
                    }
                }
            ],
            { cancelable: true }
        );
    }
    return (
        <View className="my-3 bg-gray-200 rounded-lg p-2">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    {(data.status == "Processing") ?
                        <Fontisto name="date" size={16} color="black" /> :
                        <MaterialCommunityIcons name="truck-fast-outline" size={24} color="black" />
                    }
                    <Text className="text-[15px] ml-2 font-medium">
                        {(data.status == "Processing") ? `Order date: ${data.date}` : `Deliry date: ${data.deliveryDate}`}
                    </Text>
                </View>
                <Text className={data.status == "Processing" ? "text-[15px] font-medium text-orange-700" : "text-[15px] font-medium text-green-700"}>{data.status}</Text>
            </View>
            <View className='w-full'>
                {products.map((item, index) => {
                    return <ChecoutItem data={item} key={index} />
                })}
            </View>
            <View className={data.status == "Processing" ? 'flex-row justify-between items-center mt-2' : 'flex-row justify-end items-center mt-2'}>
                <Text className="text-[16px] font-semibold text-gray-800">Total money: ${totalPayment}.00 </Text>
                {data.status == "Processing" &&
                    <TouchableOpacity
                        className="p-2 rounded-lg bg-red-700"
                        onPress={() => { cancelOrder(data.id, updateUi) }}
                    >
                        <Text className="text-white">Cancel order</Text>
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default OrderItem