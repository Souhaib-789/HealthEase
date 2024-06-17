import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Pressable, LayoutAnimation } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import moment, { duration } from "moment";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import FormModal from "../../components/FormModal";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/actions/GeneralAction";
import AVATAR from '../../assets/images/avatar.png'

const DoctorDetails = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const USER = useSelector(state => state.AuthReducer.user)

    const routeData = props?.route?.params?.item;
    const [confirmedSlot, setconfirmedSlot] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [showCalendar, setshowCalendar] = useState(false);
    const AvaiableDays = ['Mon', 'Wed', 'Fri']
    const Slots = [
        {
            id: 1,
            time: '4:00 PM'
        },
        {
            id: 2,
            time: '4:30 PM'
        },
        {
            id: 3,
            time: '5:00 PM'
        },
        {
            id: 4,
            time: '5:30 PM'
        },

        {
            id: 5,
            time: '6:00 PM'
        },

        {
            id: 6,
            time: '6:30 PM'
        },

        {
            id: 7,
            time: '7:00 PM'
        },
        {
            id: 8,
            time: '7:30 PM'
        }]

    const calendarTheme = {
        selectedDayBackgroundColor: Colors?.PRIMARY,
        selectedDayTextColor: Colors?.WHITE,
        backgroundColor: Colors?.WHITE,
        calendarBackground: Colors?.WHITE,
        textSectionTitleColor: Colors?.BLACK,
        textSectionTitleDisabledColor: Colors?.GREY,
        dayTextColor: Colors?.BLACK,
        textDisabledColor: Colors?.GREY,
        arrowColor: Colors?.BLACK,
        disabledArrowColor: Colors?.GREY,
        todayBackgroundColor: Colors?.LIGHT,
        todayTextColor: Colors?.BLACK,
        textDayFontSize: 12,
        textMonthFontSize: 14,
    }

    const details = [
        {
            name: 'Reviews',
            no: `${routeData?.rating ? routeData?.rating : 0} `,
            icon_name: 'star',
            navigate: 'Reviews'
        },
        {
            name: 'Experience',
            no: `${routeData?.experience} Years`,
            icon_name: 'tips-and-updates'
        },
        {
            name: 'per slot',
            no: routeData?.fee ? routeData?.fee : 1000 + ' Rs',
            icon_name: 'price-change'
        },
    ]

    // console.log(JSON.stringify(routeData , null , 8));


    const renderDetailsItem = (item, index) => {
        return (
            <TouchableOpacity style={styles.flex} disabled={!item?.navigate} onPress={() => navigation.navigate(item?.navigate)} >
                <View style={{ backgroundColor: Colors?.LIGHT, padding: 8, borderRadius: 50, marginRight: 6 }}>
                    <Icon type={IconTypes?.MaterialIcons} name={item?.icon_name} size={16} color={Colors?.PRIMARY} />
                </View>
                <View>
                    <TextComponent style={[styles.textx, { fontFamily: Fonts?.SEMIBOLD, fontSize: 12, color: Colors?.BLACK }]} text={item?.no} />
                    <TextComponent style={[styles.textx, { color: Colors?.DGREY, fontSize: 10 }]} text={item?.name} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderSlotCard = (item, index) => {
        return (
            <TouchableOpacity key={index}
                style={[styles.slot_box,
                {
                    backgroundColor: item?.time == confirmedSlot?.time
                        ? Colors.PRIMARY : Colors?.LIGHT
                }]}
                onPress={() => setconfirmedSlot(item)}>
                <TextComponent
                    style={{ color: item?.time == confirmedSlot?.time ? Colors.WHITE : Colors.PRIMARY, fontSize: 10 }}
                    text={item?.time} />
            </TouchableOpacity>
        )
    }

    const onDateChange = (date) => {
        setSelectedDate({ date });
        console.log(date.toString().substr(0, 15));
    }

    const onScheduleAppoitment = () => {
        if (!selectedDate) return dispatch(showAlert({ message: 'Please select a day' }));
        else if (!confirmedSlot) return dispatch(showAlert({ message: 'Please select any timeslot for ' + moment(selectedDate).format('dddd') }));
        navigation.navigate('Appointment', { item: routeData, timeSlot: confirmedSlot, date: selectedDate })
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Header title={'Details'} back style={{ margin: 10 }} titleStyle={{ color: Colors?.WHITE }} iconColor={Colors.WHITE} />
                <Image source={routeData?.image_url ? {uri: routeData?.image_url} : AVATAR} style={styles.card_image} />

                <View style={styles.details_card}>
                    {
                        USER?.user_role == 'hospital' ?
                            <TouchableOpacity style={styles.heart} onPress={()=> navigation.navigate('CreateDoctor' , {screenType: 'edit'})}>
                                <Icon type={IconTypes.AntDesign} name={'edit'} color={Colors?.DGREY} size={22} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.heart}>
                                <Icon type={IconTypes.Ionicons} name={'heart-sharp'} color={Colors?.GREY} size={22} />
                            </TouchableOpacity>

                    }


                    <View style={{ alignItems: 'center' }}>
                        <TextComponent style={styles.text} text={routeData?.name} />
                        <TextComponent style={styles.textx} text={routeData?.specialization} />
                        <TextComponent style={styles.textx} text={routeData?.hospital_name} />
                    </View>


                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', marginVertical: 25 }}>
                        {details.map(renderDetailsItem)}
                    </View>

                    <TextComponent style={styles.heading} text={'About'} />
                    <TextComponent style={styles.textx} text={routeData?.about ? routeData?.about : '--'} />

                    <TextComponent style={styles.heading} text={'Availability'} />
                    <View style={styles.flexA}>
                        <View style={{ width: '60%' }}>
                            <View style={styles.flex}>
                                <TextComponent text={'Days :  '} style={styles.short_heading} />
                                <FlatList
                                    data={AvaiableDays}
                                    horizontal
                                    renderItem={({ item }) => <TextComponent text={item} style={styles.texty} />}
                                    keyExtractor={item => item?.id}
                                />
                            </View>

                            <View style={styles.flex}>
                                <TextComponent text={'Duration : '} style={styles.short_heading} />
                                <TextComponent text={'30 Minutes'} style={styles.texty} />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.select_button} onPress={() => { setshowCalendar(true) }}>
                            <Icon type={IconTypes?.AntDesign} name={'calendar'} size={18} color={Colors?.PRIMARY} />
                            <TextComponent style={styles.select_text} text={selectedDate ? moment(selectedDate).format('ddd D MMM') : 'Select Day'} />
                        </TouchableOpacity>
                    </View>


                    <TextComponent style={styles.heading} text={'Available Slots' + (selectedDate ? ` for ${moment(selectedDate).format('dddd')}` : ' ')} />
                    {
                        selectedDate ?
                            <View style={styles.slots_view}>
                                {Slots?.map(renderSlotCard)}
                            </View>
                            :
                            <TextComponent style={styles.textx} text={'Select day first'} />
                    }

                    {
                        USER?.user_role == 'hospital' ?
                            null
                            :
                            <Button title={'Schedule appointment'}
                                style={{ marginVertical: 15 }}
                                onPress={onScheduleAppoitment} />
                    }


                </View>
                <FormModal
                    visible={showCalendar}
                    onClose={() => setshowCalendar(false)}
                >
                    <Calendar
                        onDayPress={e => {
                            let day = moment(e.dateString).format('ddd')
                            if (AvaiableDays.includes(day)) {
                                setshowCalendar(false)
                                setSelectedDate(e.dateString)
                            } else {
                                alert('Doctor is not available on this day')
                            }
                        }}
                        markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true } }}
                        disabledDaysIndexes={[0, 2, 4, 6]}
                        style={styles.calendar}
                        minDate={moment().format('YYYY-MM-DD')}
                        theme={calendarTheme}
                    />
                </FormModal>
            </ScrollView>
        </View>
    )
}

export default DoctorDetails;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
        paddingVertical: 10
    },
    headingx: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.BLACK
    },
    text: {
        fontSize: 20,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD
    },
    heading: {
        fontSize: 16,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD,
        marginTop: 15
    },
    short_heading: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts?.REGULAR,
    },
    span: {
        fontWeight: "bold"
    },
    textx: {
        fontSize: 12,
        color: Colors?.DGREY,
        lineHeight: 20
    },
    texty: {
        fontSize: 12,
        marginRight: 5,
        color: Colors?.PRIMARY,
        fontFamily: Fonts?.SEMIBOLD
    },
    sub_heading: {
        fontSize: 18,
        color: Colors.WHITE
    },
    category_box: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 8,
        backgroundColor: 'rgba(14, 190, 127, 0.08)',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 10
    },
    category_text: {
        color: Colors.PRIMARY,
        fontSize: 14
    },
    next_available: {
        marginVertical: 10
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
    },
    flexA: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    heart: {
        position: "absolute",
        right: 20,
        top: 20
    },
    details_card: {
        width: '100%',
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: Colors.WHITE,
        marginTop: 70,
        padding: 15,
        paddingTop: 60
    },
    popular_card_subview: {
        width: '70%',
        marginLeft: 15
    },
    card_image: {
        width: 130,
        borderColor: Colors?.WHITE,
        borderWidth: 5,
        height: 130,
        borderRadius: 100,
        zIndex: 99,
        position: "absolute",
        top: 75,
        alignSelf: 'center'
    },

    option: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.GREY,
        alignItems: "center",
        marginHorizontal: 8,
        marginVertical: 15,
        paddingHorizontal: 20,
        paddingVertical: 7,
    },
    button: {
        borderRadius: 5,
        width: '90%',
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginTop: 20
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
    },
    slot_box: {
        width: 70,
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    },
    slots_view: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10
    },
    select_button: { backgroundColor: Colors?.LIGHT, borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
    select_text: { color: Colors?.PRIMARY, fontSize: 10 },
    calendar: {
        borderRadius: 10,
        margin: 15
    }
})