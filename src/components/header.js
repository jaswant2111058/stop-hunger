import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useData } from '../hooks/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Header({ navigation }) {

    const { user } = useData()

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.TextHeader}>
                    <Icon name="menu" size={30} color="black" />
                </Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Account')
                }}>
                    <View style={styles.dpWrapper}>
                        <Image
                            style={styles.dpImage}
                            source={{ uri: user?.photo }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    dpImage: {
        width: 32,
        height: 32,
        borderRadius: 50
    },
    dpWrapper: {
        padding: 5,
        width: 35,
        height: 35,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E7E7FF",
        borderRadius: 100
    },
    TextHeader: {
        fontSize: 20,
        fontWeight: "700",
        width: 35,
        height: 35,
        backgroundColor: "#DFE4EC",
        textAlign: "center",
        borderRadius: 20
    }

});