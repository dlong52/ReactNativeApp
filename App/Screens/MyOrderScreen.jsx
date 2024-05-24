import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const MyOrderScreen = () => {
  const [buttonMyOrder, setButtonMyOrder] = useState('justify-center w-1/2 flex-row h-[40px] items-center rounded-lg ')
  const [contentButton, setContentButton] = useState('text-[15px] font-medium')

  const [selectedTab, setSelectedTab] = useState(true);
  if (selectedTab == "myOrder") {
    setButtonMyOrder(`${setButtonMyOrder} `)
  }
  return (
    <View className="p-5">
      <View className="flex-row justify-between ">
        <TouchableOpacity
          className={selectedTab?`${buttonMyOrder} bg-slate-800`: `${buttonMyOrder}`}
          onPress={()=>{setSelectedTab(true)}}
        >
          <Text className={selectedTab? `${contentButton} text-white `: `${contentButton}`}>My order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={!selectedTab?`${buttonMyOrder} bg-slate-800`: `${buttonMyOrder}`}
          onPress={()=>{setSelectedTab(false)}}
        >
          <Text className={!selectedTab? `${contentButton} text-white `: `${contentButton}`}>Delivered</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyOrderScreen