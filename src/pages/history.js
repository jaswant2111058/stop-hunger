import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useData } from '../hooks/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Star from 'react-native-vector-icons/AntDesign';
import Search from '../components/search';

export default function History({ navigation }) {

    const { user, baseURL,selectedItem } = useData()
    const [totalAmmount, setTotalAmmount] = useState(0)
    const [quanitity, setQuanitity] = useState(0)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        setTotalAmmount(selectedItem?.price * quanitity)
    }, [quanitity])
    // user?.user_name?console.log("yes"):navigation.navigate('Login')
    return (
        <>
            <View style={styles.homeWrapper}>
                <View style={styles.homeMain}>
                    <View style={styles.header}>
                        <Text>
                            <Icon name="menu" size={30} />
                        </Text>
                        <Text>
                            <Icon1 name="user" size={30} />
                        </Text>
                    </View>
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
                            source={{uri:`${baseURL}/${selectedItem?.img}` }}
                        />
                        <Text
                            style={styles.foodName} >
                            {selectedItem?.itemName}
                        </Text>
                        <Text style={styles.foodPrice}>
                            ₹{selectedItem?.price}
                        </Text>
                        <View style={styles.btnInput}>
                            <Pressable >
                                <Text style={styles.minusBtn} onPress={() => setQuanitity(String(parseInt(Math.max((quanitity - 1), 0))))}>
                                    -
                                </Text>
                            </Pressable>
                            <TextInput style={styles.qunInput}
                                keyboardType='numeric'
                                placeholder='0'
                                value={quanitity}
                                onChangeText={(value) => { setQuanitity(value) }}
                            />
                            <Pressable onPress={() => setQuanitity(String(parseInt(Math.min(parseInt(quanitity) + 1, 50))))}>
                                <Text style={styles.plusBtn}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View >
                        <View>
                        <TextInput style={styles.input}
                        value={name}
                        onChangeText={(value)=>{setName(value)}}
                        placeholder='Full Name'
                        />
                        </View>
                        <View>
                        <TextInput style={styles.input}
                        value={address}
                        onChangeText={(value)=>{setAddress(value)}}
                        placeholder='Full Address'
                        />
                        </View>
                    </View>

                    <View style={styles.payment}>
                        <Text style={styles.TotalAmmount}>
                            Total Ammount : ₹{totalAmmount}
                        </Text>
                        <Pressable >
                            <Text style={styles.payBtn}>
                                Pay
                            </Text>
                        </Pressable>
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
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
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
    },
    delicious: {
        color: '#FBBD10',
        textAlign: 'center',
        fontSize: 20,
    },
    foodPrice: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    foodImage: {
        width: 35,
        height: 35,
        borderRadius: 2,
    },
    foodName: {
        marginTop: 'auto',
        marginBottom: 'auto',
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
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5,
    },
    payment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
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
    },
    input:{
        marginTop:20,
        borderWidth:1,
        width:300,
        height:40,
        fontSize:20,
        textAlign:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:20,
        borderColor:'#FBBD10'
    }
});
