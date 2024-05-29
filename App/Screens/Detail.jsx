import { View, Text, Image, TouchableOpacity, FlatList, Animated, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, query, orderByChild, equalTo, onValue, child, push, get } from 'firebase/database';
import { app, auth } from '../../firebaseConfig';
import helper from '../helper';
import LoadingScreen from './LoadingScreen';

import Warning from '../components/Warning';
import Success from '../components/Success';
const Detail = () => {
  const { params } = useRoute();

  const [data, setData] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showItemExistsAlert, setShowItemExistsAlert] = useState(false);
  const [isSelectedSize, setIsSelectedSize] = useState(true);
  const [isSucceededAddCart, setIsSucceededAddCart] = useState(false)

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
    setIsSelectedSize(true)
  };

  const addToCart = async () => {
    if (!selectedSize) {
      setIsSelectedSize(false);
      setTimeout(() => {
        setIsSelectedSize(true);
      }, 2000);
      return;
    }

    try {
      const db = getDatabase(app);
      const userRef = ref(db, `Users/${auth.currentUser.uid}/cart`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const cartItems = snapshot.val();
        const productExists = Object.values(cartItems).some(
          item => item.name === data.name && item.size === selectedSize
        );

        if (productExists) {
          setShowItemExistsAlert(true);
          setTimeout(() => {
            setShowItemExistsAlert(false);
          }, 2000);
          return;
        }
      }

      const productToAdd = {
        name: data.name,
        price: data.price,
        size: selectedSize,
        image: data.images[0],
        quantity: 1,
      };

      await push(userRef, productToAdd);
      setSelectedSize(null);
      setIsSucceededAddCart(true);
      setTimeout(() => {
        setIsSucceededAddCart(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  if (!data || !Object.keys(data).length)
    return <LoadingScreen />;

  const dots = Array.from({ length: data.images.length }, (_, index) => index);

  return (
    <View className="relative">
      {showItemExistsAlert && (
        <Warning content="Product already exists in the cart" />
      )}
      {!isSelectedSize && (
        <Warning content="Please select size" />
      )}
      {isSucceededAddCart && (
        <Success content="Added products and shopping cart" />
      )}
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
          <Text className="font-semibold text-[16px]">${helper.convertToFormattedString(data.price)}.00</Text>
        </View>
        <View className="my-6">
          <Text className="text-gray-600">{data.description}</Text>
        </View>
        {data.sizes &&
          <View className="flex-row">
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
