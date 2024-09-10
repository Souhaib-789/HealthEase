import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import Header from "../../components/Header";
import moment, { duration } from "moment";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import FormModal from "../../components/FormModal";
import AVATAR from '../../assets/images/avatar.png';
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";
import { showAlert } from "../../redux/actions/GeneralAction";

const PatientDetails = (props) => {

    const screenType = props?.route?.params?.screenType;
    const item = props?.route?.params?.item;
    const [openModal, setopenModal] = useState(false)
    const [prescription, setprescription] = useState(null)
    const [presSubmitted, setPresSubmitted] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const startTime = moment(item?.startTime).format('hh:mm A')
    const endTime = moment(item?.endTime).format('hh:mm A')
    console.log('item', JSON.stringify(item, null, 8))

    const onMakeCompleted = () => {
        const data = { id: item?._id }
        dispatch(AppointmentsMiddleware.onCompleteAppointment(data))
            .then((res) => { 
                dispatch(showAlert({message: res?.message, title: 'Appointment Completed'}))
                navigation.goBack() })
            .catch((err) => { console.log('err', err) })

    }


    const onPressSubmitPres = () => {
        if(!prescription) return Alert.alert('Error', 'Please enter prescription')
        const data = { id: item?._id, prescription: prescription }
        dispatch(AppointmentsMiddleware.onAddPrescription(data))
            .then((res) => {  setopenModal(false) ,  setPresSubmitted(true)})
            .catch((err) => { console.log('err', err) })
    }


    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Header title={'Details'} back />
                <Image source={item?.patient?.image ? { uri: item?.patient?.image } : AVATAR} style={styles.card_image} />

                <View style={styles.details_card}>

                    <View style={styles.box}>
                        <TextComponent style={styles.heading} text={'Appointment Details'} />
                        <View style={styles.wide_row}>
                            <View style={styles.row}>
                                <Icon name='calendar-clear-outline' type={IconTypes.Ionicons} size={18} color={Colors?.BLACK} />
                                <TextComponent text={'Day :  '} style={styles.short_heading} />
                            </View>
                            <TextComponent text={item?.date ? moment(item?.date).utc().format("ddd , DD MMMM") : '--'} style={styles.texty} />
                        </View>

                        <View style={styles.wide_row}>
                            <View style={styles.row}>
                                <Icon name='clockcircleo' type={IconTypes.AntDesign} size={18} color={Colors?.BLACK} />
                                <TextComponent text={'Time :  '} style={styles.short_heading} />
                            </View>
                            <TextComponent text={startTime ? startTime + ' - ' + endTime : '--'} style={styles.texty} />
                        </View>

                        <View style={styles.wide_row}>
                            <View style={styles.row}>
                                <Icon name='timer-outline' type={IconTypes.Ionicons} size={18} color={Colors?.BLACK} />
                                <TextComponent text={'Duration :  '} style={styles.short_heading} />
                            </View>
                            <TextComponent text={(item?.duration ? item?.duration : 15) + ' Minutes'} style={styles.texty} />
                        </View>

                        <View style={styles.hr} />


                        <TextComponent style={styles.heading} text={'Patient Info'} />

                        <View style={styles.wide_row}>
                            <TextComponent text={'Name :  '} style={styles.short_heading} />
                            <TextComponent text={item?.name ? item?.name : '--'} style={styles.textx} />
                        </View>

                        <View style={styles.wide_row}>
                            <TextComponent text={'Booked By :  '} style={styles.short_heading} />
                            <TextComponent text={item?.patient?.user_name ? item?.patient?.user_name : '--'} style={styles.textx} />
                        </View>

                        <View style={styles.wide_row}>
                            <TextComponent text={'Relationship :  '} style={styles.short_heading} />
                            <TextComponent text={item?.relation ? item?.relation : '--'} style={styles.textx} />
                        </View>

                        <View style={styles.wide_row}>
                            <TextComponent text={'Contact No :  '} style={styles.short_heading} />
                            <TextComponent text={item?.contact ? item?.contact : '--'} style={styles.textx} />
                        </View>
                    </View>

                    {
                        screenType == 'doctor' ?
                            (
                                <>
                                {
                                    presSubmitted ? null :
                                
                                    <Button onPress={() => setopenModal(true)} icon={<Icon name='clipboard' type={IconTypes.Feather} size={20} color={Colors?.PRIMARY} />} title={'Write a prescription'} light style={{ marginTop: 15 }} />}
                                    <Button onPress={onMakeCompleted} icon={<Icon name='checkmark-done-circle-outline' type={IconTypes.Ionicons} size={20} color={Colors?.WHITE} />} title={'Make it completed'} style={styles.button} />
                                </>
                            )
                            : null
                    }
                </View>
            </ScrollView>

            <FormModal
                visible={openModal}
                setOpen={setopenModal}
                onClose={() => setopenModal(false)}
            >
                <TextComponent text={'Write Prescription'} style={[styles.heading, { alignSelf: 'center' }]} />

                <Input
                    placeholder={'Enter prescription here ...'}
                    value={prescription}
                    multiline
                    numberOfLines={8}
                    onChangeText={(e) => setprescription(e)}
                    style={{textAlignVertical: 'top'}}
                    mainStyle={{
                        width: '90%',
                        marginTop: 10
                    }} />

                <Button title={'Submit'} onPress={onPressSubmitPres} style={{ marginTop: 20 }} />

            </FormModal>
        </View>
    )
}

export default PatientDetails;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
        paddingVertical: 10
    },
    box: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        marginVertical: 10
    },
    hr: {
        borderBottomColor: Colors?.GREY,
        borderBottomWidth: 1,
        marginTop: 15
    },
    heading: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD,
        marginVertical: 10
    },
    short_heading: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts?.REGULAR,
    },
    textx: {
        fontSize: 12,
        color: Colors?.DGREY,
        lineHeight: 20
    },
    texty: {
        fontSize: 14,
        marginRight: 5,
        color: Colors?.PRIMARY,
        fontFamily: Fonts?.SEMIBOLD
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    wide_row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 3
    },
    heart: {
        position: "absolute",
        right: 20,
        top: 20
    },
    details_card: {
        padding: 15,
    },
    popular_card_subview: {
        width: '70%',
        marginLeft: 15
    },
    card_image: {
        marginTop: 20,
        width: 120,
        height: 120,
        borderRadius: 100,
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
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginVertical: 20
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