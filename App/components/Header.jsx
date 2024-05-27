import { View, Text } from 'react-native'
import { auth } from '../../firebaseConfig';
import CartIcon from './CartIcon';

const Header = ({cart}) => {
    const currenUser = auth.currentUser
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
            <CartIcon cart={cart} />
        </View> 
    )  
}
export default Header