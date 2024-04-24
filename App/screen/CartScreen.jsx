import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app, auth } from '../../firebaseConfig'
import { get, getDatabase, ref } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import helper from '../../helper';

import CartItem from '../components/CartItem';

const CartScreen = () => {
    const db = getDatabase(app);
    const currentUser = auth.currentUser
    const userRef = ref(db, `Users/${auth.currentUser.uid}`);
    const [cartList, setCartList] = useState([])
    const [quantity, setQuantity] = useState()
    useEffect(() => {
        getCartList()
    }, [currentUser])
    const getCartList = async () => {
        setCartList([])
        try {
            const snapshot = await get(userRef); // Lấy dữ liệu từ userRef
            if (snapshot.exists()) {
                const userData = snapshot.val(); // Dữ liệu người dùng, bao gồm cả trường "cart"
                const userCart = userData.cart;
                const dataArray = Object.keys(userCart).map((key) => ({ id: key, ...userCart[key] })); // Lấy trường dữ liệu "cart" từ dữ liệu người dùng
                setCartList(dataArray); // Cập nhật state cartList với dữ liệu từ trường "cart"
            } else {
                console.log("Dữ liệu không tồn tại");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu:", error);
        }
    }
    if (cartList.length <= 0) {
        return (
            <View className="h-full items-center justify-center">
                <Text className="text-[20px] font-semibold">Cart is Empty</Text>
            </View>
        )
    }
    return (
        <View className="flex-1 bg-white">
            <ScrollView className=" bg-transparent p-6">
                {cartList.map((item, index) => {
                    return <CartItem key={index} data={item} />
                })}
            </ScrollView>
            <View className="bg-slate-100 rounded-t-3xl">
                <View className="p-6">
                    <View className="flex-row justify-between my-1">
                        <Text className="text-[14] font-medium text-gray-500">Total Items (2)</Text>
                        <Text className="text-[14] font-semibold">{helper.convertToFormattedString(1000000)} VND</Text>
                    </View>
                    <View className="flex-row justify-between my-1">
                        <Text className="text-[14] font-medium text-gray-500">Total Payment</Text>
                        <Text className="text-[14] font-semibold">{helper.convertToFormattedString(1000000)} VND</Text>
                    </View>
                </View>
                <TouchableOpacity className="m-6 flex items-center justify-center rounded-full bg-black h-[50px]">
                    <Text className="text-white">Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartScreen