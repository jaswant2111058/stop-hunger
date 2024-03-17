import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert, Button, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { useData } from '../hooks/hooks';
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNav from '../components/bottomNav';
import axios from 'axios';
import Header from '../components/header';

export default function Order({ navigation }) {

    const { selectedItem,setNav, isLoading, startLoading, stopLoading, setRecipt, user, baseURL } = useData();
    const [totalAmmount, setTotalAmmount] = useState(0);
    const [quanitity, setQuanitity] = useState(0)


    const data1 = [
        { key: '1', value: 'Address 1' },
        { key: '2', value: 'Address 2' },
        { key: '3', value: 'Address 3' },
    ]

    const adrs = {
        "Address 0": {
            houseNo: "",
            laneName: "",
            locality: "",
            district: "",
            pincode: ""
        },
        "Address 3": {
            houseNo: "XY/5",
            laneName: "5",
            locality: "Vijay nagar",
            district: "Ghaziabad",
            pincode: "201009"
        },
        "Address 1": {
            houseNo: "45/9 ",
            laneName: "1",
            locality: "Adidya Worlds",
            district: "Pune",
            pincode: "124487"
        },
        "Address 2": {
            houseNo: "P-8",
            laneName: "",
            locality: "Shanti Nagar",
            district: "Meerut",
            pincode: "134587"
        },
    }

    const [address, setAddress] = useState(adrs["Address 0"]);


    useEffect(() => {
        setTotalAmmount(selectedItem?.price * quanitity);
    }, [quanitity]);

    const placeOrder = async () => {

        if (!address.pincode || !address.houseNo || !quanitity ) {
            Alert.alert("All fields are Required")
            return
        }
        startLoading();
        const data = {
            name: user.username,
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(Date.now() + 1000 * 60 * 60),
            fullAddress: JSON.stringify(address),
            item_type: selectedItem.item_type,
            item_name: selectedItem.itemName,
            item_id: selectedItem._id,
            price: totalAmmount,
            img: selectedItem.img,
            user_id: user.user_id,
        };
        try {
            const response = await axios.post(`${baseURL}/placeorder`,
                data,
                {
                    headers: {
                        Authorization: `${user.token}`,
                    },
                }
            );
            if (response) {
                Alert.alert('Payment Successful'); 
                navigation.navigate('OrderRecipt', { _id: response?.data?._id });
            } else {
                Alert.alert('Error', response.data.error);
            }
        } catch (err) {
            console.error('Error during orderEvent:', err.message);
            Alert.alert('Error', 'An unexpected error occurred during orderdEvent.');
        } finally {
            stopLoading();
        }
    };

    return (
        <>
            <View style={styles.homeWrapper}>
                <View style={styles.homeMain}>
                    <Header navigation={navigation} />
                    <ScrollView>
                        <View>
                            <Text style={styles.eatSomething}>
                                Let's Eat Something !
                            </Text>
                            <Text style={styles.delicious}>
                                DELICIOUS
                            </Text>
                        </View>
                        <View style={styles.infoBar}>
                            <Image
                                style={styles.foodImage}
                                source={{ uri: `${baseURL}/img/${selectedItem?.img}` }}
                            />
                            <Text
                                style={styles.foodName} >
                                {selectedItem?.itemName}
                            </Text>
                            <Text style={styles.foodPrice}>
                                ₹{selectedItem?.price}
                            </Text>
                            <View style={styles.btnInput}>
                                <Pressable onPress={() => setQuanitity(String(parseInt(Math.max((quanitity - 1), 0))))}>
                                    <Text style={styles.minusBtn}>-</Text>
                                </Pressable>
                                <TextInput
                                    style={styles.qunInput}
                                    keyboardType='numeric'
                                    placeholder='0'
                                    placeholderTextColor={"gray"}
                                    value={quanitity.toString()}
                                    onChangeText={(value) => { setQuanitity(value) }}
                                />
                                <Pressable onPress={() => setQuanitity(String(parseInt(Math.min(parseInt(quanitity) + 1, 50))))}>
                                    <Text style={styles.plusBtn}>+</Text>
                                </Pressable>
                            </View>
                        </View>
                        <SelectList
                            setSelected={(val) => setAddress(adrs[val])}
                            data={data1}
                            save="value"
                            placeholder={"Select Address"}
                            search={false}
                            fontFamily="Helvetica"
                            arrowicon={<Icon style={{ marginTop: -5 }} name="chevron-down" size={25} color={'black'} />}
                            inputStyles={{ color: "black", fontSize: 12 }}
                            dropdownTextStyles={{ color: "black", fontSize: 12 }}
                            boxStyles={{ height: 40, width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
                            dropdownStyles={{ width: "90%", marginLeft: "auto", marginRight: "auto", }}
                        />
                        <View style={styles.container}>
                            <Text style={styles.label}>House No.</Text>
                            <TextInput
                                style={styles.input}
                                value={address.houseNo}
                                onChangeText={(v) => setAddress((prev) => ({ ...prev, houseNo: v }))}
                                placeholder="Enter house number"
                                placeholderTextColor={"gray"}
                            />
                            <Text style={styles.label}>Lane Name</Text>
                            <TextInput
                                style={styles.input}
                                value={address.laneName}
                                onChangeText={(v) => setAddress((prev) => ({ ...prev, laneName: v }))}
                                placeholder="Enter lane name"
                                placeholderTextColor={"gray"}
                            />
                            <Text style={styles.label}>Locality</Text>
                            <TextInput
                                style={styles.input}
                                value={address.locality}
                                onChangeText={(v) => setAddress((prev) => ({ ...prev, locality: v }))}
                                placeholder="Enter locality"
                                placeholderTextColor={"gray"}
                            />
                            <Text style={styles.label}>District</Text>
                            <TextInput
                                style={styles.input}
                                value={address.district}
                                onChangeText={(v) => setAddress((prev) => ({ ...prev, district: v }))}
                                placeholder="Enter district"
                                placeholderTextColor={"gray"}
                            />
                            <Text style={styles.label}>Pincode</Text>
                            <TextInput
                                style={styles.input}
                                value={address.pincode}
                                onChangeText={(v) => setAddress((prev) => ({ ...prev, pincode: v }))}
                                placeholder="Enter pincode"
                                keyboardType="numeric"
                                placeholderTextColor={"gray"}
                            />
                            {/* <Pressable onPress={() => AddAddress()} style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }} >
                                <Text style={{
                                    width: 100,
                                    height: 30,
                                    textAlign: 'center',
                                    fontSize: 20,
                                    borderRadius: 10,
                                    color: 'white',
                                    backgroundColor: '#FBBD10',
                                }}>Add</Text>
                            </Pressable> */}
                        </View>
                        <View style={styles.payment}>
                            <Text style={styles.TotalAmmount}>
                                Total Ammount : ₹{totalAmmount}
                            </Text>
                            <Pressable onPress={() => placeOrder()} >
                                <Text style={styles.payBtn}>Pay</Text>
                            </Pressable>
                        </View>
                        <View style={{ height: 60 }}></View>
                    </ScrollView>
                    <View style={styles.navwrapper}>
                        <BottomNav navigation={navigation} />
                    </View>
                </View>
            </View >

            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
                onRequestClose={() => { }}>
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#FBBD10" />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({

    homeWrapper: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10
    },
    homeMain: {
        width: '100%',
        height: "100%",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    eatSomething: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    delicious: {
        color: '#FBBD10',
        textAlign: 'center',
        fontSize: 20,
    },
    foodPrice: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'black'
    },
    foodImage: {
        width: 35,
        height: 35,
        borderRadius: 2,
    },
    foodName: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'black'
    },
    infoBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },
    plusBtn: {
        width: 30,
        height: 30,
        textAlign: 'center',
        fontSize: 22,
        backgroundColor: '#FBBD10',
        borderRadius: 5,
        color: 'white'
    },
    minusBtn: {
        width: 30,
        height: 30,
        textAlign: 'center',
        fontSize: 22,
        backgroundColor: '#FBBD10',
        borderRadius: 5,
        color: 'white'
    },
    qunInput: {
        width: 30,
        height: 30,
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        color: "black",
        padding: 5
    },
    payment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    payBtn: {
        width: 70,
        height: 30,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        color: 'white',
        backgroundColor: '#FBBD10',
    },
    TotalAmmount: {
        fontSize: 20,
        color: 'black'
    },

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: "black"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5,
        color: "black",
        paddingLeft: 10
    },
});
