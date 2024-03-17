import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useData } from '../hooks/hooks';
import QRCode from 'react-native-qrcode-svg';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Rupee from 'react-native-vector-icons/FontAwesome';
import BottomNav from '../components/bottomNav';
import { getRecipt } from '../components/getOrderList';
import { useRoute } from '@react-navigation/native';

export default function OrderRecipt({ navigation }) {

    const route = useRoute(); 
    const { _id } = route.params;

    const {  baseURL,  user, isLoading, startLoading, stopLoading } = useData();
    const [recipt, setRecipt] = useState({})

    if (!recipt?.name) {
        try {
            const fetchReceipt = async () => {
                startLoading();
                const res = await getRecipt(user, _id, baseURL);
                console.log(res)
                setRecipt(res);
                stopLoading();
            };
            fetchReceipt();
        }
        finally {
            stopLoading();
        }
    }

    return (
        <>
            <View style={styles.homeWrapper}>
                <View style={styles.homeMain}>
                    <View style={styles.header}>
                        <Icon2 onPress={() => navigation.navigate("Home")} name="arrowleft" size={40} color="black" />
                        <Text style={styles.title}>Order Details</Text>
                    </View>
                    {isLoading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <ScrollView>
                            <View style={styles.container}>
                                <View style={styles.imageWrapper}>
                                    <Image style={styles.foodImage} source={{ uri: `${baseURL}/img/${recipt?.img}` }} />
                                </View>
                                <Text style={styles.foodName}>{recipt?.item_name}</Text>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>{recipt.date?.substring(0, 10)}</Text>
                                    <Text style={styles.dateText}>{recipt.startTime?.substring(11, 16)} - {recipt.endTime?.substring(11, 16)}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Rupee name='rupee' size={30} color={'#FBBD10'} />
                                    <Text style={styles.priceText}>{recipt?.price}</Text>
                                </View>
                                <View style={styles.qrcode}>
                                    <QRCode value={recipt?.orderHash} size={150} color="black" backgroundColor="white" />
                                </View>
                                <Text style={styles.userName}></Text>
                            </View>
                        </ScrollView>
                    )}
                </View>
                <View style={styles.navwrapper}>
                    <BottomNav navigation={navigation} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    homeWrapper: {
        flex: 1,
    },
    homeMain: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        paddingHorizontal: 10,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color:"black"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        alignSelf: 'center',
        borderColor: 'gray',
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 10,
        elevation: 10,
        marginBottom: 20,
        marginTop: 50,
    },
    foodImage: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },
    foodName: {
        fontSize: 22,
        color: '#FBBD10',
        alignSelf: 'center',
        marginBottom: 5,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    dateText: {
        color: 'black',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    priceText: {
        color: '#FBBD10',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 5,
    },
    qrcode: {
        alignSelf: 'center',
        marginTop: 10,
    },
    userName: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
    },
    navwrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    imageWrapper:{
        marginLeft:"auto",
        marginRight:"auto",
        padding: 5,
        width: 140,
        height: 140,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E7E7FF",
        borderRadius: 100,
        elevation:10,
        marginBottom:10,
        marginTop:-50
    }
});
