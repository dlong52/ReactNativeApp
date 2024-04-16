import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app, auth } from '../../firebaseConfig'
import { get, getDatabase, ref } from 'firebase/database';

const CartScreen = () => {
    const db = getDatabase(app);
    const currentUser = auth.currentUser
    const userRef = ref(db, `Users/${auth.currentUser.uid}`);
    const [cartList, setCartList] = useState([])
    useEffect(() => {
        getCartList()
    }, [currentUser])
    // Trong hàm getCartList, bạn có thể lấy dữ liệu từ Firebase và cập nhật state của cartList
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
    console.log(cartList[0]);
    return (
        <View className="h-full items-center justify-center">
            {cartList.length > 0 ? <Text>CartScreen</Text> : <Text className="text-[20px] font-semibold">Cart is Empty</Text>}
        </View>
    )
}

export default CartScreen