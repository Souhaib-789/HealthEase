import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl } from "react-native";

import { Colors } from "../../utilities/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Fonts } from "../../utilities/Fonts";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import CalendarStrip from 'react-native-slideable-calendar-strip';

import { useDispatch, useSelector } from "react-redux";
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";
import AVATAR from '../../assets/images/avatar.png'
import moment from "moment";
import Skeleton from "../../components/Skeleton";

const DoctorHome = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [state, setState] = useState();
    const [loading, setLoading] = useState(true);
    const USER_DATA = useSelector(state => state.AuthReducer.user)
    const APPOINTMENTS = useSelector(state => state.AppointmentsReducer?.doctorAppointmentList)

    console.log('USER_DATA ------->>>>', JSON.stringify(APPOINTMENTS, null, 8));


    useEffect(() => {
        fetchAppointmentsData({ doctorId: USER_DATA?.user_id })
    }, [USER_DATA])

    const fetchAppointmentsData = (data = null) => {
        dispatch(AppointmentsMiddleware.getDoctorAppointmentsData(data))
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }

    const onFilterByDate = (date) => {
        setState({ selectedDate: date });
        setLoading(true)
        const data = {
            doctorId: USER_DATA?.user_id,
            date: date
        }
        fetchAppointmentsData(data)
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
                <TouchableOpacity style={styles.Appointment_card} onPress={() => navigation.navigate('PatientDetails', { item: item, screenType: 'doctor' })} >
                    <View style={styles.appointment_card_subview1}>
                        <View style={styles.appointment_card_subview2}>
                            <Image source={item?.patient?.image_url ? { uri: item?.patient?.image_url } : AVATAR} style={styles.Appointment_image} />
                            <View>
                                <TextComponent style={[styles.appointment_card_text, { fontFamily: Fonts?.SEMIBOLD }]} text={item?.patient?.user_name ? item?.patient?.user_name : '--'} />
                                <TextComponent style={styles.appointment_card_span} text={'for ' + (item?.name ? item?.name : '--')} />
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
                            <TextComponent style={styles.appointment_card_span} text={item?.startTime ? moment(item?.startTime).utc().format('hh:mm A') : '--'} />
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
                                <TextComponent style={styles.sub_heading} text={'Hello Doctor !'} />
                                <TextComponent style={styles.heading} text={USER_DATA?.user_name} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                            <Image source={USER_DATA?.image_url ? { uri: USER_DATA?.image_url } : AVATAR} resizeMode={'cover'} style={{ width: 35, height: 35, borderRadius: 100 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.wide_row}>
                        <TextComponent style={styles.sub_container_heading} text={"Lets explore patient's Appointments!"} />

                        {/* <TouchableOpacity style={{ backgroundColor: Colors.PRIMARY, padding: 10, borderRadius: 40, elevation: 5 }}>
                            <Icon type={IconTypes.Ionicons} name={'filter-outline'} size={20} color={Colors.WHITE} />
                        </TouchableOpacity> */}
                    </View>
                    {
                        loading ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={[1, 2, 3, 4, 5, 6]}
                                horizontal
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{bottom: 3}} >
                                            <Skeleton styles={{ backgroundColor: Colors.PRIMARY, width: '5%' }} style={{ marginLeft: 17, width: 13, height: 5, borderRadius: 10 }} />
                                            <Skeleton styles={{ backgroundColor: Colors.PRIMARY, width: '35%' }} style={{ width: 45, height: 45, borderRadius: 50 }} />
                                        </View>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <View style={{ alignSelf: 'center' }}>
                                <CalendarStrip
                                    selectedDate={state?.selectedDate ? state?.selectedDate : new Date()}
                                    onPressDate={(date) => onFilterByDate(date)}
                                    onPressGoToday={(today) => {
                                        setState({ selectedDate: today });
                                    }}
                                    onSwipeDown={() => {
                                        alert('onSwipeDown');
                                    }}
                                    markedDate={['2024-04-26', '2024-04-27', '2024-04-28', '2024-04-29']}
                                    weekStartsOn={1}
                                    showWeekNumber={true}
                                />
                            </View>
                    }
                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={loading ? [1, 2, 3, 4, 5, 6] : APPOINTMENTS}
                    decelerationRate={'fast'}
                    renderItem={renderItem}
                    ListEmptyComponent={<ListEmptyComponent text={'no appointments found'} />}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => { setLoading(true), setState(new Date()), fetchAppointmentsData({ doctorId: USER_DATA?.user_id }) }}
                        />
                    }
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