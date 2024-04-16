import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { User } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
const Header = () => {
    const navigation = useNavigation()

    const { user } = useUser()
    const userInfo = auth.currentUser
    console.log("User hien tai",userInfo);
     
    return (
        <View className="flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-4">
                {user?(<Image source={{ uri: user?.imageUrl }}
                    className=" rounded-full w-12 h-12" />):
                (<View className=" rounded-full w-12 h-12 bg-slate-600 flex items-center justify-center">
                    <Text className="text-white font-bold text-[20px]">{userInfo.displayName.charAt(0)}</Text>
                </View>)}
                <View>
                    <Text className="text-[15px]">Welcome</Text>
                    <Text className="text-[18px] font-bold">{user?user.fullName: userInfo.displayName}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('cart', { cart: "Cart" })
                }}
            >
                <Ionicons name="bag-handle-outline" size={28} color="black" />
                <View className="absolute w-[17px] h-[17px] bg-red-500 rounded-full right-[-6px] top-[-5px] flex-1 items-center">
                    <Text className="text-white text-[12px] items-center">0</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Header