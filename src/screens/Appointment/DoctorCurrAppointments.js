import React, { useEffect, useState } from "react";
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
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";
import { useDispatch, useSelector } from "react-redux";

const DoctorCurrAppointments = (props) => {
    const navigation = useNavigation();
    const [search, setsearch] = useState();
    const [state, setState] = useState();
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const APPOINTMENTS = useSelector(state => state.AppointmentsReducer?.doctorAppointmentList)

        console.log('-----------------', JSON.stringify(APPOINTMENTS, null, 8));

    useEffect(() => {
        const data = { doctorId: props?.docID }
        fetchAppointmentsData(data)
    }, [])

    const fetchAppointmentsData = (data = null) => {
        dispatch(AppointmentsMiddleware.getDoctorAppointmentsData(data))
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }

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
            <TouchableOpacity style={styles.Appointment_card} onPress={() => navigation.navigate('PatientDetails', { screenType: 'hospital' })} >
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

                <FlatList
                    key={'Appointments'}
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

export default DoctorCurrAppointments;

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
        width: '97%',
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