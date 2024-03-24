import React from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Modal as RNModal } from "react-native";
import { Colors } from "../../utilities/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import noRecordImage from '../../assets/images/test.png'
import { useNavigation } from "@react-navigation/native";

const MyTests = () => {
    
    const navigation = useNavigation()
    const Tests = [
        {
            id: 1,
            date: '24',
            doc_name: 'Abdullah Maman',
            type: 'Blood Test',
            test_type: 'Take sample from home',
            address: 'H#4 breezy street , UAE',
        },
        {
            id: 2,
            date: '01',
            doc_name: 'Sarah Gill',
            type: 'Sugar Test',
            test_type: 'I will come for the test',
        },
        {
            id: 3,
            date: '22',
            doc_name: 'Will Harry',
            type: 'ECG',
            test_type: 'I will come for the test',
        },
    ]

    const renderDocsItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.doc_card} onPress={()=> navigation.navigate('MyTestsDetails', {item: item})}>
                <View style={styles.date_box}>
                    <Text style={styles.text}>{item?.date}</Text>
                    <Text style={styles.text}>FEB</Text>
                </View>

                <View style={styles.sub_doc_card}>
                    <Text style={styles.text_x}>Test booked by you</Text>
                    <Text style={styles.text_y}>for {item?.doc_name}</Text>
                    <Text style={styles.text_z}>{item?.type}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={styles.list_empty_view}>
                <Image source={noRecordImage} style={styles.no_record_image} />
                <Text style={styles.heading}>You haven’t booked any tests yet</Text>
                <Text style={styles.bio}>Get started with your first health checkup</Text>
            </View>
        )
    }

    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView>
                <Header title={'My Tests'} />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Tests}
                    renderItem={renderDocsItem}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={ListEmptyComponent}
                />

                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('BookTest') }>
                    <Text style={styles.button_text}>Book Now</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

export default MyTests;

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
    button: {
        borderRadius: 5,
        width: '80%',
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginTop: 40,
        marginVertical: 10
    },
    list_empty_view: {
        alignItems: "center",
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
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
    modal_container: {

        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    modal_sub_container: {
        alignSelf: "center",
        paddingVertical: 23,
        paddingHorizontal: 15,
        backgroundColor: Colors.WHITE,
        marginTop: '70%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',

    },
    input: {
        borderBottomColor: Colors.DGREY,
        borderBottomWidth: 1,
        fontSize: 15,
        color: Colors.PRIMARY,
        fontWeight: "bold"
    },
    main_input_container: {
        elevation: 0,
        marginVertical: 0,
        paddingVertical: 0,
    },
    types_options: {
        alignItems: "center",
        margin: 15
    },
    cross_icon: {
        position: "absolute",
        right: 10,
        top: 15
    }
})