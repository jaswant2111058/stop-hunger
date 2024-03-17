import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { useData } from '../hooks/hooks';
import Star from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/header';
import BottomNav from '../components/bottomNav';

export default function Home({ navigation }) {

    const { user, getItem, baseURL, setSelectedItem,setNav,nav, save, setSave } = useData()

    useEffect(() => {
        if (!user) {
            navigation.navigate("Login")
        }
    }, [])

    useEffect(()=>{
      setNav(0)  
    },[])

    const Save = (item) => {

        for (let i = 0; i < save.length; i++) {
            if (save[i]._id == item._id) {
                const remove = save.filter((e) => {

                    if (e._id !== item._id) {
                        return e
                    }

                })
                setSave(remove)
                setSave(remove)
                return;
            }
        }
        setSave([...save, item])
    }

    const isSaved = (id) => {

        for (let i = 0; i < save.length; i++) {
            if (save[i]._id == id) return true
        }
        return false

    }

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
                        <View>
                            {/* <Search /> */}
                        </View>

                        <View style={styles.foods}>

                            {
                                getItem.map((item) => {
                                    return (
                                        <Pressable style={{marginLeft:"auto", marginRight:"auto"}} onPress={() => { setSelectedItem(item); navigation.navigate('Order') }} key={item._id}>
                                            <View style={styles.resultWrapper} key={item._id}>

                                                <View >
                                                    <Image
                                                        style={styles.ItemImage}
                                                        source={{ uri: `${baseURL}/img/${item.img}` }}
                                                    />
                                                </View>
                                                <Text style={styles.ItemName}>
                                                    {item.itemName}
                                                </Text>
                                                <Text style={styles.ItemDiscription}>
                                                    Retro Reble
                                                </Text>
                                                <View style={styles.ItemPriceWrapper}>

                                                    <Text style={styles.ItemPrice}>
                                                        ₹ {item.price} +
                                                    </Text>
                                                    <Text style={styles.ItemDiscount}>
                                                        35 % OFF
                                                    </Text>
                                                </View>
                                                <View style={styles.ItemBottom}>
                                                    <View style={styles.viewDetailWrapper}>

                                                        <Text style={styles.viewDetail}>
                                                            View Details
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Icon name={isSaved(item._id) ? "heart" : "cards-heart-outline"} size={30} color={isSaved(item._id) ? "red" : "black"}
                                                            onPress={
                                                                () => { Save(item) }
                                                            } />
                                                    </View>
                                                </View>
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
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
