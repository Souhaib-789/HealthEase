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
import TextComponent from "../../components/TextComponent";
import Button from "../../components/Button";

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
            <Header title={'Appointment'} backIcon />
            <ScrollView>

                <Input
                    label={'Patient Name'}
                    value={patient}
                    onChangeText={(e) => setpatient(e)}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <Input
                    label={'Contact Number'}
                    value={contactNo}
                    onChangeText={(e) => setcontactNo(e)}
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
                                <Feather name={'plus'} size={30} color={Colors.PRIMARY} />
                                <TextComponent style={{ color: Colors.PRIMARY, fontSize: 12 }} text={'Add Image'} />
                            </TouchableOpacity>
                    }

                <Button title={'Next'} onPress={() => setopenModal(true)}  style={styles.button} />
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
        paddingHorizontal: 15
    },
    input_parent_style: {
        marginVertical: 10
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
        paddingVertical: 0,
        width: '95%',
        borderRadius: 10,
    },
    // mainInputx: {
    //     width: '100%',
    //     alignSelf: 'center',
    //     marginBottom: 15,
    //     backgroundColor: 'transparent',
    //     elevation: 0, borderWidth: 1,
    //     borderColor: Colors.GREY
    // },

    upload_image: {
        backgroundColor: Colors?.LIGHT,
        height: 100,
        width: 100,
        gap: 3,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5
    },
    image_upload_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    uploaded_image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        resizeMode: 'cover',
        marginLeft: 5
    },
    button: {
    
        marginTop: 20
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