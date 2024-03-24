import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { Colors } from "../../utilities/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import testimage from '../../assets/images/testimage.png'

const MyTestsDetails = (props) => {

    const routeData = props?.route?.params?.item;
    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView>
                <Header title={'Test Details'} />

                <View style={styles.doc_card}>

                    <Image source={testimage} style={styles.image} />
                    <View style={styles.date_box}>
                        <Text style={styles.text}>{routeData?.date} FEB</Text>
                    </View>

                    <View style={styles.sub_doc_card}>
                        <Text style={styles.text_x}>Test booked by you</Text>
                        <Text style={styles.text_y}>for {routeData?.doc_name}</Text>

                        <View style={styles.text_view}>
                            <Text style={styles.text_z}>Test -</Text>
                            <Text style={styles.text_z}>{routeData?.type}</Text>
                        </View>

                        <View style={styles.text_view}>
                            <Text style={styles.text_z}>Test Type -</Text>
                            <Text style={styles.text_z}> {routeData?.test_type}</Text>
                        </View>

                        <View style={styles.text_view}>
                            <Text style={styles.text_z}>Status -</Text>
                            <Text style={styles.text_z}>Pending</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default MyTestsDetails;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    image: {
        width: 130,
        height: 130,
        resizeMode: "contain",
        alignSelf: "center",
        marginVertical: 15
    },
    bio: {
        textAlign: "center",
        marginHorizontal: 20,
        lineHeight: 20
    },
    text_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5
    },
    doc_card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        elevation: 3,
        padding: 10,
        paddingVertical: 15,
        marginVertical: 10,
        width: '90%',
        alignSelf: "center"
    },
    date_box: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        padding: 10,
        width: '40%',
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    text: {
        color: Colors.WHITE,
        fontSize: 16
    },
    text_w: {
        fontSize: 17,
        color: Colors.BLACK,
        fontWeight: 500,
        marginTop: 15
    },
    text_x: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.BLACK,
        fontWeight: 500
    },
    text_y: {
        fontSize: 13,
        color: Colors.PRIMARY,
        marginBottom: 10
    },
    text_z: {
        fontSize: 13,
        color: Colors.BLACK
    },
    sub_doc_card: {
        marginVertical: 15
    },
})