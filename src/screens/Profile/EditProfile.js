import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import perfil from '../../assets/images/profile.jpg'
import { useNavigation } from "@react-navigation/native";
import Image from "../../components/Image";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Avatar from '../../assets/images/avatar.png'

const EditProfile = () => {

    const navigation = useNavigation()
    const [name, setname] = useState()
    const [contact, setcontact] = useState()
    const [address, setaddress] = useState()
    const [weight, setweight] = useState()
    const [height, setheight] = useState()

    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title={'Edit Profile'} back />

                <Image source={perfil ? perfil : Avatar} style={styles.profile_image} resizeMode={'cover'} />
                <TouchableOpacity style={styles.picker}>
                    <Icon name={'pencil'} type={IconTypes.Ionicons} size={18} color={Colors.PRIMARY} />
                </TouchableOpacity>

                <Input
                    label={'Name'}
                    value={name}
                    onChangeText={(e) => setname(e)}
                    parentStyle={styles.input} />

                <Input
                    label={'Contact No.'}
                    keyboardType={'number-pad'}
                    value={contact}
                    onChangeText={(e) => setcontact(e)}
                    parentStyle={styles.input} />

                <Input
                    label={'Address'}
                    value={address}
                    onChangeText={(e) => setaddress(e)}
                    parentStyle={styles.input}
                />

                <Input
                    label={'Weight'}
                    value={weight}
                    onChangeText={(e) => setweight(e)}
                    parentStyle={styles.input}
                />

                <Input
                    label={'Height'}
                    value={height}
                    onChangeText={(e) => setheight(e)}
                    parentStyle={styles.input}
                />


            </ScrollView>
            <Button title={'Save'} onPress={() => navigation.goBack()} style={{ marginBottom: 20 }} />

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