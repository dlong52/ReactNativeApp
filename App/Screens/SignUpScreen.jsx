import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const signUp = async () => {
    try {
      if (!name || !email || !password) {
        setError("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid Gmail address.");
        return;
      }
      if (!validatePassword(password)) {
        setError("Password must be at least 8 characters long.");
        return;
      }
      const database = getDatabase();
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const usersRef = ref(database, 'Users/' + response.user.uid);
      if (response) {
        await updateProfile(response.user, {
          displayName: name,
        });
      }
      const userData = {
        username: response.user.providerData[0].displayName,
        email: response.user.email,
        phoneNumber: "",
        address: "",
        cart: [],
        orders: [],
        created_at: Date.now(),
        updated_at: Date.now()
      };
      set(usersRef, userData)
        .then(() => {
          console.log("User information saved to the database.");
        })
        .catch((error) => {
          console.error("Error saving user information: ", error);
        });
      alert("Sign Up Success");
      navigation.navigate('Login')

    } catch (error) {
      console.log(error);
      alert('Error creating user');
    }
  };

  return (
    <ScrollView className="bg-gray-900">
      <View className=" bg-gray-900 p-6">
        <View className="flex-row justify-start">
          <TouchableOpacity className="flex items-center justify-center w-[40px] h-[30px] rounded-tr-xl rounded-bl-xl bg-white mt-2" onPress={() => { navigation.goBack() }} >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('./../../public/images/loginImg.png')}
            className="w-[180px] h-[150px]" />
        </View>
      </View>
      <View className="w-full h-full bg-white p-6 rounded-t-[50]">
        <View className="mb-6 mt-1">
          <View className="my-2">
            <Text className="text-gray-600 font-medium">Full Name</Text>
            <TextInput
              className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
              placeholder='Full Name'
              onChangeText={(value) => { setName(value) }}
            />
          </View>
          <View className="my-2">
            <Text className="text-gray-600 font-medium">Email Address</Text>
            <TextInput
              className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
              placeholder='Email address'
              onChangeText={(value) => { setEmail(value) }}
            />
          </View>
          <View className="my-2">
            <Text className="text-gray-600 font-medium">Password</Text>
            <TextInput
              className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(value) => { setPassword(value) }}
            />
          </View>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
        <TouchableOpacity onPress={() => { signUp() }} className="w-full h-[45px] bg-black items-center justify-center rounded-md">
          <Text className="text-white font-medium">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-4">
          <Text className="text-[15px]">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-orange-600 text-[15px] ml-1">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
