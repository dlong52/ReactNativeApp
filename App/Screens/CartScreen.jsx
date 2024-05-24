import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebaseConfig'
import helper from '../../helper';

import CartItem from '../components/Cart/CartItem';
import CheckoutCart from '../components/Cart/CheckoutCart';

const CartScreen = () => {
    const currentUser = auth.currentUser
    const [cartList, setCartList] = useState([])
    useEffect(() => {
        getCartList()
    }, [currentUser])
    const getCartList = async () => {
        const cartData = await helper.fetchCartData()
        setCartList(cartData)
    }
    const updateCartUi = () => {
        getCartList()
    }
    if (!cartList) {
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
                    return <CartItem updateCartUi={updateCartUi} key={index} data={item} />
                })}
            </ScrollView>
            <CheckoutCart data={cartList? cartList : []}/> 
        </View>
    )
}

export default CartScreen