import {ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import Product from '../components/Product';
const ItemList = () => {
  const [data, setData] = useState([])
  const { params } = useRoute()
  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase();
      const dbRef = ref(db, 'Products');
      const q = query(dbRef, orderByChild('category'), equalTo(params.category));

      onValue(q, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
          setData(dataArray);
        }
      }, (error) => {
        console.error('Error fetching data:', error);
      });
    };
    fetchData();
  }, [params.category]);

  return (
    <ScrollView className="bg-white p-6">
      <Product data={data}/> 
    </ScrollView>
  )
}

export default ItemList