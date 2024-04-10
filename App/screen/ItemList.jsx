import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { app } from '../../firebaseConfig';
import LastestProduct from '../components/LastestProduct';
const ItemList = () => {
  const [data, setData] = useState([])
  const { params } = useRoute()
  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase();
      const dbRef = ref(db, 'Products');
      // Tạo truy vấn để lấy các đối tượng có trường 'category' bằng giá trị từ params.category
      const q = query(dbRef, orderByChild('category'), equalTo(params.category));

      // Thực hiện truy vấn và lắng nghe sự thay đổi
      onValue(q, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Chuyển object thành mảng để cập nhật state data
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
      <LastestProduct lastTestPd={data}/> 
    </ScrollView>
  )
}

export default ItemList