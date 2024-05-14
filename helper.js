import { getDatabase, ref, child, get } from "firebase/database";
import { app, auth } from "./firebaseConfig";
const dbRef = ref(getDatabase());
const db = getDatabase(app);

const helper = {
    removeDuplicates: (arr) => {
        return arr = [...new Set(arr)];
    },
    extractFieldValues: (arr, fieldName) => {
        return arr.map(item => {
            return item[fieldName];
        });
    },
    convertToFormattedString: (num) => new Intl.NumberFormat().format(num),
    truncateText: (str) => {
        const limit = 10;
        let shortText = str.split(" ").slice(0, limit).join(" ");
        return shortText + "...";
    },
    handelSearch: (value, products) => {
        const searchValue = value.toLowerCase().replace(/\s/g, '');
        const filteredProducts = products.filter(product => {
            // Loại bỏ tất cả các khoảng trắng khỏi tên sản phẩm và danh mục sản phẩm
            const productName = product.name.toLowerCase().replace(/\s/g, '');
            const productCategory = product.category.toLowerCase().replace(/\s/g, '');
            // So sánh tên sản phẩm hoặc danh mục sản phẩm với giá trị tìm kiếm
            return productName.includes(searchValue) || productCategory.includes(searchValue);
        });
        // Cập nhật state products với các sản phẩm đã lọc
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
        const userRef = ref(db, `Users/${auth.currentUser.uid}`);
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userCart = userData.cart;
                const dataArray = Object.keys(userCart).map((key) => ({ id: key, ...userCart[key] }));
                if (dataArray)
                    return dataArray
                else
                    return [];
            } else {
                console.log("Dữ liệu không tồn tại");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ");
        }
    },
    getAddress: async () => {
        const userRef = ref(db, `Users/${auth.currentUser.uid}`);
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userAddress = userData.address;
                if (userAddress)
                    return userAddress
                else
                    return [];
            } else {
                console.log("Dữ liệu không tồn tại");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ");
        }
    },
    getPhone: async () => {
        const userRef = ref(db, `Users/${auth.currentUser.uid}`);
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userPhone = userData.phoneNumber;
                if (userPhone)
                    return userPhone
                else
                    return [];
            } else {
                console.log("Dữ liệu không tồn tại");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ");
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