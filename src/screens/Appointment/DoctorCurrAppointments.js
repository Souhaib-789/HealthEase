import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl } from "react-native";
import AVATAR from '../../assets/images/avatar.png'
import { Colors } from "../../utilities/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Fonts } from "../../utilities/Fonts";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Skeleton from "../../components/Skeleton";

const DoctorCurrAppointments = (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const APPOINTMENTS = useSelector(state => state.AppointmentsReducer?.doctorAppointmentList)

        // console.log('-----------------', JSON.stringify(APPOINTMENTS, null, 8));

    useEffect(() => {
        const data = { doctorId: props?.docID }
        fetchAppointmentsData(data)
    }, [])

    const fetchAppointmentsData = (data = null) => {
        dispatch(AppointmentsMiddleware.getDoctorAppointmentsData(data))
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }


    const renderItem = ({ item }) => {
        return (
            loading ?
            <View style={styles.Appointment_card}  >
            <View style={styles.appointment_card_subview1}>
                <View style={styles.appointment_card_subview2}>
                    <Skeleton style={styles.Appointment_image} styles={{ width: '18%' }} />
                    <View>
                        <Skeleton style={{ width: '45%', height: 15, borderRadius: 3 }} />
                        <Skeleton style={{ width: '50%', height: 10, borderRadius: 3 }} />
                    </View>
                </View>
            </View>
            <Skeleton style={{ width: '100%', height: 33, borderRadius: 10 }} />
        </View>
        :
            <TouchableOpacity style={styles.Appointment_card} onPress={() => navigation.navigate('PatientDetails', {item: item, screenType: 'hospital' })} >
                <View style={styles.appointment_card_subview1}>
                    <View style={styles.appointment_card_subview2}>
                        <Image source={item?.patient?.image_url ? {uri: item?.patient?.image_url}: AVATAR} style={styles.Appointment_image} />
                        <View>
                            <TextComponent style={[styles.appointment_card_text, { fontFamily: Fonts?.SEMIBOLD }]} text={item?.patient?.user_name} />
                            <TextComponent style={styles.appointment_card_span} text={'for ' + item?.relation} />
                        </View>
                    </View>
                    <Icon type={IconTypes.MaterialIcons} name={'keyboard-arrow-right'} size={25} color={Colors.PRIMARY} />
                </View>

                <View style={styles.appointment_card_subview3}>
                    <View style={styles.appointment_card_subview4}>
                        <Icon type={IconTypes.Feather} name={'calendar'} size={15} color={Colors.PRIMARY} />
                        <TextComponent style={styles.appointment_card_span} text={item?.date ? moment(item?.date).format('DD MMM YYYY') : '--'} />
                    </View>
                    <View style={styles.appointment_card_subview4}>
                        <Ionicons name='time-outline' color={Colors.PRIMARY} size={15} />
                        <TextComponent style={styles.appointment_card_span} text={item?.startTime ? moment(item?.startTime).format('hh:mm A') : '--'} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={ loading ? [1,2,3] : APPOINTMENTS}
                    decelerationRate={'fast'}
                    renderItem={renderItem}
                    ListEmptyComponent={<ListEmptyComponent short  text={'no appointments found'} />}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => fetchAppointmentsData()}
                            />
                    }
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