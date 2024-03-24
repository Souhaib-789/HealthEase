import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import Input from "../../components/Input";
import ImagePicker from 'react-native-image-crop-picker';
import SuccessModal from "../../components/SuccessModal";
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Button from "../../components/Button";
import Icon, { IconTypes } from "../../components/Icon";
import { Fonts } from "../../utilities/Fonts";
import DoctorCard from "../../components/DoctorCard";
import { Text } from "react-native-reanimated/lib/typescript/Animated";
import moment from "moment";

const AppointmentForm = (props) => {

    const routeData = props?.route?.params;
    const navigation = useNavigation();
    const [patient, setpatient] = useState()
    const [contactNo, setcontactNo] = useState()
    const [detail, setdetail] = useState()
    const [image, setimage] = useState()
    const [openModal, setopenModal] = useState(false)

    const UploadImage = () => {
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                let splitPath = image?.path?.split("/")
                let filename = splitPath[splitPath?.length - 1]
                setimage({
                    uri: Platform.OS == 'ios' ? image?.path.replace("file://", "/") : image?.path,
                    name: filename,
                    size: image?.size,
                    type: image?.mime,
                });
            }).catch(e => {
                console.log('===>', e);
            });
        } catch (e) {
            console.log('===>', e)
        }
    }

    return (
        <View style={styles.Container}>
            <Header title={'Appointment'} backIcon />
            <ScrollView style={{ flex: 1 }}>

                <DoctorCard item={routeData?.item} />

                <View style={styles.summary}>
                    <View style={styles.flexA}>
                        <TextComponent text={'Day :'} style={styles.textx} />
                        <TextComponent text={routeData?.date ? moment(routeData?.date).format('ddd D MMM') : '--'} style={[styles.textx, { color: Colors?.BLACK, fontSize: 16 }]} />
                    </View>

                    <View style={styles.flexA}>
                        <TextComponent text={'Time :'} style={styles.textx} />
                        <TextComponent text={routeData?.timeSlot?.time ? routeData?.timeSlot?.time : '--'} style={[styles.textx, { color: Colors?.BLACK, fontSize: 16 }]} />
                    </View>

                </View>
                <Input
                    label={'Patient Name'}
                    value={patient}
                    onChangeText={(e) => setpatient(e)}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <Input
                    label={'Contact Number'}
                    value={contactNo}
                    onChangeText={(e) => setcontactNo(e)}
                    keyboardType={'phone-pad'}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <Input
                    label={'Relationship with Patient'}
                    placeholder={'e.g: My Self , my Child , my Mother'}
                    value={detail}
                    onChangeText={(e) => setdetail(e)}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                {
                    image ?
                        <Image source={{ uri: image?.uri }} style={styles.uploaded_image} />
                        :
                        <TouchableOpacity style={styles.upload_image} onPress={UploadImage}>
                            <Icon type={IconTypes.Feather} name={'plus'} size={30} color={Colors.PRIMARY} />
                            <TextComponent style={{ color: Colors.PRIMARY, fontSize: 12 }} text={'Add Image'} />
                        </TouchableOpacity>
                }

                <Button title={'Next'} onPress={() => setopenModal(true)} style={styles.button} />


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
        paddingHorizontal: 15
    },
    input_parent_style: {
        marginVertical: 10
    },
    text: {
        fontSize: 25,
        color: Colors?.PRIMARY,
        marginVertical: 2,
        fontFamily: Fonts?.SEMIBOLD
    },
    mainInput: {
        paddingVertical: 0,
        width: '95%',
        borderRadius: 10,
    },
    upload_image: {
        backgroundColor: Colors?.LIGHT,
        height: 120,
        width: 120,
        gap: 3,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 20
    },
    image_upload_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    uploaded_image: {
        width: 120,
        height: 120,
        borderRadius: 15,
        resizeMode: 'cover',
        marginLeft: 5,
        marginTop: 20
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
        marginHorizontal: 3
    }
})