import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, PermissionsAndroid } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import HOSPITAL from '../../assets/images/hospital.png'
import Image from "../../components/Image";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ImageCropPicker from "react-native-image-crop-picker";
import { AuthMiddleware } from "../../redux/middlewares/AuthMiddleware";
import Geolocation from 'react-native-geolocation-service';
import { showAlert } from "../../redux/actions/GeneralAction";
import TextComponent from "../../components/TextComponent";
import { LocLoader } from "../../components/LocLoader";
import { Fonts } from "../../utilities/Fonts";

const HospitalEditProfile = () => {
    const navigation = useNavigation()
    const USER = useSelector(state => state.AuthReducer?.user);
    const dispatch = useDispatch()

    const [name, setName] = useState(USER?.user_name ? USER?.user_name : '')
    const [contact, setContact] = useState(USER?.phone_number ? USER?.phone_number : '')
    const [image, setImage] = useState(null)
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(false)

    const onUploadPicture = () => {
        try {
            ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                // cropping: true,
            }).then(image => {
                let splitPath = image?.path?.split("/")
                let filename = splitPath[splitPath?.length - 1]
                setImage({
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

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            //   console.log('granted', granted);
            if (granted === 'granted') {
                getLocation();
                return true;
            } else {
                // console.log('You cannot use Geolocation');
                dispatch(showAlert({ message: 'Permission denied!' }))
                return false;
            }
        } catch (err) {
            dispatch(showAlert({ message: 'Location access permission denied!' }))
            return false;
        }
    }


    const getLocation = async () => {

        setLoading(true);
        Geolocation.getCurrentPosition(
            position => {
                setLocation({ latitude: position?.coords?.latitude, longitude: position?.coords?.longitude });
                setLoading(false);
                dispatch(showAlert({ message: 'Location saved!' }))
            },
            error => {
                console.log(error);
                setLocation(false);
                setLoading(false);
                dispatch(showAlert({ message: 'Something went wrong' }))
            },
            {
                enableHighAccuracy: true,
                // timeout: 15000, maximumAge: 10000
            },
        );

    };

    const onPressUpdateProfile = () => {
        if (!name || name =='') {
            dispatch(showAlert({ message: 'Name is required!' }))
        }
        else if (!contact) {
            dispatch(showAlert({ message: 'Contact is required!' }))
        }
        else {
            const data = {
                name: name ? name : null,
                contact: contact ? contact : null,
                image: image ? image : null,
                lat: location?.latitude ? location?.latitude : USER?.address?.lat ? USER?.address?.lat : undefined,
                lng: location?.longitude ? location?.longitude : USER?.address?.lng ? USER?.address?.lng : undefined
            }
            dispatch(AuthMiddleware.onUpdateProfile(data))
                .then(() => {
                    navigation.goBack()
                })
                .catch(e => {
                    console.log('===>', e)

                })
        }
    }



    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title={'Edit Profile'} back />

                <Image source={image?.uri ? { uri: image?.uri } : USER?.image ? { uri: USER?.image } : HOSPITAL} resizeMode={USER?.image ? 'cover' : 'contain'} style={{ width: '90%', marginVertical: 20, alignSelf: 'center', height: 130, borderRadius: 10 }} />

                <TouchableOpacity style={styles.picker} onPress={onUploadPicture}>
                    <Icon name={'pencil'} type={IconTypes.Ionicons} size={15} color={Colors.PRIMARY} />
                </TouchableOpacity>

                <Input
                    label={'Name'}
                    value={name}
                    onChangeText={(e) => setName(e)}
                    placeholder='Enter hospital name'

                    parentStyle={styles.input} />

                <Input
                    label={'Contact No.'}
                    keyboardType={'number-pad'}
                    value={contact}
                    onChangeText={(e) => setContact(e)}
                    placeholder='Enter hospital contact'

                    parentStyle={styles.input} />

                <TextComponent style={{ fontSize: 12, marginTop: 15, marginLeft: 20, fontFamily: Fonts.MEDIUM }} text={'Change location'} />
                <TouchableOpacity onPress={requestLocationPermission} style={{ backgroundColor: Colors.WHITE, shadowColor: Colors.PRIMARY, elevation: 5, borderRadius: 10, width: '90%', paddingVertical: 30, alignSelf: 'center', marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        location?.latitude && location?.longitude ?
                            <Icon name={'location-pin-lock'} type={IconTypes.FontAwesome6} size={30} color={Colors.PRIMARY} />
                            :

                            <Icon name={'location'} type={IconTypes.EvilIcons} size={40} color={Colors.PRIMARY} />
                    }
                    <TextComponent style={{ fontSize: 12, color: Colors.PRIMARY, marginTop: 10 }} text={location?.latitude && location?.longitude ? 'Location saved' : 'Tap to save your live location'} />
                </TouchableOpacity>

            </ScrollView>
            <Button title={'Save'} onPress={onPressUpdateProfile} style={{ marginBottom: 20 }} />
            <LocLoader visible={loading} />
        </View>
    )
}

export default HospitalEditProfile;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    input: {
        marginTop: 8,
        width: '90%',
        alignSelf: 'center'
    },
    picker: {
        backgroundColor: Colors?.WHITE,
        elevation: 5,
        padding: 5,
        borderRadius: 100,
        position: 'absolute',
        right: 27,
        top: 170
    },
})