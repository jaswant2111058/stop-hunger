import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getOrderList } from '../components/getOrderList';
import { useData } from '../hooks/hooks';
import Header from '../components/header';
import BottomNav from '../components/bottomNav';

export default function OrderList({ navigation }) {
    const { user, baseURL, setNav, setRecipt, } = useData();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getOrderList(user, baseURL);
            setData(res);
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        setNav(2)
    }, [])

    return (
        <View style={styles.homeWrapper}>
            <View style={styles.homeMain}>
                <Header navigation={navigation} />
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "#FBBD10" }}>Your Orders</Text>
                    </View>
                    {data?.map((item, index) => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('OrderRecipt', { _id: item?.order_id });
                        }}  key={item._id}>
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: `${baseURL}/img/${item.img}` }} style={styles.image} />
                                <View>
                                    <Text style={{ fontWeight: "700", color: "gray", fontSize: 16 }}>{item.itemName}</Text>
                                    <Text style={{ color: "black", fontSize: 14, fontWeight: "700" }}> ₹ {item.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style ={{height:50}}>

                    </View>
                </ScrollView>
                <View style={styles.navwrapper}>
                    <BottomNav navigation={navigation} />
                </View>
            </View>
        </View>
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FBBD10',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 20,
        borderRadius: 10,
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
});
