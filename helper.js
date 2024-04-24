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
                return snapshot.val();
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
            const snapshot = await get(userRef); // Lấy dữ liệu từ userRef
            if (snapshot.exists()) {
                const userData = snapshot.val(); // Dữ liệu người dùng, bao gồm cả trường "cart"
                const userCart = userData.cart;
                const dataArray = Object.keys(userCart).map((key) => ({ id: key, ...userCart[key] })); // Lấy trường dữ liệu "cart" từ dữ liệu người dùng
                return dataArray
            } else {
                console.log("Dữ liệu không tồn tại");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu:", error);
        }
    }


}
export default helper;