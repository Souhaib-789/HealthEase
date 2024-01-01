import React from "react";
import { Text , View, StyleSheet} from "react-native";
import { Colors } from "../../Config/Colors";
import TextComponent from "../../components/TextComponent";

const Healthbot = ( ) => {
    return(
        <View style={styles.Container}>
            <TextComponent style={styles.heading} text={'Healthbot'} />
        </View>
    )
}

export default Healthbot;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        justifyContent: "center"
    },
    heading:{
        fontSize: 30,
    }
})