import React from "react";
import { Text , View, StyleSheet, ScrollView} from "react-native";
import { Colors } from "../../Config/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";

const PrivacyPolicy = ( ) => {
    return(
        <View style={styles.Container}>
           <BgImage />
           <Header  title={'Privacy Policy'} />
           <ScrollView style={styles.scrollview}>
            <Text style={styles.heading}>Ease Health App Privacy Policy</Text>
            <Text style={styles.text}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words believable. It is a long established fact that reader will distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a moreIt is a long established fact that reader will distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more </Text>
           </ScrollView>
        </View>
    )
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading:{
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold"
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