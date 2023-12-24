import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../Config/Colors";
import Header from "../../components/Header";
import perfil from '../../assets/images/person.png'
import camIcon from '../../assets/images/cam.png'
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import BgImage from "../../components/BgImage";
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = () => {

    const navigation = useNavigation()
    const [name, setname] = useState()
    const [contact, setcontact] = useState()
    const [location, setlocation] = useState()
    const [image, setimage] = useState()

    

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
            <ScrollView showsVerticalScrollIndicator={false}>

                <Header title={'Edit Profile'} />
                <View style={styles.lower_view}>
                    <View>
                        <Image source={image ? {uri: image?.uri} : perfil} style={styles.profile_image} />
                        <TouchableOpacity style={styles.icon} onPress={UploadImage}>
                            <Image source={camIcon} style={styles.icon_image} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Your Name :</Text>
                    <Input
                        value={name}
                        onChangeText={(e) => setname(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />


                    <Text style={styles.label}>Contact Number :</Text>
                    <Input
                        value={contact}
                        onChangeText={(e) => setcontact(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />


                    <Text style={styles.label}>Location :</Text>
                    <Input
                        value={location}
                        onChangeText={(e) => setlocation(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />



                    <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => navigation.goBack()} >
                        <Text style={styles.button_text}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 10,
        color: Colors.BLACK
    },
    profile_image: {
        width: 125,
        borderRadius: 100,
        height: 125,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 30
    },
    icon: {
        position: "absolute",
        top: 100,
        left: 190,
    },
    icon_image: {
        width: 35,
        height: 35,
        resizeMode: "contain",
    },
    upper_view: {
        backgroundColor: Colors.PRIMARY,
        borderBottomEndRadius: 40,
        borderBottomLeftRadius: 40
    },
    lower_view: {
        width: '90%',
        alignSelf: "center"
    },
    info_box: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 5,
        elevation: 1,
        margin: 5,
        marginVertical: 8,
        padding: 10
    },
    label: {
        color: Colors.BLACK,
        fontSize: 15,
        fontWeight: 700
    },
    text: {
        fontSize: 16,
        color: Colors.DDGREY,
        marginVertical: 3
    },
    button: {
        borderRadius: 5,
        width: '80%',
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
    mainInput: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 8,
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomColor: Colors.DDGREY,
        borderBottomWidth: 1,
        borderRadius: 0
    },
    subInput: {
        backgroundColor: 'transparent',
        fontSize: 14,
        margin: 0,
        padding: 0,
        color: Colors.WHITE
    },
})