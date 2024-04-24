import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebaseConfig';
import { useEffect, useState } from 'react';
import helper from '../../helper';
const Header = () => {
    const navigation = useNavigation()
    const [cart, setCart] = useState(null)
    const currenUser = auth.currentUser
    useEffect(() => {
        getCartList()
    }, [currenUser])
    const getCartList = async () => {
        const cartList = await helper.fetchCartData()
        setCart(cartList)
    }
    return (
        <View className="flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-3">
                <View className=" rounded-full w-[50px] h-[50px] bg-slate-600 flex items-center justify-center">
                    <Text className="text-white font-bold text-[20px]">{currenUser.displayName?.charAt(0)}</Text>
                </View>
                <View>
                    <Text className="text-[15px]">Welcome</Text>
                    <Text className="text-[18px] font-bold">{currenUser?.displayName}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => { 
                    navigation.navigate('cart', { cart: "Cart" })
                }}
            >
                <Ionicons name="bag-handle-outline" size={28} color="black" />
                <View className="absolute w-[17px] h-[17px] bg-red-500 rounded-full right-[-6px] top-[-5px] flex-1 items-center">
                    <Text className="text-white text-[12px] items-center">{cart ? cart.lenght : 0}</Text>
                </View>
            </TouchableOpacity>  
        </View>
    )  
}

export default Header