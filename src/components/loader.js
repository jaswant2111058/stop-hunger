import { ActivityIndicator , View} from "react-native"
export default function Loader() {


    return (
        <View style={{position: "absolute",left:0,right:0,zIndex: 2,alignItems: "center"}}>
            <ActivityIndicator size="large" color="#FBBD10" />
        </View>
    )

}

