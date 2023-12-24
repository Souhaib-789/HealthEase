import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../Config/Colors";
import BgImage from "../../components/BgImage";
import logo from '../../assets/images/logo.png'
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'

const Signup = () => {

    const navigation = useNavigation();
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()
    const [password, setpassword] = useState()
    const [confirmedPassword, setconfirmedPassword] = useState()
    const [visible, setvisible] = useState(true)
    const [visiblex, setvisiblex] = useState(true)


    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>

                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Hello there !</Text>
                <Text style={styles.span}>create your account</Text>

                <Input
                    placeholder={'Enter your name'}
                    value={name}
                    onChangeText={(e) => setname(e)}
                    mainStyle={styles.mainInput} style={styles.subInput} />
                <Input
                    placeholder={'Enter email address'}
                    value={email}
                    onChangeText={(e) => setemail(e)}
                    mainStyle={styles.mainInput} style={styles.subInput} />

                <Input
                    placeholder={'Enter contact number'}
                    value={phone}
                    keyboardType={'numeric'}
                    onChangeText={(e) => setphone(e)}
                    mainStyle={styles.mainInput} style={styles.subInput} />

                <Input
                    placeholder={'Enter password'}
                    value={password}
                    onChangeText={(e) => setpassword(e)}
                    icon={<Feather name={visible ? 'eye-off' : 'eye'} size={20} color={Colors.PRIMARY} />}
                    onIconPress={() => setvisible(!visible)}
                    secureTextEntry={visible}
                    mainStyle={styles.mainInput} style={styles.subInput} />

                <Input
                    placeholder={'Confirm pasword'}
                    value={confirmedPassword}
                    onChangeText={(e) => setconfirmedPassword(e)}
                    icon={<Feather name={visiblex ? 'eye-off' : 'eye'} size={20} color={Colors.PRIMARY} />}
                    onIconPress={() => setvisiblex(!visiblex)}
                    secureTextEntry={visible}
                    mainStyle={styles.mainInput} style={styles.subInput} />

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.button_text}>Signup</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link_text}>Have an account ? Login</Text>
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
        marginTop: '10%'
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
})