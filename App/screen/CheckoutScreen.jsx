import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import helper from '../../helper'
import ChecoutItem from '../components/ChecoutItem'

const CheckoutScreen = () => {

    const [cartList, setCartList] = useState([])
    const [totalPayment, setTotalPayment] = useState(0)
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        setTotalPayment(cartList.reduce((totalPayment, item) => totalPayment + item.price * item.quantity, 0))
    }, [cartList])
    useEffect(() => {
        getCartList()
        getCheckoutInfoData()
    }, [])
    const getCheckoutInfoData = async () => {
        const addressData = await helper.getAddress()
        const phoneNumberData = await helper.getPhone()
        setAddress(addressData)
        setPhoneNumber(phoneNumberData)
    }
    const getCartList = async () => {
        const cartData = await helper.fetchCartData()
        setCartList(cartData)
    }
    return (
        <View className="flex-1">
            <ScrollView className="p-5">
                <View>
                    {cartList.map((item, index) => {
                        return <ChecoutItem key={index} data={item} />
                    })}
                </View>
                <View>
                    <View>
                        <Text className="font-semibold text-[15px] my-2">Delivery address</Text>
                        {address && <View className="w-full h-[60px] flex-row items-center bg-white pl-3 rounded-lg">
                            <Text>{address.detailAddress}, {address.ward}, {address.district}, {address.province}</Text>
                        </View>}
                    </View>
                    <View>
                        <Text className="font-semibold text-[15px] my-2">Phone number</Text>
                        <View className="w-full h-[60px] flex-row items-center bg-white pl-3 rounded-lg">
                            <Text>{phoneNumber}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className="font-semibold text-[15px] my-2">Payment Method</Text>
                        <View className="w-full h-[60px] flex-row items-center bg-white pl-3 rounded-lg">
                            <Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="flex-row items-center justify-between h-[55px] bg-white">
                <View className="ml-3">
                    <Text className="font-semibold text-[15px]">Total payment: {helper.convertToFormattedString(totalPayment)} VND</Text>
                </View>
                <TouchableOpacity className="flex-row justify-center items-center h-full w-[120px] bg-black">
                    <Text className='text-white'>Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CheckoutScreen