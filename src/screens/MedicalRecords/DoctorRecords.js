import React from "react";
import { Text , View, StyleSheet} from "react-native";
import { Colors } from "../../utilities/Colors";

const DoctorRecords = ( ) => {
    return(
        <View style={styles.Container}>
            <Text style={styles.heading}>DoctorRecords</Text>
        </View>
    )
}

export default DoctorRecords;

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