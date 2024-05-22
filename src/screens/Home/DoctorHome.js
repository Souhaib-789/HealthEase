import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import docC from "../../assets/images/doc3.png";
import docF from "../../assets/images/doc9.jpg";
import docD from "../../assets/images/doc4.png";
import docE from "../../assets/images/doc5.png";
import { Colors } from "../../utilities/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Fonts } from "../../utilities/Fonts";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import PROFILE from '../../assets/images/profile.png'
import NO_DOC from '../../assets/images/noDoc.png'

const DoctorHome = () => {
    const navigation = useNavigation();
    const [search, setsearch] = useState();
    const [state, setState] = useState();


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
                <View style={styles.appointment_card_subview1}>
                    <View style={styles.appointment_card_subview2}>
                        <Image source={docF} style={styles.Appointment_image} />
                        <View>
                            <TextComponent style={[styles.appointment_card_text, { fontFamily: Fonts?.SEMIBOLD }]} text={'Mr. Fernendes'} />
                            <TextComponent style={styles.appointment_card_span} text={'for Himself'} />
                        </View>
                    </View>
                    <Icon type={IconTypes.MaterialIcons} name={'keyboard-arrow-right'} size={25} color={Colors.PRIMARY} />
                </View>

                <View style={styles.appointment_card_subview3}>
                    <View style={styles.appointment_card_subview4}>
                        <Icon type={IconTypes.Feather} name={'calendar'} size={15} color={Colors.PRIMARY} />
                        <TextComponent style={styles.appointment_card_span} text={'23 Oct 2023'} />
                    </View>
                    <View style={styles.appointment_card_subview4}>
                        <Ionicons name='time-outline' color={Colors.PRIMARY} size={15} />
                        <TextComponent style={styles.appointment_card_span} text={'12:00 AM'} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.sub_container}>
                    <View style={styles.wide_row}>
                        <View style={styles.home_header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon type={IconTypes.Feather} name='menu' size={23} color={Colors.WHITE} />
                    </TouchableOpacity>
                        <View>
                            <TextComponent style={styles.sub_heading} text={'Hey Doctor !'} />
                            <TextComponent style={styles.heading} text={'Sam Will'} />
                        </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                            <Image source={PROFILE} style={{ width: 35, height: 35 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.wide_row}>
                        <TextComponent style={styles.sub_container_heading} text={"Lets explore patient's Appointments!"} />

                        {/* <TouchableOpacity style={{ backgroundColor: Colors.WHITE, padding: 10, borderRadius: 40, elevation: 5 }}>
                            <Icon type={IconTypes.Ionicons} name={'filter-outline'} size={20} color={Colors.PRIMARY} />
                        </TouchableOpacity> */}
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <CalendarStrip
                            selectedDate={state?.selectedDate}
                            onPressDate={(date) => {
                                setState({ selectedDate: date });
                            }}
                            onPressGoToday={(today) => {
                                setState({ selectedDate: today });
                            }}
                            onSwipeDown={() => {
                                alert('onSwipeDown');
                            }}
                            markedDate={['2024-04-26', '2024-04-27', '2024-04-28', '2024-04-29']}
                            weekStartsOn={1}
                        />
                    </View>
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
            </ScrollView>
        </View>
    )
}

export default DoctorHome;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
    },
    wide_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
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
        fontSize: 20,
        color: Colors.WHITE,
        width: '70%',
        lineHeight: 28,
        marginVertical: 8
    },
    heading: {
        fontSize: 16,
        color: Colors.LGREY,
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
        fontSize: 11,
        color: Colors.LGREY,
        fontFamily: Fonts?.REGULAR
    },
    home_header: {
        alignItems: "center",
        flexDirection: "row",
        gap: 15
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
})