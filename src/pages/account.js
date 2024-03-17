import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Switch, TextInput } from 'react-native';
import { useData } from '../hooks/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Header from '../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function Account({ navigation }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const { user } = useData()

    return (
        <>
            <View style={styles.accountWrapper}>
                <View style={styles.accountMain}>
                    <Header navigation={navigation} />
                    <TouchableOpacity style={styles.navBack} onPress={() => { navigation.navigate('Home') }}>
                        <Icon2 name="angle-left" color="black" size={30} />
                        <Text style={styles.navBackText}>
                            Account
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.logoWrapper}>
                        <View style={styles.logo}>
                            <Image
                                style={{ width:133,height:133, borderRadius:100}}
                                source={{uri:user.photo}}
                            />
                        </View>
                        <Text style={styles.profileName}>
                            {user.username}
                        </Text>
                    </View>
                    <View style={styles.btnsWrapper}>
                        <TouchableOpacity style={styles.btns} onPress={() => {  }}>
                            <Icon name="account-outline" color="#FFFFFF" size={30} />
                            <Text style={styles.btnsText}>
                                Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={() => {  }}>
                            <Icon3 name="settings-outline" color="#FFFFFF" size={30} />
                            <Text style={styles.btnsText}>
                                Preferences
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={() => { }}>
                            <Icon2 name="dollar" color="#FFFFFF" size={25} style={{ marginLeft: 8 }} />
                            <Text style={[styles.btnsText, { marginLeft: 7 }]}>
                                Payment Setting
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnsNotifications}>
                            <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                                <Icon name="bell-outline" color="#FFFFFF" size={30} />
                                <Text style={styles.btnsText}>
                                    Notifications
                                </Text>
                            </View>
                            <View>
                                <Switch
                                    trackColor={{ false: '#CDCDCD', true: 'skyblue' }}
                                    thumbColor={isEnabled ? '#D9D9D9' : '#D9D9D9'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => { setIsEnabled(previousState => !previousState); }}
                                    value={isEnabled}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={async () => {
                            await GoogleSignin.signOut();
                            await AsyncStorage.removeItem('user');
                            navigation.navigate("Login")
                        }}>
                            <Icon name="power" color="#FFFFFF" size={30} />
                            <Text style={styles.btnsText}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

    accountMain: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
    },
    navBack: {
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    navBackText: {

        color: "black",
        fontSize: 22,
        fontFamily: "Helvetica",

    },
    profileName: {

        textAlign: "center",
        color: "black",
        fontSize: 20,
        fontWeight: "700"

    },
    logo: {

        marginTop: 50,
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto",
        width: 140,
        height: 140,
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
    logoText: {

        color: "#0D1525",
        fontFamily: "Helvetica",
        fontSize: 20,
        fontWeight: "700",
        fontFamily: "Helvetica",

    },
    btnsWrapper: {
        padding: 10,
        marginTop: 40,

    },
    btns: {
        width: "100%",
        height: 40,
        backgroundColor: "#FBBD10",
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 15,
        alignItems: "center",
        marginBottom: 15,
        elevation:15
    },
    btnsNotifications: {
        width: "100%",
        backgroundColor: "#FBBD10",
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 15,
        height: 40,
        alignItems: "center",
        marginBottom: 15,
        justifyContent: "space-between",
        elevation:15
    },
    btnsText: {
        color: "#FFFFFF",
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "700",
    },
    suggestion: {
        width: "100%",
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1B2333",
        borderRadius: 50,
        height: 45,
        marginTop: 10
    },
    suggestionText: {
        fontSize: 14,
        color: "#FFFFFF",
        fontFamily: "Helvetica",
    }, keyboardView: {
        marginBottom: 70,
        paddingHorizontal: 10,

    },
    keyboardView2: {
        marginBottom: 0,
    },
    input: {

        height: 50,
        backgroundColor: "#1B2333",
        paddingHorizontal: 15,
        fontSize: 14,
        borderRadius: 15,
        color: "#FFFFFF",
        marginTop: 10,
        fontFamily: "Helvetica",
    },
    input2: {

        minHeight: 50,
        maxHeight: 100,
        backgroundColor: "#1B2333",
        paddingHorizontal: 15,
        fontSize: 14,
        color: "#FFFFFF",
        marginTop: 10,
        fontFamily: "Helvetica",

    },
    navwrapper: {

        paddingHorizontal: 10,
        marginLeft: 10,

        width: "100%"


    },
    personaliseBar: {

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#1B2333",
        height: 40,

    },
    personaliseBarInner: {
        flexDirection: "row",
        gap: 10,

    },
    newaccount: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingLeft: 10,
    },
    newaccountText: {
        color: "#6CD97E",
        fontSize: 20,
        fontFamily: "Helvetica",
    },
    account: {
        marginTop: "130%",
        paddingHorizontal: 20,
    },
    accountRight: {
        width: "80%",
        marginLeft: "auto",

    },
    accountRightText: {
        color: "#FFFFFF",
        backgroundColor: "#1B2333",
        maxHeight: "100%",
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        fontFamily: "Helvetica",
    },
    accountRightTime: {
        color: "#667280",
        fontFamily: "Helvetica",
        textAlign: "center",
        fontSize: 11,
    }

});