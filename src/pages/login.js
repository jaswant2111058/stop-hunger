import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useData } from '../hooks/hooks';
import signIn from '../components/Oauth';

export default function Login({ navigation }) {

    const { isLoading, startLoading, stopLoading, user, setUser, baseURL } = useData();

    useEffect(() => {
        if (user?.user_id) {
            navigation.navigate("Home");
        }
    }, [user]);

    const handleSignIn = async () => {
        try {
            startLoading();
            const userInfo = await signIn(baseURL);
            setUser(userInfo);
            navigation.navigate("Home");
        }
        catch (err) {
            console.log(err)
        }
        finally {
            stopLoading();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.images}>
                <Image
                    style={styles.image1}
                    source={require('../../assets/images/login1.png')}
                />
                <View>
                    <Image
                        style={styles.image2}
                        source={require('../../assets/images/login2.png')}
                    />
                    <Image
                        style={styles.image3}
                        source={require('../../assets/images/login3.png')}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.welcome}>
                    WELCOME TO FOOD BREAK !
                </Text>
            </View>
            <TouchableOpacity onPress={handleSignIn}>
                <View style={styles.googleLogin}>
                    <Image
                        style={styles.googleImage}
                        source={require('../../assets/images/google.png')}
                    />
                    <Text style={styles.continueText}>Continue with Google</Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
                onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                    <ActivityIndicator size="large" color="#FBBD10" />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    images: {
        marginLeft:"auto",
        marginRight:"auto",
        width: '80%',
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"center",
        gap: 10,
        height: 460,
        marginTop: 30,
    },
    image1: {
        width: 150,
        height: 420,
        marginTop: 'auto',
        marginBottom: 'auto',
        borderRadius: 20,
    },
    image2: {
        width: 145,
        height: 210,
        borderRadius: 20,
    },
    image3: {
        width: 145,
        height: 200,
        borderRadius: 20,
        marginTop: 10
    },
    welcome: {
        textAlign: 'center',
        fontSize: 20,
        color: "black"
    },
    googleLogin: {
        marginTop: 50,
        backgroundColor: '#FBBD10',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 50,
        width: 260,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
        borderRadius: 50,
    },
    googleImage: {
        height: 20,
        width: 20,
    },
    continueText: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 18,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
