import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
import React, { createContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import TabNavigation from './App/Navigations/TabNavigation';
import AuthScreenStack from './App/Navigations/AuthScreenStack';

import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext(null);
export default function App() {     
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {  
      setUser(user);  
    });     
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <View className="flex-1 bg-white">
        <StatusBar backgroundColor="white" />
        <NavigationContainer>
          {user ? <TabNavigation /> : <AuthScreenStack />}
        </NavigationContainer>
      </View>       
    </UserContext.Provider>        
  );  
}    