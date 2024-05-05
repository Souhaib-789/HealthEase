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
import HOSPITAL from '../../assets/images/hospital.jpg'
import NO_DOC from '../../assets/images/noDoc.png'

const HospitalHome = () => {
    const navigation = useNavigation();


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

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.Appointment_card} onPress={() => navigation.navigate('PatientDetails')} >
                        <Image source={docF} style={styles.Appointment_image} />
                        <View>
                            <TextComponent style={[styles.appointment_card_text, { fontFamily: Fonts?.SEMIBOLD }]} text={'Mr. Fernendes'} />
                            <TextComponent style={styles.appointment_card_span} text={'Cardiologist'} />
                        </View>
                    <Icon type={IconTypes.MaterialIcons} name={'keyboard-arrow-right'} size={25} color={Colors.PRIMARY} />
            </TouchableOpacity>
        )
    }

    const info = [
        {
            id: 1,
            name: 'Doctors',
            info: '50',
            icon: 'stethoscope'

        },
        {
            id: 2,
            name: 'Appointments',
            info: '200',
            icon: 'clipboard'
        },
        {
            id: 4,
            name: 'Departments',
            info: '10',
            icon: 'building-o'
        }
    ]

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.home_header}>
                    <Icon name='hospital-o' type={IconTypes.FontAwesome} size={20} color={Colors.BLACK} />
                    <TextComponent style={styles.sub_heading} text={'The City Hospital'} />
                </View>

                <Image source={HOSPITAL} resizeMode={'cover'} style={{width: '100%', marginTop: 20 , alignSelf: 'center', height: 130 , borderRadius: 10}} />


                <View style={styles.wrap_row}>
                    {
                        info.map((item, index) => {
                            return (
                                <View style={[styles.card , { backgroundColor: index == 1 ? Colors.PRIMARY : Colors.WHITE}]} key={index}>
                                    <View style={styles.wide_row}>
                                        <View style={styles.card_icon}>
                                            <Icon name={item.icon} type={IconTypes.FontAwesome} size={18} color={index == 1 ? Colors.WHITE : Colors.PRIMARY} />
                                        </View>
                                        <TextComponent style={[styles.card_headingx , { color: index == 1 ? Colors.WHITE : Colors.PRIMARY}]} text={item.info} />
                                    </View>
                                    <TextComponent style={[styles.card_heading , { color: index == 1 ? Colors.WHITE : Colors.BLACK}]} text={item.name} />
                                </View>
                            )
                        }
                        )
                    }
                </View>

                <TextComponent style={styles.heading} text={'Your Top Doctors'} />
                <FlatList
                    key={'Featured Doctors'}
                    showsHorizontalScrollIndicator={false}
                    data={Featured}
                    horizontal
                    decelerationRate={'fast'}
                    renderItem={renderItem}
                    ListEmptyComponent={<ListEmptyComponent image={NO_DOC} text={'no doctors found'} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        </View>
    )
}

export default HospitalHome;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
        padding: 20
    },
    wide_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },
    row: {
        flexDirection: "row",
        gap: 10
    },
    wrap_row: {flexDirection: "row" , flexWrap: 'wrap' , marginVertical: 15 , justifyContent: 'space-between' , alignItems: 'center' },
    card: { gap: 5, width: '45%', backgroundColor: Colors.WHITE, elevation: 5, borderRadius: 10, padding: 13, marginVertical: 10, marginHorizontal: 5 },
    card_icon: { width: 30, backgroundColor: Colors.LIGHT, height: 30, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
    card_heading: {
        fontSize: 13,
        fontFamily: Fonts?.SEMIBOLD
    },
    card_headingx: {
        fontSize: 20,
        fontFamily: Fonts?.SEMIBOLD,
        color: Colors.PRIMARY
    },
    heading: {
        fontSize: 15,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD
    },
    appointment_card_text: {
        fontSize: 14,
        color: Colors.BLACK,
        marginVertical: 2,
    },
    appointment_card_span: {
        fontSize: 12,
        color: Colors.BLACK,
        fontFamily: Fonts?.REGULAR
    },
    sub_heading: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD
    },
    home_header: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        alignSelf: "center"
    },
    Appointment_card: {
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical: 13,
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
        marginVertical: 10,
        marginHorizontal: 8
    },
    Appointment_image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
})