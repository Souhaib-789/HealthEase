import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl, Modal } from "react-native";
import { Colors } from "../../utilities/Colors";
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Fonts } from "../../utilities/Fonts";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import DoctorCard from "../../components/DoctorCard";
import bellIcon from '../../assets/images/bell.png'
import NO_DOC from '../../assets/images/noDoc.png'
import { useDispatch, useSelector } from "react-redux";
import { DoctorsMiddleware } from "../../redux/middlewares/DoctorsMiddleware";
import BOT_ICON from '../../assets/images/botIcon.png'
import Lottie from 'lottie-react-native';
import Button from "../../components/Button";
import { Storage } from "../../utilities/AsyncStorage";
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { isUrduLanguage } from "../../utilities/Utilities";
import AVATAR from '../../assets/images/avatar.png'

const Home = () => {
    
    const { t } = useTranslation()
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [search, setsearch] = useState();
    const [loading, setloading] = useState(true)
    const [introModal, setIntroModal] = useState(false)
    const [introModalStatus, setIntroModalStatus] = useState(false)

    const USER = useSelector(state => state.AuthReducer?.user)
    const Doctors = useSelector(state => state.DoctorsReducer?.dashboardDoctors)
    const UPAppointment = useSelector(state => state.AppointmentsReducer?.myAppointmentList[0])
    const isUrdu = isUrduLanguage();

    // console.log('Data ->>>>', JSON.stringify(Doctors, null, 8));

    useEffect(() => {
        fetchDoctorsData();
        fetchAppointmentsData();
        checkIntroModalStatus();
    }, [])


    const fetchDoctorsData = () => {
        const data = {
            search: '',
            category: '',
        }
        dispatch(DoctorsMiddleware.getAllDoctorsData(data))
            .then(() => setloading(false))
            .catch(() => setloading(false))
    }

    const checkIntroModalStatus = async () => {
        let response = await Storage.get('@introModal');
        setIntroModalStatus(response);
    };


    const fetchAppointmentsData = () => {
        const data = {
            status: 'upcoming',
            search: undefined
        }
        dispatch(AppointmentsMiddleware.getAppointmentsData(data))
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => { setloading(true), fetchDoctorsData() , fetchAppointmentsData()}}
                />
            } >

                <View style={styles.home_header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather name='menu' size={23} color={Colors.BLACK} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={() => navigation.navigate('Notifications')} >
                        <Image source={bellIcon} style={{ width: 20, height: 20 }} tintColor={Colors.PRIMARY} />
                    </TouchableOpacity> */}

                      <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                      <Image source={USER?.image_url ? { uri: USER?.image_url } : USER?.image ? { uri: USER?.image } :AVATAR} style={styles.profile_image} resizeMode='cover'  />
                      </TouchableOpacity>
                </View>

                <View style={styles.mV}>
                    <TextComponent style={styles.sub_heading} text={t('Good Morning') + ' !'} />
                    <TextComponent style={[styles.heading , {alignSelf: isUrdu ? 'flex-end' : 'flex-start'}]} text={USER?.user_name ? USER?.user_name : 'Mr. Patient'} />
                </View>

                <View style={styles.sub_container}>
                    <TextComponent style={styles.sub_container_heading} text={t('Keep Healthy') + ' !'} />
                    <View>
                        <View style={styles.input_caption}>
                            <TextComponent style={styles.caption_text} text={t('AI Chatbot')} />
                        </View>
                        <Input
                            placeholder={t('Ask to healthbot ...')}
                            value={search}
                            leftIcon={
                                <Image source={BOT_ICON} style={{ width: 35, height: 35 }} />
                            }
                            style={{ width: isUrdu ? '80%' : '90%'}}
                            onFocus={() => introModalStatus ? navigation.navigate('HealthbotChat') : setIntroModal(true)}
                            mainStyle={styles.search_input} />

                    </View>
                    <View style={[styles.flex , {flexDirection: isUrdu ? 'row-reverse' : 'row'}]}>
                        <TextComponent style={styles.headingx} text={t('Upcoming Appointments')} />
                        <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
                            <TextComponent text={t('See all')} />
                        </TouchableOpacity>
                    </View>


                    {UPAppointment ?

                        <TouchableOpacity onPress={() => navigation.navigate('AppointmentDetails', { screenType: 'upcoming' , item: UPAppointment })}>
                            <View style={styles.Appointment_card} >
                                <View style={styles.appointment_card_subview1}>
                                    <View style={styles.appointment_card_subview2}>
                                        <Image source={UPAppointment?.docter?.image_url ?
                                            { uri: UPAppointment?.docter?.image_url } : require('../../assets/images/avatar.png')
                                        } style={styles.Appointment_image} resizeMode='cover' />
                                        <View>
                                            <TextComponent style={[styles.appointment_card_text, { fontFamily: Fonts?.SEMIBOLD }]}
                                                text={UPAppointment?.docter?.name ? UPAppointment?.docter?.name : '--'} />
                                            <TextComponent style={styles.appointment_card_span} text={UPAppointment?.docter?.specialization ? UPAppointment?.docter?.specialization : '--'} />
                                        </View>
                                    </View>
                                    <Icon type={IconTypes.MaterialIcons} name={'keyboard-arrow-right'} size={25} color={Colors.WHITE} />
                                </View>

                                <View style={styles.appointment_card_subview3}>
                                    <View style={styles.appointment_card_subview4}>
                                        <Icon type={IconTypes.Feather} name={'calendar'} size={15} color={Colors.WHITE} />
                                        <TextComponent style={styles.appointment_card_span} text={UPAppointment?.date ? moment(UPAppointment?.date).format('DD MMM YYYY') : '--'} />
                                    </View>
                                    <View style={styles.appointment_card_subview4}>
                                        <Icon type={IconTypes.Ionicons} name={'time-outline'} size={15} color={Colors.WHITE} />
                                        <TextComponent style={styles.appointment_card_span} text={UPAppointment?.startTime ? moment(UPAppointment?.startTime).format('hh : mm A') : '--'} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        : <ListEmptyComponent short text={t('not booked yet') + ' !'} />
                    }


                </View>

                <FlatList
                    key={'Featured doctors'}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={[styles.flex ,styles.mV , {flexDirection: isUrdu ? 'row-reverse' : 'row'}]}>
                            <TextComponent style={styles.headingx} text={t('Find your doctor')} />
                            <TouchableOpacity onPress={() => navigation.navigate('Doctors')}>
                                <TextComponent text={t('See all')} />
                            </TouchableOpacity>
                        </View>
                    )}
                    data={loading ? [1, 2, 3] : Doctors}
                    decelerationRate={'fast'}
                    renderItem={({ item }) =>
                        (<DoctorCard item={item} loading={loading} />)}
                    ListEmptyComponent={<ListEmptyComponent image={NO_DOC} text={t('no doctors found')} />}
                    keyExtractor={(item, index) => index.toString()}

                />
            </ScrollView>

            {/* <TouchableOpacity onPress={() => introModalStatus ? navigation.navigate('HealthbotChat') : setIntroModal(true)} style={styles.healthbot_icon}>
                <Image source={BOT_ICON} style={{ width: 40, height: 40 }} tintColor={'white'} />
            </TouchableOpacity> */}

            <Modal
                animationType={'fade'}
                transparent={true} visible={introModal}>
                <View style={styles.modal_parent}>

                    <View style={{ backgroundColor: Colors.WHITE, width: '90%', borderRadius: 20, paddingVertical: 25 }}>
                        <TouchableOpacity onPress={() => setIntroModal(false)} style={{ position: 'absolute', height: 20, zIndex: 1, top: 12, right: 15, bottom: 0 }}>
                            <Icon name='close' type={IconTypes.AntDesign} size={15} color={Colors.DGREY} />
                        </TouchableOpacity>
                        <Image source={require('../../assets/images/BG3.png')} style={{ position: 'absolute', bottom: 150, width: '100%', height: '80%' }} />
                        <View style={styles.heading_container}>
                            {
                                isUrdu ? 
                                null :
                                <TextComponent style={styles.heading} text={t("Hello ! I'm ")} />

                            }
                            <TextComponent style={styles.headingx} text={t("Healthbot")} />
                        </View>

                        <Lottie source={require('../../assets/animations/bot.json')}
                            autoPlay
                            loop
                            style={{ width: 170, height: 180, alignSelf: 'center', marginVertical: 100 }}
                        />

                        <TextComponent style={styles.headingy} text={t("Do you want any healthy food advice ?")} />
                        <Button onPress={() => {
                            Storage.set('@introModal', 'true')
                            setIntroModal(false)
                            navigation.navigate('HealthbotChat')
                        }} title={t("Ask me")} style={styles.button} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
        padding: 15
    },
    mV: {
        marginVertical: 10
    },
    scrollView: {
        marginBottom: 10
    },
    search_input: {
        paddingVertical: 5,
        marginTop: 10,
        elevation: 2,
        borderRadius: 25,
        backgroundColor: Colors.WHITE,
        width: '100%',
        alignSelf: 'center',
        borderWidth: 0,
    },
    sub_container: {
        marginVertical: 10,
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        padding: 15,
        alignSelf: "center",
        backgroundColor: Colors.LGREY,
    },
    sub_container_heading: {
        fontSize: 20,
        color: Colors.BLACK,
        // width: '100%',
        lineHeight: 25,
        marginVertical: 8
    },
    heading: {
        fontSize: 16,
        fontFamily: Fonts?.SEMIBOLD
    },
    headingx: {
        fontSize: 15,
        fontFamily: Fonts?.SEMIBOLD,
        color: Colors.BLACK
    },
    appointment_card_text: {
        fontSize: 14,
        color: Colors.WHITE,
        marginVertical: 2,
    },
    appointment_card_span: {
        fontSize: 12,
        color: Colors.WHITE,
        fontFamily: Fonts?.REGULAR
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
        color: Colors.BLACK,
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
        width: 35,
        height: 35,
    },
    home_header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    category_box: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
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
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 15,
        paddingVertical: 13,
        alignItems: "center"
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
        backgroundColor: Colors.DARK_BLUE,
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
    healthbot_icon: {
        position: 'absolute', bottom: 20, right: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.PRIMARY, borderRadius: 100, elevation: 5, padding: 5, borderColor: Colors.PRIMARY, borderWidth: 0
    },
    modal_parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    heading_container: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    headingy: {
        fontSize: 16,
        width: '70%',
        alignSelf: "center",
        textAlign: "center",
    },
    button: {
        marginTop: 20,
        alignSelf: "center",
        width: '40%',
        borderRadius: 60,
    },
    input_caption: { position: 'absolute', right: 5, elevation: 3, zIndex: 999, backgroundColor: Colors.RGBA, width: 65, padding: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
    caption_text: { fontSize: 8, textShadow: 3, color: Colors.WHITE }
})