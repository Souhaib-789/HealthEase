import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import perfil from '../../assets/images/profile.png'
import Image from "../../components/Image";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Avatar from '../../assets/images/avatar.png'
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ImageCropPicker from "react-native-image-crop-picker";
import { AuthMiddleware } from "../../redux/middlewares/AuthMiddleware";

const EditProfile = () => {
    const navigation = useNavigation()
    const USER = useSelector(state => state.AuthReducer?.user);
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: USER?.user_name ? USER?.user_name : null,
        contact: USER?.phone_number ? USER?.phone_number : null,
        address: USER?.address ? USER?.address : null,
        image: undefined
    })

    console.log('====================================');
    console.log('USER', JSON.stringify(USER, null, 8));
    console.log('====================================');

    const onUploadPicture = () => {
        try {
            ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                let splitPath = image?.path?.split("/")
                let filename = splitPath[splitPath?.length - 1]
                setFormData({
                    ...formData,
                    image: {
                        uri: Platform.OS == 'ios' ? image?.path.replace("file://", "/") : image?.path,
                        name: filename,
                        size: image?.size,
                        type: image?.mime,
                    }
                });
            }).catch(e => {
                console.log('===>', e);
            });
        } catch (e) {
            console.log('===>', e)
        }
    }


    const onPressUpdateProfile = () => {
        const data = {
            name: formData.name,
            contact: formData.contact,
            address: formData.address,
            image: formData.image,
            lat: USER?.lat ? USER?.lat : null,
            lng: USER?.lng ? USER?.lng : null
        }
        dispatch(AuthMiddleware.onUpdateProfile(data))
        .then(() => {
            navigation.goBack()
        })
        .catch(e => {
            console.log('===>', e)
            
        })
    }

    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title={'Edit Profile'} back />

                <Image source={USER?.image_url ? { uri: USER?.image_url } : Avatar} style={styles.profile_image} resizeMode={'cover'} />
                <TouchableOpacity style={styles.picker} onPress={onUploadPicture}>
                    <Icon name={'pencil'} type={IconTypes.Ionicons} size={18} color={Colors.PRIMARY} />
                </TouchableOpacity>

                <Input
                    label={'Name'}
                    value={
                        formData.name
                    }
                    onChangeText={(e) =>
                        setFormData({
                            ...formData,
                            name: e
                        })
                    }
                    placeholder={'Enter your name'}
                    parentStyle={styles.input} />

                <Input
                    label={'Contact No.'}
                    keyboardType={'number-pad'}
                    placeholder={'Enter your contact number'}
                    value={
                        formData.contact
                    }
                    onChangeText={(e) =>
                        setFormData({
                            ...formData,
                            contact: e
                        })
                    }
                    parentStyle={styles.input} />

                <Input
                    label={'Address'}
                    placeholder={'Enter your address'}
                    value={
                        formData.address
                    }
                    onChangeText={(e) =>
                        setFormData({
                            ...formData,
                            address: e
                        })
                    }
                    parentStyle={styles.input}
                />

            </ScrollView>
            <Button title={'Save'} onPress={onPressUpdateProfile} style={{ marginBottom: 20 }} />

        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    input: {
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center'
    },
    picker: {
        backgroundColor: Colors?.WHITE,
        elevation: 5,
        padding: 5,
        borderRadius: 100,
        position: 'absolute',
        left: 80,
        top: 130,
    },
    profile_image: {
        width: 80,
        borderRadius: 100,
        height: 80,
        marginBottom: 25,
        marginTop: 20,
        marginLeft: 20
    },
})