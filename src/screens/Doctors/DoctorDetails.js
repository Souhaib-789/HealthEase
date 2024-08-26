import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Pressable, LayoutAnimation, Alert } from "react-native";
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
import TopTab from "../../components/TopTabs";
import Appointments from "../Appointment";
import DoctorCurrAppointments from "../Appointment/DoctorCurrAppointments";
import { clearDoctorDetails } from "../../redux/actions/DoctorsActions";
import { DoctorsMiddleware } from "../../redux/middlewares/DoctorsMiddleware";
import Skeleton from "../../components/Skeleton";
import { useTranslation } from "react-i18next";
import { isUrduLanguage } from "../../utilities/Utilities";

const DoctorDetails = (props) => {

    const isUrdu = isUrduLanguage();

    useEffect(() => {
        return () => {
            dispatch(clearDoctorDetails())
        }
    }, [])

    

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const USER = useSelector(state => state.AuthReducer.user)
    const DETAILS = useSelector(state => state.DoctorsReducer?.doctorDetails)
    console.log(JSON.stringify(DETAILS, null, 8));

    const [activeCompo, setactiveCompo] = useState({ name: 'Info' })
    const [confirmedSlot, setconfirmedSlot] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [showCalendar, setshowCalendar] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true)

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
            no: `${DETAILS?.rating ? DETAILS?.rating : 0} `,
            icon_name: 'star',
            navigate: 'Reviews'
        },
        {
            name: 'Experience',
            no: DETAILS?.experience ? DETAILS?.experience : '--',
            icon_name: 'tips-and-updates'
        },
        {
            name: 'per slot',
            no: DETAILS?.fee ? DETAILS?.fee : 0.00 + ' Rs',
            icon_name: 'price-change'
        },
    ]

    const getSlotsForDay = (date) => {
        setLoading(true)
        setshowCalendar(false)
        setSelectedDate(date)

        let findDay = DETAILS?.slots?.find(item => item?.day == moment(date).format('ddd'))
        // console.log('findDay', findDay.shift_start_Time, findDay.shift_end_Time);
        const data = {
            id: DETAILS?.id,
            date: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            startTime: findDay?.shift_start_Time,
            endTime: findDay?.shift_end_Time,
            duration: DETAILS?.duration
        }
        dispatch(DoctorsMiddleware.getTimeSlots(data))
            .then(res => {
                console.log(JSON.stringify(timeSlots, null, 8));

                setLoading(false)
                setTimeSlots(res)
            })
            .catch(err => {
                console.log('err', err);
                setLoading(false)
            })
    }

    const renderDetailsItem = (item, index) => {
        return (
            <TouchableOpacity style={styles.flex} disabled={!item?.navigate} onPress={() => navigation.navigate(item?.navigate)} >
                <View style={{ backgroundColor: Colors?.LIGHT, padding: 8, borderRadius: 50, marginRight: 6 }}>
                    <Icon type={IconTypes?.MaterialIcons} name={item?.icon_name} size={16} color={Colors?.PRIMARY} />
                </View>
                <View>
                    <TextComponent style={[styles.textx, { fontFamily: Fonts?.SEMIBOLD, fontSize: 12, color: Colors?.BLACK }]} text={item?.no + ' ' + (item?.name == 'Experience' ? t(' Years ') : '')} />
                    <TextComponent style={[styles.textx, { color: Colors?.DGREY, fontSize: 10 }]} text={item?.name} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderSlotCard = ({ item, index }) => {
        const formattedTime = moment(item).utc().format('h:mm A');
        const toTime = moment(item).add(DETAILS?.duration, 'minutes').utc().format('h:mm A');
        const checkIsLastIndex = timeSlots.length - 1 == index;
        return (
            checkIsLastIndex ? null :
                <TouchableOpacity key={index}
                    style={[styles.slot_box,
                    {
                        backgroundColor: item == confirmedSlot
                            ? Colors.PRIMARY : Colors?.LIGHT
                    }]}
                    onPress={() => setconfirmedSlot(item)}>
                    <TextComponent
                        style={{ color: item == confirmedSlot ? Colors.WHITE : Colors.PRIMARY, fontSize: 10, textAlign: 'center' }}
                        text={formattedTime + '\n' + t('to') + '\n' + toTime} />
                </TouchableOpacity>
        )
    }

    const onPressDelDoctor = () => {
        Alert.alert(t('Delete Doctor'), t('Are you sure you want to delete this doctor?'), [
            {
                text: t('Cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: "cancel"
            },
            {
                text: t('Delete'),
                onPress: null
            }
        ])
    }


    const onProceed = () => {
        if (!selectedDate) return dispatch(showAlert({ message: 'Please select a day' }));
        else if (!confirmedSlot) return dispatch(showAlert({ message: 'Please select any timeslot for ' + moment(selectedDate).format('dddd') }));
        navigation.navigate('Appointment', { timeSlot: confirmedSlot, date: selectedDate, duration: DETAILS?.duration })
    }



    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Header title={'Details'} back style={{ margin: 10 }} titleStyle={{ color: Colors?.WHITE }} iconColor={Colors.WHITE} />
                <Image source={DETAILS?.image_url ? { uri: DETAILS?.image_url } : AVATAR} style={styles.card_image} />

                <View style={styles.details_card}>

                    {
                        USER?.user_role == 'hospital' ?
                            <>
                                <TouchableOpacity style={styles.trash} onPress={onPressDelDoctor}>
                                    <Icon type={IconTypes.Ionicons} name={'trash'} color={Colors?.PRIMARY} size={18} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.heart} onPress={() => navigation.navigate('CreateDoctor', { screenType: 'edit' })}>
                                    <Icon type={IconTypes.AntDesign} name={'edit'} color={Colors?.DGREY} size={18} />
                                </TouchableOpacity>
                            </>

                            :
                            <TouchableOpacity style={styles.heart}>
                                <Icon type={IconTypes.Ionicons} name={'heart-sharp'} color={Colors?.GREY} size={22} />
                            </TouchableOpacity>

                    }


                    <View style={{ alignItems: 'center' }}>
                        <TextComponent style={styles.text} text={DETAILS?.name ? DETAILS?.name : '--'} />
                        <TextComponent style={styles.textx} text={DETAILS?.specialization ? DETAILS?.specialization : '--'} />
                        <TextComponent style={styles.textx} text={DETAILS?.hospital?.user_name ? DETAILS?.hospital?.user_name : USER?.user_name} />
                    </View>


                    {USER?.user_role == 'hospital' &&
                        <TopTab
                            options={[{
                                id: 1,
                                name: 'Info'
                            },
                            {
                                id: 2,
                                name: 'Appointments'
                            },
                            ]}

                            focused={activeCompo?.name}
                            onActivePress={(e) => setactiveCompo(e)}
                            style={{ marginVertical: 10 }}
                        />
                    }

                    {
                        activeCompo?.name == 'Info' ?

                            <>
                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', marginVertical: 25 }}>
                                    {details.map(renderDetailsItem)}
                                </View>

                                <TextComponent style={styles.heading} text={'About'} />
                                <TextComponent style={styles.textx} text={DETAILS?.about ? DETAILS?.about : '--'} />

                                <TextComponent style={styles.heading} text={'Availability'} />
                                <View style={[styles.flexA, { flexDirection: isUrdu ? 'row-reverse' : 'row' }]}>
                                    <View style={{ width: '60%' }}>
                                        <View style={[styles.flex, { flexDirection: isUrdu ? 'row-reverse' : 'row' }]}>
                                            <TextComponent text={'Days :  '} style={styles.short_heading} />
                                            <FlatList
                                                data={DETAILS?.slots}
                                                horizontal
                                                renderItem={({ item }) => <TextComponent text={item?.day} style={styles.texty} />}
                                                keyExtractor={item => item?.id}
                                            />
                                        </View>

                                        <View style={[styles.flex, { flexDirection: isUrdu ? 'row-reverse' : 'row' }]}>
                                            <TextComponent text={'Duration : '} style={styles.short_heading} />
                                            <TextComponent text={(DETAILS?.duration ? DETAILS?.duration : 15) + ' Minutes'} style={styles.texty} />
                                        </View>


                                    </View>

                                    <TouchableOpacity style={styles.select_button} onPress={() => { setshowCalendar(true) }}>
                                        <Icon type={IconTypes?.AntDesign} name={'calendar'} size={18} color={Colors?.PRIMARY} />
                                        <TextComponent style={styles.select_text} text={selectedDate ? moment(selectedDate).format('ddd D MMM') : 'Select Day'} />
                                    </TouchableOpacity>
                                </View>

                                {
                                    isUrdu ?
                                        <TextComponent style={styles.heading} text={(selectedDate ? t(moment(selectedDate).format('dddd')) : 'دن') + ' ' + t('for') + ' ' + t('Available Slots')} />

                                        :

                                        <TextComponent style={styles.heading} text={'Available Slots' + (selectedDate ? 'for' + moment(selectedDate).format('dddd') : ' ')} />
                                }

                                {
                                    selectedDate ?
                                        (loading ?
                                            <View style={styles.flex}>
                                                <Skeleton radius={10} styles={{ width: '23%', marginRight: 10 }} style={{ height: 60 }} />
                                                <Skeleton radius={10} styles={{ width: '23%', marginRight: 10 }} style={{ height: 60 }} />
                                                <Skeleton radius={10} styles={{ width: '23%', marginRight: 10 }} style={{ height: 60 }} />
                                                <Skeleton radius={10} styles={{ width: '23%', marginRight: 10 }} style={{ height: 60 }} />
                                            </View>
                                            :
                                            <FlatList
                                                data={timeSlots}
                                                horizontal
                                                renderItem={renderSlotCard}
                                                keyExtractor={item => item?.id}
                                                ListEmptyComponent={<TextComponent text={'no slots available'} style={styles.textx} />}
                                            />
                                        )
                                        :
                                        <TextComponent style={styles.textx} text={'Select day first'} />
                                }

                                {
                                    USER?.user_role == 'hospital' ?
                                        null
                                        :
                                        <Button title={'Schedule appointment'}
                                            style={{ marginVertical: 25 }}
                                            onPress={onProceed} />
                                }

                            </>
                            :

                            <DoctorCurrAppointments docID={DETAILS?.id} />
                    }

                </View>


                <FormModal
                    visible={showCalendar}
                    onClose={() => setshowCalendar(false)}
                >
                    <Calendar
                        onDayPress={e => {
                            let day = moment(e.dateString).format('ddd')
                            let allDays = DETAILS?.slots?.map(item => item?.day)
                            if (allDays?.includes(day)) {
                                getSlotsForDay(e.dateString)
                            } else {
                                Alert.alert(t('Note'), t('Doctor is not available on this day'))
                            }
                        }}
                        markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true } }}
                        // disabledDaysIndexes={[0, 2, 4, 6]}
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
        fontSize: 18,
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
    trash: {
        position: "absolute",
        right: 55,
        top: 20
    },
    details_card: {
        width: '100%',
        minHeight: 600,
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
        paddingHorizontal: 10,
        width: 70,
        paddingVertical: 5,
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