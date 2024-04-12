import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function NotificationScreen() {
  const [notify, setnotify] = useState([])
  return (
    <View className="flex items-center justify-center h-full p-6">
      {notify.length>0 ? 
        <Text>Notification Screen</Text>: 
        <View className="flex items-center justify-center">
          <Text className="text-[20px] font-semibold my-4">No Messages Yet</Text>
          <Text className="text-[16px] text-center text-gray-700">Messages an notifications from Draco will show up here</Text>
        </View>
      }
    </View>
  )
}