import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { app } from '../../firebaseConfig';

const Detail = () => {
  const [data, setData] = useState({});
  const { params } = useRoute();

  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'Products');
      const q = query(dbRef, orderByChild('name'), equalTo(params.detail));

      onValue(q, (snapshot) => {
        const dataFromDb = snapshot.val();
        if (dataFromDb) {
          setData({ id: params.detail, ...dataFromDb });
        } 
      }, (error) => {
        console.error('Error fetching data:', error);
      });
    };
    
    fetchData();
  }, [params.detail]);

  return (   
    <View>
      {data.images && data.images[0] && (
        <Image style={{ height: 250 }} source={{ uri: data.images[0] }} />
      )}
      {data.name && (
        <Text>{data.name}</Text>
      )}
    </View>
  );
};

export default Detail;
