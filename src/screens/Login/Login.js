import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../Config/Colors";
import BgImage from "../../components/BgImage";
import logo from '../../assets/images/logo.png'
import google from '../../assets/images/google.png'
import fb from '../../assets/images/facebook.png'
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'

const Login = () => {

    const navigation = useNavigation();
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [visible, setvisible] = useState(true)

console.log(email, password);
    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>

                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Welcome Back !</Text>
                <Text style={styles.span}>Signin to Ease Health</Text>

                <Input
                    placeholder={'Enter email address'}
                    value={email}
                    onChangeText={(e) => setemail(e)}
                    mainStyle={styles.mainInput} style={styles.subInput} />

                <Input
                    icon={<Feather name={visible  ? 'eye-off' : 'eye'} size={20} color={Colors.PRIMARY} />}
                    onIconPress={()=> setvisible(!visible)}
                    secureTextEntry={visible}
                    placeholder={'Enter password'}
                    value={password}
                    onChangeText={(e) => setpassword(e)}
                    mainStyle={styles.mainInput} style={styles.subInput} />

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.button_text}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.link_text}>Forgot Passsword ?</Text>


                <View style={styles.flex_ultra}>
                    <TouchableOpacity style={styles.social_button} >
                        <Image source={google} style={styles.social_image} />
                        <Text style={styles.social_button_text}>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.social_button} >
                        <Image source={fb} style={styles.social_image} />
                        <Text style={styles.social_button_text}>Facebook</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={[styles.link_text, { marginTop: 40 }]}>Don’t have an account? Join us</Text>
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
        marginTop: 10,
        fontWeight: "bold",
    },
    span: {
        marginBottom: 20
    },
    link_text: {
        color: Colors.PRIMARY,
        alignSelf: "center"
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        marginTop: '45%'
    },
    flex: {
        flexDirection: "row",
        alignItems: "center"
    },
    flex_ultra: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 35
    },
    scrollview: {
        width: '90%',
        alignSelf: "center"
    },
    mainInput: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 8,
        backgroundColor: 'transparent',
        elevation: 0, borderWidth: 1,
        borderColor: Colors.GREY,
        borderRadius: 13
    },
    subInput: {
        backgroundColor: 'transparent',
        fontSize: 14
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
    social_button: {
        backgroundColor: Colors.WHITE,
        elevation: 1,
        borderRadius: 8,
        paddingVertical: 10,
        width: '40%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    social_button_text: {
        color: Colors.BLACK
    },

    social_image: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
})