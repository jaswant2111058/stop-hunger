import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import Header from '../components/header';
import BottomNav from '../components/bottomNav';

export default function Saved({ navigation }) {



    return (
        <>
            <View style={styles.homeWrapper}>
                <View style={styles.homeMain}>
                    <Header navigation={navigation} />
                    <ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                            <Text style={{ color: "black" }}>
                                Nothing To Show
                            </Text>
                        </View>
                        <View style={{ height: 60 }}></View>
                    </ScrollView>

                    <View style={styles.navwrapper}>
                        <BottomNav navigation={navigation} />
                    </View>
                </View>
            </View>
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
        color: 'black',
    },
    delicious: {
        color: '#FBBD10',
        textAlign: 'center',
        fontSize: 20,
    },
    foods: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        padding: 5,
    },
    food: {
        width: 150,
        height: 170,
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
    },
    foodImage: {
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        borderRadius: 20,
    },
    foodName: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        color: 'black',
    },
    foodRating: {
        flexDirection: 'row'
    },
    foodPriceRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    resultWrapper: {

        width: 160,
        height: 265,
        borderColor: "gray",
        borderRadius: 20,
        backgroundColor: "#fff",
        padding: 10,
        elevation: 10

    },

    ItemImage: {
        width: 140,
        height: 120,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5,
        borderRadius: 20,
    },
    resultList: {
        flexDirection: 'row',
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 5,
        marginTop: 10,
        paddingHorizontal: 5
    },
    filter: {
        flexDirection: 'row',
        justifyContent: "space-between",

        paddingHorizontal: 15,

    },
    filterInner: {
        width: 100,

    },
    addNewdiscover: {
        backgroundColor: "black",
        width: 50,
        borderRadius: 100
    },
    addNewdiscoverWrapper: {
        position: "absolute",
        right: 0,
        bottom: 70,
        padding: 20
    },
    filterOptions: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    filterOptionsText: {

        color: "black",
        fontSize: 14,
        fontWeight: "600"

    },
    filterList: {
        color: "black"
    },
    ItemName: {
        marginTop: 5,
        color: "black",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center"
    },
    ItemDiscription: {
        color: "gray",
        textAlign: "center"
    },
    ItemPriceWrapper: {

        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        alignItems: "center",
        marginBottom: 5,

    },
    ItemPrice: {
        color: "black",
        fontSize: 16,
        fontWeight: "700"
    },
    ItemDiscount: {
        color: "black",
        fontSize: 12
    },
    ItemBottom: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    viewDetailWrapper: {
        marginTop: 5,
        backgroundColor: "#FBBD10",
        width: 100,
        borderRadius: 12
    },
    viewDetail: {
        marginTop: 2,
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center"
    }
});
