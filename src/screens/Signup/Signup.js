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

const Signup = () => {

    const navigation = useNavigation();
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()


    const onPressSignup = () => {
        navigation.navigate('Signup')
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
        marginVertical: 10,
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