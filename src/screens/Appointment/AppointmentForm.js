import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from "react-native";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import { Colors } from "../../Config/Colors";
import AlternateImage from "../../assets/images/alternate.jpg";
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { AirbnbRating } from 'react-native-ratings';
import Input from "../../components/Input";
import ImagePicker from 'react-native-image-crop-picker';
import SuccessModal from "../../components/SuccessModal";
import { useNavigation } from "@react-navigation/native";

const AppointmentForm = (props) => {

    const routeData = props?.route?.params;
    const navigation = useNavigation();
    const [patient, setpatient] = useState()
    const [contactNo, setcontactNo] = useState()
    const [detail, setdetail] = useState()
    const [image, setimage] = useState()
    const [openModal, setopenModal] = useState(false)

    const DetailsCard = () => {
        return (
            <View style={styles.popular_card}>
                <Image source={routeData?.item?.image} style={styles.popular_image} />
                <View style={styles.popular_card_subview}>
                    <TouchableOpacity style={styles.heart}>
                        <Ionicons name={'ios-heart-outline'} size={23} color={Colors.DGREY} />
                    </TouchableOpacity>

                    <Text style={styles.text}>{routeData?.item?.name}</Text>
                    <Text style={styles.textx}>{routeData?.item?.category}</Text>
                    <Text style={[styles.textx, { color: Colors.PRIMARY }]}>{routeData?.item?.experience} Years experience</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 3 }}>
                        <AirbnbRating
                            isDisabled={true}
                            count={5}
                            defaultRating={routeData?.rating}
                            size={15}
                            selectedColor={Colors.ORANGE}
                            unSelectedColor={Colors.GREY}
                            showRating={false}
                        />
                        <Text style={[styles.textx, { fontWeight: "bold", color: Colors.PRIMARY }]}>Rs. {routeData?.item?.fees} /slot  </Text>
                    </View>
                </View>
            </View>
        )
    }

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
            <BgImage />
            <Header title={'Appointment'} />
            <ScrollView>
                <View style={styles.sub_container}>
                    <DetailsCard />

                    <Text style={[styles.text, { marginTop: 20, fontWeight: 500 }]}>Appointment For</Text>

                    <Input
                        placeholder={'Patient Name'}
                        value={patient}
                        onChangeText={(e) => setpatient(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />

                    <Input
                        placeholder={'Contact Number'}
                        value={contactNo}
                        onChangeText={(e) => setcontactNo(e)}
                        mainStyle={styles.mainInputx} style={styles.subInput} />

                    <Text style={[styles.text, { marginTop: 20, fontWeight: 500 }]}>Who is this patient ?</Text>

                    <Input
                        placeholder={'My Self , my Child , my Mother'}
                        value={detail}
                        onChangeText={(e) => setdetail(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />

                    <View style={styles.image_upload_view}>
                        <TouchableOpacity style={styles.upload_image} onPress={UploadImage}>
                            <Feather name={'plus'} size={50} color={Colors.PRIMARY} />
                            <Text style={{ color: Colors.PRIMARY }}>Add Image</Text>
                        </TouchableOpacity>

                        <Image source={image ? { uri: image?.uri } : AlternateImage} style={styles.uploaded_image} />
                    </View>

                    <TouchableOpacity onPress={() => setopenModal(true)} style={styles.button}>
                        <Text style={styles.button_text}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                <SuccessModal
                    children={
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.thumb_bg}>
                                <FontAwesome name={'thumbs-up'} color={Colors.PRIMARY} size={50} />
                            </View>
                            <Text style={[styles.text, { fontSize: 25, }]}>Thank you !</Text>
                            <Text style={{ marginBottom: 10, marginTop: 5, fontSize: 17 }}>Your appointment has been fixed</Text>
                            <Text style={styles.modal_message}>{`You booked an appointment with ${routeData?.item?.name} on ${routeData?.date?.day} at ${routeData?.timeSlot?.time}`}</Text>
                        </View>
                    }
                    OnClose={() => navigation.navigate('Home')}
                    close={true}
                    visible={openModal} />
            </ScrollView>
        </View>
    )
}

export default AppointmentForm;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold"
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
        paddingVertical: 10
    },
    popular_card: {
        width: '100%',
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        elevation: 2,
        marginHorizontal: 2,
        marginVertical: 8,
        padding: 15
    },
    popular_card_subview: {
        width: '70%',
        marginLeft: 15
    },
    popular_image: {
        width: 85,
        height: 85,
        borderRadius: 8,
        resizeMode: "cover"
    },
    heart: {
        position: "absolute",
        right: 18,
        top: 5
    },
    text: {
        fontSize: 18,
        color: Colors.BLACK,
        marginVertical: 2,
        fontWeight: "bold"
    },
    textx: {
        fontSize: 12
    },
    mainInput: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 15,
        backgroundColor: 'transparent',
        elevation: 0, borderWidth: 1,
        borderColor: Colors.GREY
    },
    mainInputx: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 15,
        backgroundColor: 'transparent',
        elevation: 0, borderWidth: 1,
        borderColor: Colors.GREY
    },
    subInput: {
        backgroundColor: 'transparent',
        fontSize: 14
    },
    upload_image: {
        backgroundColor: 'rgba(14,	190,	127,0.2)',
        paddingVertical: 30,
        width: '45%',
        borderRadius: 5,
        alignItems: "center"
    },
    image_upload_view: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    uploaded_image: {
        width: '45%',
        height: 130,
        borderRadius: 5,
        resizeMode: 'cover'
    },
    button: {
        borderRadius: 5,
        width: '90%',
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginTop: 40,
        marginVertical: 10
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
    },
    thumb_bg: {
        backgroundColor: 'rgba(14,	190,	127,0.1)',
        width: 120,
        height: 120,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 15
    },
    modal_message: { marginTop: 10, lineHeight: 20, fontSize: 13, textAlign: "center", margin: 26 }
})