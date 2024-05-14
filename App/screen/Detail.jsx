import { View, Text, Image, TouchableOpacity, FlatList, Animated, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, query, orderByChild, equalTo, onValue, child, push } from 'firebase/database';
import { app, auth } from '../../firebaseConfig';
import helper from '../../helper';
import LoadingScreen from './LoadingScreen';

const Detail = () => {
  const [data, setData] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const { params } = useRoute();

  const styleSizeButton = "mr-4 border border-black w-[40px] h-[30px] items-center justify-center rounded-full";
  const styleAddToCartButton = "bg-black rounded-2xl justify-center items-center h-[45px] my-7";

  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'Products');
      const q = query(dbRef, orderByChild('name'), equalTo(params.detail));

      onValue(q, (snapshot) => {
        const dataFromDb = snapshot.val();
        if (dataFromDb) {
          const dataArray = Object.keys(dataFromDb).map((key) => ({ id: key, ...dataFromDb[key] }));
          setData(dataArray[0]);
        }
      }, (error) => {
        console.error('Error fetching data:', error);
      });
    };
    fetchData();
  }, [params.detail]);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    const db = getDatabase(app);
    const userRef = ref(db, `Users/${auth.currentUser.uid}`);
    const productToAdd = {
      name: data.name,
      price: data.price,
      size: selectedSize,
      image: data.images[0],
      quantity: 1,
    };
    push(child(userRef, 'cart'), productToAdd)
      .then(() => {
        console.log('Product added to cart successfully');
        alert('Product added successfully');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  if (!data || !Object.keys(data).length)
    return <LoadingScreen />;

  // Tạo mảng các điểm dựa trên số lượng hình ảnh
  const dots = Array.from({ length: data.images.length }, (_, index) => index);

  return (
    <View>
      <View className="relative">
        <FlatList
          data={data.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} className="h-[360px]" style={{ width: width }} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
        />
        <View className="flex-row justify-center absolute w-full bottom-1">
          <View className="bg-gray-100 flex-row justify-center p-1 rounded-full">
            {dots.map((dotIndex) => (
              <View
                key={dotIndex}
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  backgroundColor: currentIndex === dotIndex ? 'black' : 'lightgray',
                  marginHorizontal: 5,
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <View className="bg-white h-full p-6 rounded-t-[40px] shadow-md">
        <View className="flex-row justify-between items-center">
          <Text className="w-1/2 font-medium text-[13px] text-gray-700">{data.name}</Text>
          <Text className="font-semibold text-[16px]">{helper.convertToFormattedString(data.price)} VND</Text>
        </View>
        <View className="my-6">
          <Text className="text-gray-600">{data.description}</Text>
        </View>
        {data.sizes && <View className="flex-row">
          {data.sizes.map((size, index) => (
            <TouchableOpacity key={index} onPress={() => { handleSizeSelection(size) }} className={size == selectedSize ? `bg-black ${styleSizeButton}` : styleSizeButton}>
              <Text className={size == selectedSize ? 'text-white' : 'text-black'}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>}
        <TouchableOpacity onPress={addToCart} className={styleAddToCartButton}>
          <Text className="text-white">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;
