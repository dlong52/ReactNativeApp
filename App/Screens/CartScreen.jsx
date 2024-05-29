import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebaseConfig'
import helper from '../helper';

import CartItem from '../components/Cart/CartItem';
import CheckoutCart from '../components/Cart/CheckoutCart';

const CartScreen = () => {
    const currentUser = auth.currentUser
    const [cartList, setCartList] = useState([])
    useEffect(() => {
        helper.fetchCartData().then(setCartList);
    }, [currentUser])
    const updateCartUi = () => {
        helper.fetchCartData().then(setCartList);
    }
    return (
        <View className="h-full">
            {!cartList ?
                (<View className="flex-1 items-center justify-center">
                    <Text className="text-[20px] font-semibold">Cart is Empty</Text>
                </View>):
                (<View className="flex-1 bg-white">
                    <ScrollView className=" bg-transparent p-6">
                        {cartList.reverse().map((item, index) => {
                            return <CartItem updateCartUi={updateCartUi} key={index} data={item} />
                        })}
                    </ScrollView>
                    <CheckoutCart data={cartList} />
                </View>)
            }
        </View>
    )
}

export default CartScreen