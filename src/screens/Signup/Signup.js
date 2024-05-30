import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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

const Signup = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [contact, setcontact] = useState()
    const [address, setaddress] = useState()
    const [userRole, setuserRole] = useState()
    const [password, setpassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()


    const onPressSignup = () => {
        if (!name) {
            dispatch(showAlert({ message: 'Please enter name' }))
        }
        else if (!email) {
            dispatch(showAlert({ message: 'Please enter email' }))
        }
        else if(!validateEmail(email)){
            dispatch(showAlert({ message: 'Please enter valid email' }))
        }
        else if (!userRole) {
            dispatch(showAlert({ message: 'Please select user role' }))
        }
        else if (!contact) {
            dispatch(showAlert({ message: 'Please enter contact' }))
        }
        else if (!address) {
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
        else {
            let data = {
                name: name,
                email: email,
                contact: contact,
                address: address,
                user_role: userRole?.name,
                password: password,
                confirm_password: confirmPassword
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
                    placeholder={'Enter address'}
                    value={address}
                    onChangeText={(e) => setaddress(e)}
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

                <Button title={'Signup'} onPress={onPressSignup} style={styles.button} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <TextComponent style={styles.link_textx} text={'Already have an account? Login'} />
                </TouchableOpacity>
            </ScrollView>
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
    link_textx: {
        fontSize: 11,
        marginTop: 30,
        color: Colors.DGREY,
        alignSelf: "center"
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

})