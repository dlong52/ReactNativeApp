import { getDatabase, ref, child, get, push, set } from "firebase/database";
import { app, auth } from "./firebaseConfig";
const dbRef = ref(getDatabase());
const db = getDatabase(app);

const helper = {
    convertToFormattedString: (num) => new Intl.NumberFormat().format(num),
    getCurrentTime: () => {
        const currentTime = new Date();
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const formatter = new Intl.DateTimeFormat('vi-VN', options);
        const vietnamTime = formatter.format(currentTime);
        return vietnamTime;
    },
    
    handelSearch: (value, products) => {
        const searchValue = value.toLowerCase().replace(/\s/g, '');
        const filteredProducts = products.filter(product => {
            const productName = product.name.toLowerCase().replace(/\s/g, '');
            const productCategory = product.category.toLowerCase().replace(/\s/g, '');
            return productName.includes(searchValue) || productCategory.includes(searchValue);
        });
        return filteredProducts
    },
    handelFilter: (value, products) => {
        const searchValue = value.toLowerCase().replace(/\s/g, '');
        const filteredProducts = products.filter(product => {
            const productCategory = product.category.toLowerCase().replace(/\s/g, '');
            return productCategory === searchValue;
        });
        return filteredProducts
    },
    fetchProductsData: async () => {
        try {
            const snapshot = await get(child(dbRef, `Products`));
            if (snapshot.exists()) {
                const dataArray = Object.keys(snapshot.val()).map((key) => ({ id: key, ...snapshot.val()[key] }));
                return dataArray;
            } else {
                console.log("No data available");
                return null;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    },
    fetchCategoriesData: async () => {
        try {
            const snapshot = await get(child(dbRef, `Categories`));
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching categories data:", error);
        }
    },
    fetchCartData: async () => {
        if (auth.currentUser) {
            const userRef = ref(db, `Users/${auth.currentUser.uid}`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists() && snapshot.val().cart) {
                    const userData = snapshot.val();
                    const userCart = userData.cart;
                    const dataArray = Object.keys(userCart).map((key) => ({ id: key, ...userCart[key] }));
                    if (dataArray)
                        return dataArray
                    else
                        return [];
                } else {
                    console.log("Giỏ hàng trống");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ");
            }
        }
    },
    fetchOrderData: async (status) => {
        if (auth.currentUser) {
            const userRef = ref(db, `Users/${auth.currentUser.uid}`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists() && snapshot.val().orders) {
                    const userData = snapshot.val();
                    const userOrder = userData.orders;  
                    const dataArray = Object.keys(userOrder).map((key) => ({ id: key, ...userOrder[key] }));
                    const order = dataArray.filter(item => item.status === status);
                    
                    return order;
                } else {
                    console.log("Dữ liệu không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ");
            }
        }
    },
    getAddress: async () => {
        if (auth.currentUser) {
            const userRef = ref(db, `Users/${auth.currentUser.uid}`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userAddress = userData.address;
                    if (userAddress)
                        return userAddress
                    else
                        return false;
                } else {
                    console.log("Dữ liệu không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ");
            }
        }
    },
    getPhone: async () => {
        if (auth.currentUser) {
            const userRef = ref(db, `Users/${auth.currentUser.uid}`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userPhone = userData.phoneNumber;
                    if (userPhone)
                        return userPhone
                    else
                        return false;
                } else {
                    console.log("Dữ liệu không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ");
            }
        }
    },
    createOrder: (order) => {
        const orderRef = ref(db, `Orders`);
        push(orderRef, order)
            .then(() => {
                console.log('Product added to Products collection successfully');
            })
            .catch((error) => {
                console.error('Error adding product to Products collection:', error);
            });
    },
    createOrderToUser: async (order) => {
        try {
            const userRef = ref(db, `Users/${auth.currentUser.uid}/orders`);
            await push(userRef, order);
        } catch (error) {
            console.error('Error adding product to order:', error);
        }
    },
    clearCart: async () => {
        const userRef = ref(db, `Users/${auth.currentUser.uid}/cart`);
        try {
            await set(userRef, null);
            console.log("Cart cleared successfully.");
        } catch (error) {
            console.error("Error clearing cart: ", error);
        }
    },
    fetchProvincesData: async () => {
        const provinces = "https://vapi.vnappmob.com/api/province/";
        const response = await fetch(provinces);
        const provincesData = await response.json();
        return provincesData.results;
    },
    fetchDistrictData: async (id) => {
        const district = `https://vapi.vnappmob.com/api/province/district/${id}`;
        const response = await fetch(district);
        const districtData = await response.json();
        return districtData.results;
    },
    fetchWardData: async (id) => {
        const ward = `https://vapi.vnappmob.com/api/province/ward/${id}`;
        const response = await fetch(ward);
        const wardData = await response.json();
        return wardData.results;
    },




}
export default helper;