import React from "react";
import { Text , View, StyleSheet} from "react-native";
import { Colors } from "../../Config/Colors";

const Settings = ( ) => {
    return(
        <View style={styles.Container}>
            <Text style={styles.heading}>Settings</Text>
        </View>
    )
}

export default Settings;

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