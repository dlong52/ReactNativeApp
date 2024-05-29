import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import helper from '../helper'
import OrderItem from '../components/OrderItem'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const MyOrderScreen = () => {
  const [buttonMyOrder, setButtonMyOrder] = useState('justify-center w-1/2 flex-row h-[40px] items-center rounded-lg')
  const [contentButton, setContentButton] = useState('text-[15px] font-medium')

  const [selectedTab, setSelectedTab] = useState(true);

  const [myOrder, setMyOrder] = useState([])
  const [deliveredOrder, setDeliveredOrder] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    getOrder()
  }, [])
  const getOrder = async () => {
    const myOrderData = await helper.fetchOrderData("Processing")
    const deliveredOrderData = await helper.fetchOrderData("Delivered")
    setMyOrder(myOrderData)
    setDeliveredOrder(deliveredOrderData)
  }
  useEffect(() => {
    if (selectedTab) {
      if (myOrder)
        setData(myOrder)
    } else {
      if (deliveredOrder)
        setData(deliveredOrder)
    }
  }, [selectedTab, myOrder, deliveredOrder]);
  const updateUi = () => {
    getOrder();
    console.log("jhjhkj");
  }
  return (
    <View className="p-5">
      <View className="flex-row justify-between ">
        <TouchableOpacity
          className={selectedTab ? `${buttonMyOrder} bg-slate-800` : `${buttonMyOrder}`}
          onPress={() => { setSelectedTab(true) }}
        >
          <Text className={selectedTab ? `${contentButton} text-white ` : `${contentButton}`}>My order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={!selectedTab ? `${buttonMyOrder} bg-slate-800` : `${buttonMyOrder}`}
          onPress={() => { setSelectedTab(false) }}
        >
          <Text className={!selectedTab ? `${contentButton} text-white ` : `${contentButton}`}>Delivered</Text>
        </TouchableOpacity>
      </View>
      {(data.length > 0 ) ? <ScrollView className="h-full">
        {data.reverse().map((item, index) => {
          return <OrderItem updateUi={updateUi} data={item} key={index} />
        })}
      </ScrollView> :
        <View className=" mt-[150px] flex-col items-center">
          <Feather name="shopping-bag" size={55} color="#404040" />
          <Text className="mt-2 text-[18px] font-semibold text-[#404040]">There are no orders yet!</Text>
        </View>
      }   
    </View>
  )
}

export default MyOrderScreen