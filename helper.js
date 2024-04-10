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
    fetchData: async () => {
        const productsApi = "https://86yfl7-8080.csb.app/books";
        const response = await fetch(productsApi);
        const data = await response.json();
        return data;
    },
    fetchDataCart: async () => {
        const cartApi = "http://localhost:3000/cart";
        const response = await fetch(cartApi);
        const data = await response.json();
        return data;
    },
    capitalizeEveryWord: (string) => {
        return string.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }
    
}
export default helper;