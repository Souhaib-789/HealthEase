import React from "react";
import {  View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "../../Config/Colors";
import Header from "../../components/Header";
import perfil from '../../assets/images/profile.jpg'
import { useNavigation } from "@react-navigation/native";
import Image from "../../components/Image";
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import { Fonts } from "../../Config/Fonts";
import Button from "../../components/Button";
import Avatar from '../../assets/images/avatar.png'

const Profile = () => {

    const navigation = useNavigation()
    const personalInfo = [
        {
            id: 2,
            info: 'marvie@gmail.com',
            icon: <Icon name={'envelope-o'} type={IconTypes.FontAwesome} size={20} color={Colors.PRIMARY} />
        },
        {
            id: 3,
            icon: <Icon name={'phone'} type={IconTypes.AntDesign} size={20} color={Colors.PRIMARY} />,
            info: '0300 000 000'
        },
        {
            id: 4,
            icon: <Icon name={'location-pin'} type={IconTypes.SimpleLineIcons} size={20} color={Colors.PRIMARY} />,
            info: 'Los angeles , California'
        }
    ]

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 15, }}>
                <View style={{ borderRadius: 100, width: 42, height: 42, justifyContent: "center", alignItems: 'center', backgroundColor: Colors?.LIGHT_GREY }}>
                    {item?.icon}
                </View>
                    <TextComponent text={item?.info} style={{ fontSize: 12, color: Colors.DGREY }} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title={'Profile'} backIcon />

                <View style={styles.flex}>
                    <Image source={perfil ? perfil : Avatar} style={styles.profile_image} resizeMode={'cover'} />
                    <TextComponent text={'Andrew Ainsley'} style={styles.text} />
                </View>

                <TextComponent style={styles.heading} text={'Personal Information'} />

                <FlatList
                    data={personalInfo}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </ScrollView>
            <Button title={'Edit Profile'} onPress={() => navigation.navigate('EditProfile')} />

        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 15
    },
    text: {
         fontSize: 18, 
         width: '60%'
         },
    heading: {
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.BLACK
    },
    profile_image: {
        width: 110,
        borderRadius: 100,
        height: 110,
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        marginVertical: 20
    }
})