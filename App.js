import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import LoginScreen from './App/screen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import TabNavigation from './App/Navigations/TabNavigation';
import WelcomeScreen from './App/screen/WelcomeScreen';
import AuthScreenStack from './App/Navigations/AuthScreenStack';
export default function App() {
  return (

    <ClerkProvider publishableKey='pk_test_bGlnaHQtZ2hvc3QtNTcuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <View className="flex-1 bg-white">
        <StatusBar backgroundColor="white" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <NavigationContainer>
            <AuthScreenStack/>
          </NavigationContainer>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

