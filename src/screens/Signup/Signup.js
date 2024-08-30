import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, PermissionsAndroid } from "react-native";
import { Colors } from "../../utilities/Colors";
import logo from '../../assets/images/logo.png'
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Image from "../../components/Image";
import Button from "../../components/Button";
import { Fonts } from "../../utilities/Fonts";
import Dropdown from "../../components/Dropdown";
import { useDispatch } from "react-redux";
import { AuthMiddleware } from "../../redux/middlewares/AuthMiddleware";
import { showAlert } from "../../redux/actions/GeneralAction";
import { validateEmail } from "../../utilities/Validators";
import Icon, { IconTypes } from "../../components/Icon";
import Geolocation from 'react-native-geolocation-service';
import { LocLoader } from "../../components/LocLoader";

const Signup = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [name, setname] = useState(null)
    const [email, setemail] = useState(null)
    const [contact, setcontact] = useState(null)
    const [address, setaddress] = useState(null)
    const [userRole, setuserRole] = useState(null)
    const [password, setpassword] = useState(null)
    const [confirmPassword, setconfirmPassword] = useState(null)
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);


    const onPressSignup = () => {
        if (!name) {
            dispatch(showAlert({ message: 'Please enter name' }))
        }
        else if (!email) {
            dispatch(showAlert({ message: 'Please enter email' }))
        }
        else if (!validateEmail(email)) {
            dispatch(showAlert({ message: 'Please enter valid email' }))
        }
        else if (!userRole) {
            dispatch(showAlert({ message: 'Please select user role' }))
        }
        else if (!contact) {
            dispatch(showAlert({ message: 'Please enter contact' }))
        }
        else if (userRole?.name == 'patient' && !address) {
            dispatch(showAlert({ message: 'Please enter address' }))
        }
        else if (!password) {
            dispatch(showAlert({ message: 'Please enter password' }))
        }
        else if (!confirmPassword) {
            dispatch(showAlert({ message: 'Please enter confirm password' }))
        }
        else if (password !== confirmPassword) {
            dispatch(showAlert({ message: 'Password does not match' }))
        }
        else if (userRole?.name == 'hospital' && !location) {
            dispatch(showAlert({ message: 'Please pick your current location' }))
        }
        else {
            let data = {
                name: name,
                email: email,
                contact: contact,
                user_role: userRole?.name,
                password: password,
                confirm_password: confirmPassword,
                lat: location?.latitude ? location?.latitude : undefined,
                lng: location?.longitude ? location?.longitude : undefined
            }
            dispatch(AuthMiddleware.signUp(data))
                .then(() => {
                    navigation.navigate('Login')
                })
                .catch((err) => {
                    console.log(err)
                })
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

    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>

                <Image source={logo} style={styles.logo} tintColor={Colors.PRIMARY} />
                <TextComponent style={styles.heading} text={'Create your account'} />


                <Input
                    placeholder={'Enter name'}
                    value={name}
                    onChangeText={(e) => setname(e)}
                    mainStyle={styles.mainInput} />

                <Input
                    placeholder={'Enter email address'}
                    value={email}
                    onChangeText={(e) => setemail(e)}
                    mainStyle={styles.mainInput} />

                <Dropdown
                    placeholder={'Select User Role'}
                    state={userRole}
                    array={[{ id: 1, name: 'patient' }, { id: 2, name: 'hospital' }]}
                    setState={(e) => setuserRole(e)}
                    style={{ marginBottom: 8 }}
                />

                <Input
                    placeholder={'Enter contact no.'}
                    value={contact}
                    onChangeText={(e) => setcontact(e)}
                    keyboardType={'number-pad'}
                    mainStyle={styles.mainInput} />

                <Input
                    placeholder={'Enter password'}
                    isPassword
                    value={password}
                    onChangeText={(e) => setpassword(e)}
                    mainStyle={styles.mainInput} />

                <Input
                    placeholder={'Confirm password'}
                    isPassword
                    value={confirmPassword}
                    onChangeText={(e) => setconfirmPassword(e)}
                    mainStyle={styles.mainInput} />

                {
                    userRole?.name === 'hospital' ?

                        <TouchableOpacity onPress={requestLocationPermission} style={{ backgroundColor: Colors.WHITE, shadowColor: Colors.PRIMARY, elevation: 5, borderRadius: 10, width: '98%', paddingVertical: 30, alignSelf: 'center', marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                            {
                                location?.latitude && location?.longitude ?
                                    <Icon name={'location-pin-lock'} type={IconTypes.FontAwesome6} size={30} color={Colors.PRIMARY} />
                                    :

                                    <Icon name={'location'} type={IconTypes.EvilIcons} size={40} color={Colors.PRIMARY} />
                            }
                            <TextComponent style={{ fontSize: 12, color: Colors.PRIMARY, marginTop: 10 }} text={location?.latitude && location?.longitude ? 'Location saved' : 'Tap to pick live location'} />
                        </TouchableOpacity>

                        : <Input
                            placeholder={'Enter address'}
                            value={address}
                            onChangeText={(e) => setaddress(e)}
                            mainStyle={styles.mainInput} />
                }

                <Button title={'Signup'} onPress={onPressSignup} style={styles.button} />

                <View style={styles.flex_ultra}>
                <TextComponent style={styles.link_text} text={'Already have an account?'} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <TextComponent style={styles.link_textx} text={'Login'} />
                </TouchableOpacity>
                </View>
            </ScrollView>
            <LocLoader visible={loading} />
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 18,
        color: Colors.BLACK,
        fontFamily: Fonts.SEMIBOLD,
        marginTop: 20,
        marginBottom: 15,
    },
   link_text: {
        fontSize: 11,
        color: Colors.DGREY,
    },
    link_textx: {
        fontSize: 11,
        color: Colors.DARK_BLUE,
        textDecorationLine: "underline",
    },
    logo: {
        width: 70,
        height: 70,
        alignSelf: "center",
        marginTop: '25%',
        marginBottom: 25
    },
    flex: {
        flexDirection: "row",
        alignItems: "center"
    },
    scrollview: {
        width: '90%',
        alignSelf: "center"
    },
    mainInput: {
        marginVertical: 10,
    },
    button: {
        marginTop: 40,
        marginVertical: 10
    },
    flex_ultra: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        alignSelf: "center",
        marginVertical: 15
    },

})