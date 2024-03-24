import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const Healthbot = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.heading_container}>
                    <TextComponent style={styles.heading} text={"Hello ! I'm "} />
                    <TextComponent style={styles.headingx} text={"Healthbot"} />
                </View>


                <TextComponent style={styles.headingy} text={"Do you want any health advice ?"} />
                <Button onPress={()=> navigation.navigate('HealthbotChat')} title={"Ask"} style={styles.button}  />
            </ScrollView>

        </View>
    )
}

export default Healthbot;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 20,
    },
    headingx: {
        fontSize: 20,
        color: Colors.PRIMARY,
        fontFamily: Fonts?.SEMIBOLD
    },
    headingy: {
        fontSize: 18,
        width: '70%',
        alignSelf: "center",
        textAlign: "center",
        marginTop: 400,
    },
    heading_container: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 70,
    },
    button: {
        marginTop: 20,
        alignSelf: "center",
        width: '40%',
        borderRadius: 60,
    }
})