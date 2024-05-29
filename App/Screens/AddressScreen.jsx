import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { getDatabase, ref, update } from 'firebase/database';
import { app, auth } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

import helper from '../helper';

import AntDesign from '@expo/vector-icons/AntDesign';

const AddressScreen = () => {
    const navigation = useNavigation();

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [detailAddress, setDetailAddress] = useState(null);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [provinceFocus, setProvinceFocus] = useState(false);
    const [districtFocus, setDistrictFocus] = useState(false);
    const [wardFocus, setWardFocus] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const provincesData = await helper.fetchProvincesData();
                setProvinces(provincesData);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const districtData = await helper.fetchDistrictData(selectedProvince.province_id);
                    setDistricts(districtData);
                } catch (error) {
                    console.error("Error fetching districts:", error);
                }
            }
        };
        fetchDistricts();
    }, [selectedProvince]);
    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const wardData = await helper.fetchWardData(selectedDistrict.district_id);
                    setWards(wardData);
                } catch (error) {
                    console.error("Error fetching wards:", error);
                }
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    const renderLabel = (labelText, isFocused) => {
        return (
            <Text style={[styles.label, isFocused && { color: 'blue' }]}>
                {labelText}
            </Text>
        );
    };
    const createAddress = () => {
        if (selectedDistrict && selectedProvince && selectedWard && detailAddress) {
            const db = getDatabase(app);
            const userRef = ref(db, `Users/${auth.currentUser.uid}`);
            const address = {
                province: selectedProvince.province_name,
                district: selectedDistrict.district_name,
                ward: selectedWard.ward_name,
                detailAddress: detailAddress
            }
            update(userRef, { address: address })
                .then(() => {
                    navigation.navigate('Setting')
                    console.log("Address updated successfully");
                })
                .catch((error) => {
                    console.error("Failed to update address:", error);
                });
        } else {
            alert('Please select')
        }
    }
    return (
        <View className="bg-white flex-1">
            <View className="bg-white p-[16px]">
                {renderLabel('Province', provinceFocus)}
                <Dropdown
                    style={[styles.dropdown, provinceFocus && { borderColor: 'blue' }]}
                    placeholder={!provinceFocus ? 'Select Province' : '...'}
                    data={provinces}
                    search
                    searchPlaceholder='Search'
                    labelField="province_name"
                    valueField="province_name"
                    value={selectedProvince}
                    onFocus={() => setProvinceFocus(true)}
                    onBlur={() => setProvinceFocus(false)}
                    onChange={(item) => {
                        setSelectedProvince(item);
                        setSelectedDistrict(null); // Reset district on province change
                        setSelectedWard(null); // Reset ward on province change
                        setProvinceFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={provinceFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>  
            <View className="bg-white p-[16px]">
                {renderLabel('District', districtFocus)}
                <Dropdown
                    style={[styles.dropdown, districtFocus && { borderColor: 'blue' }]}
                    placeholder={!districtFocus ? 'Select District' : '...'}
                    data={districts}
                    search
                    searchPlaceholder='Search'
                    labelField="district_name"
                    valueField="district_name"
                    value={selectedDistrict}
                    onFocus={() => setDistrictFocus(true)}
                    onBlur={() => setDistrictFocus(false)}
                    onChange={(item) => {
                        setSelectedDistrict(item);
                        setSelectedWard(null); 
                        setDistrictFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={districtFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>
            <View className="bg-white p-[16px]">
                {renderLabel('Ward', wardFocus)}
                <Dropdown
                    style={[styles.dropdown, wardFocus && { borderColor: 'blue' }]}
                    placeholder={!wardFocus ? 'Select Ward' : '...'}
                    data={wards}
                    search
                    searchPlaceholder='Search'
                    labelField="ward_name"
                    valueField="ward_name"
                    value={selectedWard}
                    onFocus={() => setWardFocus(true)}
                    onBlur={() => setWardFocus(false)}
                    onChange={(item) => {
                        setSelectedWard(item);
                        setWardFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={wardFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>
            <View className="p-[16px]">
                <TextInput
                    onChangeText={(value) => { setDetailAddress(value) }}
                    className="h-[55px] w-full border border-gray-800 rounded-md pl-2 mt-1"
                    placeholder='Street name, Building, House number' />
            </View>
            <TouchableOpacity
                onPress={() => { createAddress() }}
                className="m-[16px] h-[50px] bg-black items-center justify-center rounded-md"
            >
                <Text className="text-white">Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
});
