import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { app } from '../../firebaseConfig';
import helper from '../../helper';
import LoadingScreen from './LoadingScreen';

const Detail = () => {
  const [data, setData] = useState({});
  const { params } = useRoute();

  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'Products');
      const q = query(dbRef, orderByChild('name'), equalTo(params.detail));

      onValue(q, (snapshot) => {
        const dataFromDb = snapshot.val();
        if (dataFromDb) {
          // Convert object to array
          const dataArray = Object.keys(dataFromDb).map((key) => ({ id: key, ...dataFromDb[key] }));
          setData(dataArray[0]); // Assuming you only expect one result
        }
      }, (error) => {
        console.error('Error fetching data:', error);
      });
    };

    fetchData();

  }, [params.detail]);

  // Check if data is available before rendering
  if (!data || !Object.keys(data).length) {
    return <LoadingScreen/>;
  }
  return (
    <View >
      <Image source={{ uri: data.images[0] }} className=" h-[350px]" />
      <View className="bg-white h-full p-6 rounded-t-[40px] shadow-md">
        <View className="flex-row justify-between items-center">
          <Text className=" w-1/2 font-medium text-[13px] text-gray-700">{data.name}</Text>
          <Text className="font-semibold text-[16px]">{helper.convertToFormattedString(data.price)} VND</Text>
        </View>
        <View className="my-6">
          <Text className="text-gray-600">{data.description}</Text>
        </View>
        <View className="flex-row ">
          {data.sizes.map((size, index) => (
            <View key={index} className="mr-6 border border-black w-[40px] h-[30px] items-center justify-center rounded-full">
              <Text >{size}</Text>
            </View> 
          ))}
        </View>

        <TouchableOpacity className="bg-black rounded-2xl justify-center items-center h-[45px] my-7">
          <Text className="text-white">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;
