import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';


const SignUpScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  
  const signUp = async () => {
    setLoading(true)
    try {
      const database = getDatabase();
      const respone = await createUserWithEmailAndPassword(auth, email, password)
      const usersRef = ref(database, 'Users/' + respone.user.uid);
      if (respone) {
        await updateProfile(respone.user, {
          displayName: name,
        });
      }
      const userData = {
        username: respone.user.providerData[0].displayName,
        email: respone.user.email,  
        phone: "",
        address: "",
        cart: [],
        orders: [],
        created_at: Date.now(), 
        updated_at: Date.now()
      };

      set(usersRef, userData)
        .then(() => {
          console.log("Thông tin người dùng đã được lưu vào cơ sở dữ liệu.");
        })
        .catch((error) => {
          console.error("Lỗi khi lưu thông tin người dùng: ", error);
        });
      alert("User created successfully")
    } catch (error) {
      console.log(error);
      alert('Error creating user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="bg-gray-900">
      <View className=" bg-gray-900 p-6">
        <View className="flex-row justify-start">
          <TouchableOpacity className="flex items-center justify-center w-[40px] h-[30px] rounded-tr-xl rounded-bl-xl bg-white mt-2" onPress={() => { navigation.goBack() }} >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('./../../assets/images/loginImg.png')}
            className="w-[180px] h-[150px]" />
        </View>
      </View>
      <View className="w-full h-full bg-white p-6 rounded-t-[50]">
        <View className="mb-6 mt-1">
          <View className="my-2">
            <Text className="text-gray-600 font-medium">Full Name</Text>
            <TextInput
              className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
              type="email"
              placeholder='Full Name'
              onChangeText={(value) => { setName(value) }}
            />
          </View>
          <View className="my-2">
            <Text className="text-gray-600 font-medium">Email Address</Text>
            <TextInput
              className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
              type="email"
              placeholder='Email address'
              onChangeText={(value) => { setEmail(value) }}
            />
          </View>
          <View className="my-2">
            <Text className="text-gray-600 font-medium">Password</Text>
            <TextInput
              className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
              type="password"
              placeholder='Password'
              onChangeText={(value) => { setPassword(value) }}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => { signUp() }} className="w-full h-[45px] bg-black items-center justify-center rounded-md">
          <Text
            className="text-white font-medium"

          >Sign Up</Text>
        </TouchableOpacity>
        <Text className="text-center py-3 font-bold">Or</Text>
        <TouchableOpacity className=" shadow flex-row w-full h-[45px] bg-white items-center justify-center rounded-md">
          <Image className="h-[25px] w-[25px] mx-2" source={require('../../assets/images/googleIcon.png')} />
          <Text className=" text-gray-600 font-medium">Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUpScreen