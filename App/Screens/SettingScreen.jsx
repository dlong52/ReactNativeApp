import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import helper from '../../helper';
import { FontAwesome } from '@expo/vector-icons';
import { app, auth } from '../../firebaseConfig';
import { getDatabase, ref, update } from 'firebase/database';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);

  useEffect(() => {
    getCheckoutInfoData();
  }, []);

  const getCheckoutInfoData = async () => {
    const addressData = await helper.getAddress();
    const phoneNumberData = await helper.getPhone();
    setAddress(addressData);
    setPhoneNumber(phoneNumberData);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^0[0-9]{9}$/; // Regular expression for Vietnamese phone numbers
    return regex.test(phoneNumber);
  };

  const savePhoneNumber = () => {
    if (validatePhoneNumber(phoneNumberInput)) {
      const db = getDatabase(app);
      const userPhoneRef = ref(db, `Users/${auth.currentUser.uid}`);
      update(userPhoneRef, { phoneNumber: phoneNumberInput })
        .then(() => {
          console.log("Phone number updated successfully");
          setShowPhoneInput(false);
        })
        .catch((error) => {
          console.error("Failed to update phone number:", error);
        });
      getCheckoutInfoData();
      setShowPhoneInput(!showPhoneInput);
      setPhoneNumberError(null);
    } else {
      setPhoneNumberError("Invalid phone number. Please enter a valid Vietnamese phone number starting with 0 and followed by 9 digits.");
    }
  };

  return (
    <View className="p-5">
      <View>
        <Text className="font-medium text-[14px] text-gray-500">Address:</Text>
        <View className="w-full h-[60px] bg-white flex-row items-center px-2 mt-2 rounded-md justify-between shadow-sm">
          {address && <Text className="flex-1 leading-5 font-medium text-gray-500" >{address.detailAddress}, {address.ward}, {address.district}, {address.province}</Text>}
          <TouchableOpacity
            className="p-2"
            onPress={() => { navigation.navigate('Address') }}
          >
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-3 ">
        <Text className="font-medium text-[14px] text-gray-500">Phone number:</Text>
        {!showPhoneInput &&
          <View className="w-full h-[60px] bg-white shadow-sm flex-row items-center px-2 mt-2 rounded-md justify-between">
            {phoneNumber && <Text className="flex-1 leading-4 font-medium text-gray-500" >{phoneNumber}</Text>}
            <TouchableOpacity
              className="p-2"
              onPress={() => { setShowPhoneInput(!showPhoneInput) }}
            >
              <FontAwesome name="pencil-square-o" size={24} color="black" />
            </TouchableOpacity>
          </View>}
        {showPhoneInput && <View className="mt-2">
          <View className="flex-row items-center h-[55px] w-full border border-gray-400 rounded-md pl-2 mt-1">
            <TextInput
              className="h-[55px] flex-1"
              placeholder='0987654321'
              onChangeText={(value) => { setPhoneNumberInput(value); setPhoneNumberError(null); }}
            />
            <TouchableOpacity 
              className="p-2"
              onPress={() => { setShowPhoneInput(!showPhoneInput) }} 
            >
              <Text className=" text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
          {phoneNumberError && <Text style={{ color: 'red', marginTop: 5 }}>{phoneNumberError}</Text>}
          <TouchableOpacity
            onPress={() => { savePhoneNumber() }}
            className="h-[50px] bg-black items-center justify-center rounded-md mt-2"
          >
            <Text className="text-white">Save</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </View>  
  ); 
};

export default SettingScreen;
