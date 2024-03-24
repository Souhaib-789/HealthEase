import React, { useState } from "react";
import {  View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utilities/Colors";
import logo from '../../assets/images/logo.png'
import google from '../../assets/images/google.png'
import fb from '../../assets/images/fb.png'
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Image from "../../components/Image";
import Button from "../../components/Button";
import { Fonts } from "../../utilities/Fonts";
import { hideLoading, showAlert, showLoading } from "../../redux/actions/GeneralAction";
import { Storage } from "../../utilities/AsyncStorage";
import { login, userData } from "../../redux/actions/AuthAction";
import { useDispatch } from "react-redux";

const Login = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setemail] = useState()
    const [password, setpassword] = useState()


    const onPressLogin = () => {
        if (!email) {
          dispatch(showAlert({ message: 'Please enter email' }))
        }
        else if (!password) {
          dispatch(showAlert({ message: 'Please enter password' }))
        }
        else {
          dispatch(showLoading())
          setTimeout(() => {
            Storage.set('@user', JSON.stringify({ email: email }));
            dispatch(userData({ email: email }));
            dispatch(login(true));
            dispatch(hideLoading())
          }, 1000)
    
        }
      };

    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>

                <Image source={logo} style={styles.logo} tintColor={Colors.PRIMARY} />
                <TextComponent style={styles.heading} text={'Welcome !'} />
                <TextComponent style={styles.span} text={'Sign into HealthEase'} />

                <Input
                    placeholder={'Enter email address'}
                    value={email}
                    onChangeText={(e) => setemail(e)}
                    mainStyle={styles.mainInput} />

                <Input
                    placeholder={'Enter password'}
                    isPassword
                    value={password}
                    onChangeText={(e) => setpassword(e)}
                    mainStyle={styles.mainInput} />

                <Button title={'Login'} onPress={onPressLogin} style={styles.button} />
                <TextComponent style={styles.link_text} text={'Forgot Passsword?'} />

                <View style={styles.flex_ultra}>
                    <TouchableOpacity style={styles.social_button} >
                        <Image source={google} style={styles.social_image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.social_button} >
                        <Image source={fb} style={styles.social_image} />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
                    <TextComponent style={styles.link_textx} text={'Don’t have an account? Create'} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 20,
        color: Colors.BLACK,
        fontFamily: Fonts.SEMIBOLD,
        marginTop: 10,
    },
    span: {
        marginBottom: 20
    },
    link_text: {
        fontSize: 11,
        color: Colors.DGREY,
        alignSelf: "flex-end"
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
    flex_ultra: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        alignSelf: "center",
        marginTop: 35
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
    social_button: {
        backgroundColor: Colors.WHITE,
        elevation: 2,
        borderRadius: 50,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    social_image: {
        width: 20,
        height: 20,
    },
})