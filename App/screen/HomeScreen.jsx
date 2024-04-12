import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getDatabase, ref, child, get } from "firebase/database";
import { app } from '../../firebaseConfig';
import Header from '../components/Header';
import Category from '../components/Category';
import LoadingScreen from './LoadingScreen';

export default function HomeScreen() {

    const [category, setCategory] = useState([])
    const dbRef = ref(getDatabase());
    useEffect(() => {  
        getCategoryList()   
    }, [])
    
    const getCategoryList = async () => {
        setCategory([])
        get(child(dbRef, `Categories`)).then((snapshot) => {
            if (snapshot.exists()) 
                setCategory(snapshot.val())
             else   
                console.log("No data available");
        }).catch((error) => {
            console.error(error);
        });
    }
    if (!category || !Object.keys(category).length) {
        return <LoadingScreen/>;
    }
    // stickyHeaderIndices={[0]}  
    return (
        <ScrollView className="bg-white py-8 px-[25]">
            <Header />
            <Category category={category}/>
        </ScrollView>
    )
}