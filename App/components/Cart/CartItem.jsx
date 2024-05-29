import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import helper from '../../helper';
import { app, auth } from '../../../firebaseConfig';
import { child, getDatabase, ref, remove, update } from 'firebase/database';


const CartItem = (props) => {
    const db = getDatabase(app);
    const data = props.data
    const [quantity, setQuantity] = useState(data.quantity)

    const minusQuantity = (id) => {
        if (data.quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantityInDatabase(newQuantity, id);
        }
    }
    const plusQuantity = (id) => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantityInDatabase(newQuantity, id);
    }

    const updateQuantityInDatabase = (newQuantity, id) => {
        const userCartRef = ref(db, `Users/${auth.currentUser.uid}/cart`);
        const itemRef = child(userCartRef, id);
        update(itemRef, { quantity: newQuantity })
            .then(() => {
                props.updateCartUi()
            })
            .catch((error) => {    
                console.error("Error updating quantity: ", error);
            });
    };
    const deleteItemCart = (id) => {
        const userCartRef = ref(db, `Users/${auth.currentUser.uid}/cart`);
        const itemRef = child(userCartRef, id);
        remove(itemRef)
            .then(() => {
                props.updateCartUi()
                console.log("Successfully deleted");
            })
            .catch((error) => {
                console.error("Error removing item: ", error);
            });
    };
    return (
        <View className="flex-row bg-gray-300 my-2 rounded-xl shadow-xl">
            <Image className="h-[90px] w-[90px] rounded-lg m-2" source={{ uri: data.image ? data.image : "" }} />
            <View className="m-2 flex-1">
                <View className="flex-1 flex-row justify-between w-">
                    <View className="w-3/4">
                        <Text className="text-[12px] font-semibold">{data.name ? data.name : ""}</Text>
                        <Text className="mt-2">Classify: Size {data.size ? data.size : ""}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { deleteItemCart(data.id) }}>
                        <Feather name="delete" size={24} color="#c44d4d" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between">
                    <Text className="font-bold text-[15px] my-2">${helper.convertToFormattedString(data.price)}.00</Text>
                    <View className=" w-[80px] flex-row justify-around items-center border-gray-500 border rounded-full">
                        <TouchableOpacity onPress={() => { minusQuantity(data.id) }}>
                            <Feather name="minus" size={18} color="black" />
                        </TouchableOpacity>
                        <Text>{data.quantity}</Text>
                        <TouchableOpacity onPress={() => { plusQuantity(data.id) }}>
                            <Feather name="plus" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >)
}
export default CartItem