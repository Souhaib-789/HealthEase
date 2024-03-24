import React from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Modal as RNModal } from "react-native";
import { Colors } from "../../utilities/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import noRecordImage from '../../assets/images/ereports.png'

const EReports = () => {
    
    const Reports = [
        // {
        //     id: 1,
        //     date: '24',
        //     doc_name: 'Bloodtest.pdf',
        // },
        // {
        //     id: 2,
        //     date: '01',
        //     doc_name: 'ECG.pdf',
        // },
        // {
        //     id: 3,
        //     date: '22',
        //     doc_name: 'Bloodtest.docx',
        // },
    ]

    const renderDocsItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.doc_card} >
                <View style={styles.date_box}>
                    <Text style={styles.text}>{item?.date}</Text>
                    <Text style={styles.text}>FEB</Text>
                </View>

                <View style={styles.sub_doc_card}>
                    <Text style={styles.text_x}>{item?.doc_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={styles.list_empty_view}>
                <Image source={noRecordImage} style={styles.no_record_image} />
                <Text style={styles.heading}>No e-reports found</Text>
                <Text style={styles.bio}>Once your dignosis will complete the lab-admin will upload the e-reports of your tests here.</Text>
            </View>
        )
    }

    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView>
                <Header title={'E Reports'} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Reports}
                    renderItem={renderDocsItem}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={ListEmptyComponent}
                />
            </ScrollView>
        </View>
    )
}

export default EReports;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        color: Colors.BLACK
    },
    no_record_image: {
        width: 160,
        height: 160,
        resizeMode: "contain",
        marginTop: 80,
        marginBottom: 25
    },
    bio: {
        textAlign: "center",
        marginHorizontal: 20,
        lineHeight: 20
    },
    list_empty_view: {
        alignItems: "center",
    },
    doc_card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        elevation: 3,
        padding: 10,
        paddingVertical: 15,
        alignItems: "center",
        marginVertical: 10,
        flexDirection: "row",
        width: '90%',
        alignSelf: "center"
    },
    date_box: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 12,
        alignItems: "center"
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
        fontSize: 15,
        color: Colors.BLACK,
        fontWeight: 500
    },
    text_y: {
        fontSize: 13,
        color: Colors.PRIMARY,
    },
    text_z: {
        fontSize: 13,
    },
    sub_doc_card: {
        marginLeft: 18
    },
})