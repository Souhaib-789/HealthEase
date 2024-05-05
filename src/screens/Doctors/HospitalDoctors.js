import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import docC from "../../assets/images/doc3.png";
import docF from "../../assets/images/doc9.jpg";
import docD from "../../assets/images/doc4.png";
import docE from "../../assets/images/doc5.png";
import { Colors } from "../../utilities/Colors";
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Fonts } from "../../utilities/Fonts";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import NO_DOC from '../../assets/images/noDoc.png'
import CustomCategoryIcon from "../../components/CustomCategoryIcon";

const HospitalDoctors = () => {
    const navigation = useNavigation();
    const [currCategory, setcurrCategory] = useState({ id: 1 });


    const Featured = [
        {
            id: 1,
            image: docC,
            name: 'Dr. Crick',
            fees: '2500',
            rating: 5,
            hearted: false,
            category: 'Medicine Specialist',
            hospital_name: 'City Hospital',
            experience: 5,
        },
        {
            id: 2,
            image: docD,
            name: 'Dr. Strain',
            fees: '2200',
            rating: 3,
            hearted: true,
            category: 'Dentist ',
            hospital_name: 'City Hospital',
            experience: 3,
        },
        {
            id: 3,
            image: docE,
            name: 'Dr. Lachinet',
            fees: '2900',
            rating: 2,
            hearted: false,
            category: 'Physio Therapy Specialist',
            hospital_name: 'City Hospital',
            experience: 5,
        }
    ]

    const Categories = [
        {
            id: 1,
            name: 'All',
        },
        {
            id: 2,
            name: 'Dentist'
        },
        {
            id: 3,
            name: 'Cardiologist'
        },
        {
            id: 4,
            name: 'Physio Therapist'
        },
        {
            id: 5,
            name: 'Neurologist'
        },
        {
            id: 6,
            name: 'Dermatologist'
        },
        {
            id: 7,
            name: 'Gastroenterologist'
        },
    ]

    const renderCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.category_box, { backgroundColor: item?.id == currCategory?.id ? Colors.BLACK : Colors?.WHITE }]}
                onPress={() => setcurrCategory(item)}>
                <CustomCategoryIcon category={item?.name.toLowerCase()} size={15} color={item?.id == currCategory?.id ? Colors?.WHITE : Colors.PRIMARY} />
                <TextComponent style={[styles.category_text, { color: item?.id == currCategory?.id ? Colors?.WHITE : Colors.PRIMARY }]} text={item?.name} />
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.Appointment_card} onPress={() => navigation.navigate('HospitalDoctorDetails')} >
                <View style={styles.appointment_card_subview1}>
                    <View style={styles.appointment_card_subview2}>
                        <Image source={docF} style={styles.Appointment_image} />
                        <View>
                            <TextComponent style={[styles.appointment_card_text, { fontFamily: Fonts?.SEMIBOLD }]} text={'Mr. Fernendes'} />
                            <TextComponent style={styles.appointment_card_span} text={item?.category} />
                        </View>
                    </View>
                    <Icon type={IconTypes.MaterialIcons} name={'keyboard-arrow-right'} size={25} color={Colors.PRIMARY} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
                <View style={styles.sub_container}>
                    <TextComponent style={styles.sub_container_heading} text={"Your Doctors"} />

                    <FlatList
                        key={"CategoriesList"}
                        showsHorizontalScrollIndicator={false}
                        data={Categories}
                        horizontal
                        renderItem={renderCategoryItem}
                        keyExtractor={item => item?.id}
                        style={{ width: '100%', marginTop: 10, alignSelf: 'center' }}
                    />
                </View>

                <FlatList
                    key={'Featured Doctors'}
                    showsHorizontalScrollIndicator={false}
                    data={Featured}
                    decelerationRate={'fast'}
                    renderItem={renderItem}
                    ListEmptyComponent={<ListEmptyComponent image={NO_DOC} text={'no doctors found'} />}
                    keyExtractor={(item, index) => index.toString()}
                />

             

            <TouchableOpacity style={{position: "absolute" , bottom: 15 , right: 20 , backgroundColor: Colors.PRIMARY, padding: 10, borderRadius: 40, elevation: 5 }}>
                    <Icon type={IconTypes.Ionicons} name={'add'} size={20} color={Colors.WHITE} />
                </TouchableOpacity>
        </View>
    )
}

export default HospitalDoctors;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
    },
    mV: {
        marginVertical: 10
    },
    scrollView: {
        marginBottom: 10
    },
    wide_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },
    search_input: {
        marginTop: 10,
        elevation: 2,
        borderRadius: 25,
        backgroundColor: Colors.WHITE,
        width: '100%',
        alignSelf: 'center',
        borderWidth: 0,
    },
    sub_container: {
        width: '100%',
        gap: 10,
        paddingTop: 10,
        padding: 15,
        alignSelf: "center",
        backgroundColor: Colors.PRIMARY,
        marginBottom: 20,
    },
    sub_container_heading: {
        fontSize: 16,
        color: Colors.WHITE,
        width: '70%',
        lineHeight: 28,
        marginVertical: 8
    },
    heading: {
        fontSize: 14,
        color: Colors.WHITE,
        fontFamily: Fonts?.SEMIBOLD
    },
    headingx: {
        fontSize: 15,
        fontFamily: Fonts?.SEMIBOLD,
        color: Colors.BLACK
    },
    appointment_card_text: {
        fontSize: 14,
        color: Colors.BLACK,
        marginTop: 2,
    },
    appointment_card_span: {
        fontSize: 11,
        color: Colors.DGREY,
    },
    text: {
        fontSize: 16,
        color: Colors.BLACK,
        marginVertical: 2,
        fontWeight: "bold"
    },
    textx: {
        fontSize: 12,
    },
    sub_heading: {
        fontSize: 11,
        color: Colors.LGREY,
        fontFamily: Fonts?.REGULAR
    },
    upper_view: {
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: Colors.PRIMARY,
        paddingBottom: 40,
        padding: 15
    },
    profile_image: {
        borderRadius: 50,
        width: 45,
        height: 45,
    },
    home_header: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    category_box: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        backgroundColor: Colors.BG_BLUE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    category_image: {
        width: 25,
        height: 25,
        resizeMode: "contain"
    },
    flex: {
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    Appointment_card: {
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        elevation: 5,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '90%',
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingVertical: 13,
        alignItems: "center",
        marginVertical: 10
    },
    appointment_card_subview2: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    appointment_card_subview3:
    {
        marginTop: 10,

        paddingVertical: 10,
        width: '100%',
        backgroundColor: Colors.LIGHT,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    appointment_card_subview4:
    {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    appointment_card_subview1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%'
    },
    Appointment_image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    featured_card: {
        borderRadius: 10,
        width: 120,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: Colors.WHITE,
        elevation: 2,
        marginHorizontal: 10,
        marginVertical: 4,
        alignItems: "center"
    },
    featured_image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginVertical: 5
    },
    flexA: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    bell_icon: {
        backgroundColor: Colors?.WHITE,
        elevation: 5,
        borderRadius: 50,
        padding: 5,
        margin: 2
    },
    category_text: {
        color: Colors.PRIMARY,
        fontSize: 12
    },

    category_box: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 8,
        gap: 6
    },
})