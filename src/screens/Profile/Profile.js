import React from "react";
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../Config/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import perfil from '../../assets/images/profile.png'
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

    const navigation = useNavigation()
    const personalInfo = [
        {
            id: 1,
            label: 'Name',
            info: 'Marvie Jhon'
        },
        {
            id: 2,
            label: 'Email',
            info: 'marvie@gmail.com'
        },
        {
            id: 3,
            label: 'Contact Number',
            info: '0300 000 000'
        },
        {
            id: 4,
            label: 'Location',
            info: 'Los angeles , California'
        }
    ]

    const renderItem = ({ item }) => {
        return (
            <View style={styles.info_box}>
                <Text style={styles.label}>{item?.label}</Text>
                <Text style={styles.text}>{item?.info}</Text>
            </View>
        )
    }

    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.upper_view}>
                    <Header title={'Profile'} titleColor={Colors.WHITE} />
                    <Image source={perfil} style={styles.profile_image} />
                </View>
                <View style={styles.lower_view}>
                    <Text style={styles.heading}>Personal Information</Text>

                    <FlatList
                        data={personalInfo}
                        renderItem={renderItem}
                        keyExtractor={item => item?.id}
                    />

                    <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={()=> navigation.navigate('EditProfile') } >
                        <Text style={styles.button_text}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile;

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
    profile_image:{
        width: 125,
        borderRadius: 100,
        height: 125,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 30
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
        color: Colors.PRIMARY,
        fontSize: 12,
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
})