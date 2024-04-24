import React, { createContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ClerkProvider } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import TabNavigation from './App/Navigations/TabNavigation';
import AuthScreenStack from './App/Navigations/AuthScreenStack';
import { app, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
   
// Tạo context
const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);  
  useEffect(() => { 
    onAuthStateChanged(auth, (user) => {
      console.log("User:", user);
      setUser(user);
    });
  }, []);

  return (
    // Sử dụng Provider của UserContext để cung cấp giá trị cho toàn bộ ứng dụng
    <UserContext.Provider value={user}>
      <ClerkProvider publishableKey='pk_test_bGlnaHQtZ2hvc3QtNTcuY2xlcmsuYWNjb3VudHMuZGV2JA'>
        <View className="flex-1 bg-white">
          <StatusBar backgroundColor="white" />
          <NavigationContainer>
            {user ? <TabNavigation /> : <AuthScreenStack />}
          </NavigationContainer>
        </View>
      </ClerkProvider>
    </UserContext.Provider>
  );
}
 