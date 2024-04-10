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
          // Convert object to array
          const dataArray = Object.keys(dataFromDb).map((key) => ({ id: key, ...dataFromDb[key] }));
          setData(dataArray[0]); // Assuming you only expect one result
        }
      }, (error) => {
        console.error('Error fetching data:', error);
      });
    };

    fetchData();

  }, [params.detail]);
console.log(data.name);
  return (
    <View>
      {/* <Image source={{uri: data.images[0]}} className="h-[250px]"/> */}
      <Text>{data.price}</Text>
      {/* Display other data fields as needed */}
    </View>
  );
};

export default Detail;
