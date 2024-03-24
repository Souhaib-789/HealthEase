import React from "react";
import { Text , View, StyleSheet} from "react-native";
import { Colors } from "./utilities/Colors";

const Main = ( ) => {
    return(
        <View style={styles.Container}>
            <Text style={styles.heading}>Main</Text>
        </View>
    )
}

export default Main;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        justifyContent: "center"
    },
    heading:{
        fontSize: 20,
        fontWeight: "bold"
    }
})