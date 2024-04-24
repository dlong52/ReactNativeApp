import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import helper from '../../helper';
import { app, auth } from '../../firebaseConfig';
import { getDatabase, ref } from 'firebase/database';
const CartItem = (props) => {
    const currentUser = auth.currentUser
    const db = getDatabase(app);
    const userRef = ref(db, `Users/${auth.currentUser.uid}`);

    const data = props.data
    const [quantity, setQuantity] = useState(1)
    const [intoMoney, setIntoMoney] = useState(data.price)
    const minusQuantity = () => {
        if (quantity > 1) { // Kiểm tra nếu số lượng đã giảm dưới 1, không thực hiện gì cả
            setQuantity(quantity - 1);
            setIntoMoney(data.price * (quantity - 1)); // Cập nhật giá mới dựa trên số lượng mới
        }
    }

    const plusQuantity = () => {
        setQuantity(quantity + 1);
        setIntoMoney(data.price * (quantity + 1)); // Cập nhật giá mới dựa trên số lượng mới
    }
    const deleteItemCart = (id) => {
        const db = getDatabase(app);
        const userCartRef = ref(db, `Users/${auth.currentUser.uid}/cart`);
    }
    return (
        <View className="flex-row bg-slate-200 my-2 rounded-xl shadow-xl">
            <Image className="h-[110px] w-[110px] rounded-lg m-2" source={{ uri: data.image }} />
            <View className="m-2 flex-1">
                <View className="flex-1 flex-row justify-between w-">
                    <View>
                        <Text className="text-[12px] font-semibold">{data.name}</Text>
                        <Text className="mt-2">Size {data.size}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { deleteItemCart(data.id) }}> 
                        <Feather name="delete" size={24} color="#c44d4d" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between">
                    <Text className="font-bold text-[15px] my-2">{helper.convertToFormattedString(intoMoney)} VND</Text>
                    <View className=" w-[80px] flex-row justify-around items-center border-gray-500 border rounded-full">
                        <TouchableOpacity onPress={minusQuantity}>
                            <Feather name="minus" size={18} color="black" />
                        </TouchableOpacity>
                        <Text>{quantity}</Text>
                        <TouchableOpacity onPress={plusQuantity}>
                            <Feather name="plus" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >)
}

export default CartItem