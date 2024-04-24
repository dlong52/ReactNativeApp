import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../components/Header';
import Category from '../components/Category';
import LoadingScreen from './LoadingScreen';
import helper from '../../helper';

export default function HomeScreen() {

    const [category, setCategory] = useState([])
    useEffect(() => {
        getCategoryList()
    }, [])
    const getCategoryList = async () => {
        const categoryData = await helper.fetchCategoriesData()
        setCategory(categoryData)
    }
    if (!category || !Object.keys(category).length) {
        return <LoadingScreen />;
    }
    // stickyHeaderIndices={[0]}  
    return (
        <ScrollView className="bg-white py-8 px-[25]">
            <Header />
            <Category category={category} />
        </ScrollView>
    )
}