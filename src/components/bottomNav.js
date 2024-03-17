import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useData } from '../hooks/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';


export default function BottomNav({ navigation }) {

    const { nav, setNav } = useData()

    return (
        <>
            <View style={styles.NavWrapper}>
                <View style={styles.NavMain}>
                    <View style={styles.navBtnInner}>
                        <TouchableOpacity onPress={() => { setNav(0); navigation.navigate("Home") }}>
                            <Icon2 name='home' size={30} color={nav == 0 ? "#FBBD10" : "#8899A8"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navBtnInner}>
                        <TouchableOpacity onPress={() => { setNav(1); navigation.navigate("Saved") }}>
                            <Icon name='cards-heart-outline' size={30} color={nav == 1 ? "#FBBD10" : "#8899A8"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navBtnInner}>
                        <TouchableOpacity onPress={() => { setNav(2); navigation.navigate("OrderList") }}>
                            <Icon name='bookmark-outline' size={30} color={nav == 2 ? "#FBBD10" : "#8899A8"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navBtnInner}>
                        <TouchableOpacity onPress={() => { setNav(3); navigation.navigate("ForTest") }}>
                            <Icon name='bell-outline' size={30} color={nav == 3 ? "#FBBD10" : "#8899A8"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    NavWrapper: {

        position: "absolute",
        width: "100%",
        bottom: 0,

    },
    NavMain: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#FFFFFF',
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 25,
        marginBottom: 5,
        elevation: 10
    },
    buttonName: {
        fontSize: 11,
        color: "black",
        fontWeight: "700",
    },

    navBtnInner: {
        marginLeft: "auto",
        marginRight: "auto",

    },

});