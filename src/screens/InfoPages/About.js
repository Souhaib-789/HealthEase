import React from "react";
import {  View, StyleSheet, ScrollView} from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";

const About = ( ) => {
    return(
        <View style={styles.Container}>
           <Header  title={'About Us'} back profile />
           <ScrollView style={styles.scrollview}>
            <TextComponent style={styles.heading} text={'Healthease App'} />
            <TextComponent style={styles.text} text={'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words believable. It is a long established fact that reader will distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a moreIt is a long established fact that reader will distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more'} />
           </ScrollView>
        </View>
    )
}

export default About;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading:{
        marginTop: 10,
        fontSize: 16,
        fontFamily: Fonts.SEMIBOLD
    },
    scrollview:{
        width: '90%',
        alignSelf: "center"
    },
    text:{
        lineHeight: 25,
        marginVertical: 5
    }

})