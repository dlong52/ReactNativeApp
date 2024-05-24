import { ScrollView } from 'react-native'

import Header from '../components/Header';
import Category from '../components/Category';
import LoadingScreen from './LoadingScreen';
import { useEffect, useState } from 'react';
import helper from '../../helper';

export default function HomeScreen() {
    const [cart, setCart] = useState([])
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
        getCart()
    }, [])
    const getCart = async () => {
        const cartData = await helper.fetchCartData();
        setCart(cartData);
    }
    const getCategories = async () => {
        const categoriesData = await helper.fetchCategoriesData()
        setCategories(categoriesData)
    }

    if (!categories || !Object.keys(categories).length)
        return <LoadingScreen />;

    return (
        <ScrollView className="bg-white py-8 px-[25]">
            <Header cart={cart} />
            <Category/>
        </ScrollView>
    )
}