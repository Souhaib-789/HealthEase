import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import Input from "../../components/Input";
import SuccessModal from "../../components/SuccessModal";
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Button from "../../components/Button";
import Icon, { IconTypes } from "../../components/Icon";
import { Fonts } from "../../utilities/Fonts";
import DoctorCard from "../../components/DoctorCard";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/actions/GeneralAction";
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";

const AppointmentForm = (props) => {

    const routeData = props?.route?.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [patient, setpatient] = useState()
    const [contactNo, setcontactNo] = useState()
    const [detail, setdetail] = useState()
    const [openModal, setopenModal] = useState(false)
    const DETAILS = useSelector(state => state.DoctorsReducer?.doctorDetails)

    const formattedDate = moment(routeData?.date)
        .utc()
        .set({
            hour: 14,
            minute: 51,
            second: 10,
            millisecond: 927
        })
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    // console.log('Data ---->>>>>', JSON.stringify(DETAILS, null, 8));


    const onBookAppointment = () => {
        if (!patient) {
            dispatch(showAlert({ message: 'Please enter patient name' }))
        }
        else if (!contactNo) {
            dispatch(showAlert({ message: 'Please enter contact number' }))
        }
        else if (!detail) {
            dispatch(showAlert({ message: 'Please enter relationship with patient' }))
        }
        else {
            const data = {
                doctorId: DETAILS?._id,
                appointmentDate: formattedDate,
                startTime: moment(routeData?.timeSlot).utc(),
                endTime: moment(routeData?.timeSlot).utc().add(15, 'minutes'),
                patientName: patient,
                relationship: detail,
                contactNo: contactNo
            }

            dispatch(AppointmentsMiddleware.onBookAppointment(data))
                .then((res) => { setopenModal(true) })
                .catch((err) => { console.log('error', err) })
        }
    }

    return (
        <View style={styles.Container}>
            <Header title={'Appointment'} back />
            <ScrollView style={{ flex: 1 }}>

                <DoctorCard item={DETAILS} style={{ width: '90%' }} />

                <View style={styles.summary}>
                    <View style={styles.flexA}>
                        <TextComponent text={'Day : '} style={styles.textx} />
                        <TextComponent text={routeData?.date ? moment(routeData?.date).format('ddd D MMM') : '--'} style={[styles.textx, { color: Colors?.BLACK }]} />
                    </View>

                    <View style={styles.flexA}>
                        <TextComponent text={'Time : '} style={styles.textx} />
                        <TextComponent text={routeData?.timeSlot ? moment(routeData?.timeSlot).utc().format('h:mm A') + ' to ' + moment(routeData?.timeSlot).add(15, 'minutes').utc().format('h:mm A') : '--'} style={[styles.textx, { color: Colors?.BLACK }]} />
                    </View>

                </View>
                <Input
                    label={'Patient Name'}
                    value={patient}
                    onChangeText={(e) => setpatient(e)}
                    placeholder={'Enter Patient Name'}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <Input
                    label={'Contact Number'}
                    value={contactNo}
                    onChangeText={(e) => setcontactNo(e)}
                    keyboardType={'phone-pad'}
                    placeholder={'Enter Contact Number'}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <Input
                    label={'Relationship with Patient'}
                    placeholder={'e.g: My Self , my Child , my Mother'}
                    value={detail}
                    onChangeText={(e) => setdetail(e)}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />


                <Button title={'Book Appointment'} onPress={onBookAppointment} style={styles.button} />


            </ScrollView>


            <SuccessModal
                children={
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.thumb_bg}>
                            <Icon type={IconTypes.FontAwesome} name={'check'} color={Colors.PRIMARY} size={50} />
                        </View>
                        <TextComponent text={'Thank you !'} style={styles.text} />
                        <TextComponent style={styles.modal_message} text={'Your appointment has been booked. You can find this in upcoming appointments.'} />
                    </View>
                }
                OnClose={() => navigation.navigate('Home')}
                close={true}
                visible={openModal} />

        </View>
    )
}

export default AppointmentForm;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    input_parent_style: {
        marginVertical: 10,
        alignSelf: 'center',
    },
    text: {
        fontSize: 25,
        color: Colors?.PRIMARY,
        marginVertical: 2,
        fontFamily: Fonts?.SEMIBOLD
    },
    mainInput: {
        paddingVertical: 0,
        width: '90%',
        borderRadius: 10,
    },
    button: {
        marginVertical: 20
    },
    thumb_bg: {
        backgroundColor: Colors?.LIGHT,
        width: 120,
        height: 120,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 15
    },
    modal_message: {
        marginTop: 10,
        lineHeight: 20,
        fontSize: 13,
        textAlign: "center",
        margin: 26
    },
    flexA: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textx: {
        fontSize: 14,
        color: Colors?.DGREY
    },
    summary: {
        backgroundColor: Colors?.WHITE,
        gap: 5,
        elevation: 3,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        marginHorizontal: 3,
        width: '90%',
        alignSelf: 'center'
    }
})