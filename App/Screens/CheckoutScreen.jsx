import { View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import WebView from 'react-native-webview';
import React, { useEffect, useState } from 'react'
import helper from '../../helper'
import ChecoutItem from '../components/ChecoutItem'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import queryString from 'query-string';
import paypayApi from '../../apis/paypayApi';
import Warning from '../components/Warning';
import { auth } from '../../firebaseConfig';
const CheckoutScreen = () => {
    const navigation = useNavigation()
    const userId = auth.currentUser.uid

    const [cartList, setCartList] = useState([])
    const [totalPayment, setTotalPayment] = useState(0)
    const [address, setAddress] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)

    const [paypalUrl, setPaypalUrl] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    const [isAddress, setIsAddress] = useState(true)
    const [isPhoneNumber, setIsPhoneNumber] = useState(true)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        setTotalPayment(cartList?.reduce((totalPayment, item) => totalPayment + item.price * item.quantity, 0))
    }, [cartList])
    useEffect(() => {
        getCartList()
        getCheckoutInfoData()
    }, [])

    const getCheckoutInfoData = async () => {
        const addressData = await helper.getAddress()
        const phoneNumberData = await helper.getPhone()
        setAddress(addressData)
        setPhoneNumber(phoneNumberData)
    }
    const getCartList = async () => {
        const cartData = await helper.fetchCartData()
        setCartList(cartData)
    }


    const order = {
        user_id: userId,
        payment_method: "Paypal payment",
        products: cartList,
        shipping_address: address,
        phoneNumber: phoneNumber,
        status: "Processing",
        totalPayment: totalPayment
    }
    const onPressPaypal = async () => {
        if (!address || !phoneNumber) {
            console.log("Please enter");
            if (!address) {
                setIsAddress(false)
                setTimeout(() => {
                    setIsAddress(true)
                }, 2000)
            }
            if (!phoneNumber) {
                setIsPhoneNumber(false)
                setTimeout(() => {
                    setIsPhoneNumber(true)
                }, 2000)
            }
        } else {
            setLoading(true)
            try {
                const token = await paypayApi.generateToken();
                const orderDetails = {
                    "intent": "CAPTURE",
                    "purchase_units": [
                        {
                            "items": cartList.map(item => ({
                                "name": item.name,
                                "quantity": item.quantity,
                                "unit_amount": {
                                    "currency_code": "USD",
                                    "value": item.price
                                }
                            })),
                            "amount": {
                                "currency_code": "USD",
                                "value": totalPayment,
                                "breakdown": {
                                    "item_total": {
                                        "currency_code": "USD",
                                        "value": totalPayment
                                    }
                                }
                            }
                        }
                    ],
                    "application_context": {
                        "return_url": "https://example.com/return",
                        "cancel_url": "https://example.com/cancel"
                    }
                };
                const res = await paypayApi.createOrder(token, orderDetails);
                setAccessToken(token);
                setLoading(false)
                if (res?.links) {
                    const findUrl = res.links.find(data => data?.rel === "approve");
                    setPaypalUrl(findUrl.href);
                }
            } catch (error) {
                console.log("error", error);
                setLoading(false)
            }
        }
    };

    const onUrlChange = (webviewState) => {
        //console.log("webviewStatewebviewState", webviewState)
        if (webviewState.url.includes('https://example.com/cancel')) {
            clearPaypalState()
            return;
        }
        if (webviewState.url.includes('https://example.com/return')) {
            const urlValues = queryString.parseUrl(webviewState.url)
            //console.log("my urls value", urlValues)
            const { token } = urlValues.query
            if (!!token) {
                paymentSucess(token)
            }

        }
    }
    const paymentSucess = async (id) => {
        try {
            const res = paypayApi.capturePayment(id, accessToken)
            helper.createOrder(order)
            helper.clearCart()
            clearPaypalState()
            navigation.navigate("NotiOrder")
        } catch (error) {
            console.log("error raised in payment capture", error)
        }
    }
    const clearPaypalState = () => {
        setPaypalUrl(null)
        setAccessToken(null)
    }
    return (
        <View className="flex-1 relative">
            {!isAddress && <Warning content="You have not added a address!" />}
            {!isPhoneNumber && <Warning content="You have not added a phone number!" />}
            {(!isPhoneNumber && !isAddress) && <Warning content="Please add your phone number and address!" />}
            <ScrollView className="p-5">
                {cartList && <View>
                    {cartList.map((item, index) => {
                        return <ChecoutItem key={index} data={item} />
                    })}
                </View>}
                <View>
                    <View>
                        <Text className="font-semibold text-[15px] my-2">Delivery address</Text>
                        <View className="w-full h-[60px] bg-white shadow-sm flex-row items-center px-2 mt-2 rounded-md justify-between">
                            {address ?
                                <Text className="flex-1 leading-4 font-medium text-gray-500" >
                                    {address.detailAddress}, {address.ward}, {address.district}, {address.province}
                                </Text> :
                                <Text className="flex-1 leading-4 font-medium text-gray-500" >
                                    Please add your address
                                </Text>
                            }
                            <TouchableOpacity
                                className="p-2"
                                onPress={() => { navigation.navigate('Address') }}
                            >
                                <FontAwesome name="pencil-square-o" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text className="font-semibold text-[15px] my-2">Phone number</Text>
                        <View className="w-full h-[60px] bg-white shadow-sm flex-row items-center px-2 mt-2 rounded-md justify-between">
                            {phoneNumber ?
                                <Text className="flex-1 leading-4 font-medium text-gray-500" >{phoneNumber}</Text> :
                                <Text className="flex-1 leading-4 font-medium text-gray-500" >Please add your phone number</Text>
                            }
                            <TouchableOpacity
                                className="p-2"
                                onPress={() => { navigation.navigate('Setting') }}
                            >
                                <FontAwesome name="pencil-square-o" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View>
                        <Text className="font-semibold text-[15px] my-2">Payment Method</Text>
                        <View className="w-full h-[60px] flex-row items-center bg-white pl-3 rounded-lg">
                            <Text></Text>
                        </View>
                    </View> */}
                </View>
            </ScrollView>
            <View className="flex-row items-center justify-between h-[55px] bg-white">
                <View className="ml-3">
                    <Text className="font-semibold text-[15px]">Total payment: ${helper.convertToFormattedString(totalPayment)}.00</Text>
                </View>
                <TouchableOpacity onPress={() => { onPressPaypal() }} className="flex-row justify-center items-center h-full w-[120px] bg-black">
                    {isLoading ? <ActivityIndicator size={'small'} /> : <Text className='text-white'>Payment</Text>}
                </TouchableOpacity>
            </View>
            <Modal
                visible={!!paypalUrl}
            >
                <TouchableOpacity
                    onPress={clearPaypalState}
                    style={{ margin: 24 }}
                >
                    <Text >Closed</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <WebView
                        source={{ uri: paypalUrl }}
                        onNavigationStateChange={onUrlChange}
                    />

                </View>
            </Modal>
        </View>
    )
}
export default CheckoutScreen