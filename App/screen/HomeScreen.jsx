import { ScrollView } from 'react-native'

import Header from '../components/Header';
import Category from '../components/Category';
import LoadingScreen from './LoadingScreen';

export default function HomeScreen() {
    if (!categories || !Object.keys(categories).length) {
        return <LoadingScreen />;
    }
    return (
        <ScrollView className="bg-white py-8 px-[25]">
            <Header/>
            <Category/>
        </ScrollView>
    )
}