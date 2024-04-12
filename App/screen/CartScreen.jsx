import { View, Text } from 'react-native'
import React, { useState } from 'react'

const CartScreen = () => {
    const [cartList, setCartList] = useState([])
    return (
        <View className="h-full items-center justify-center">
            {cartList.length>0?<Text>CartScreen</Text>:<Text className="text-[20px] font-semibold">Cart is Empty</Text>}
        </View>
    )
}

export default CartScreen