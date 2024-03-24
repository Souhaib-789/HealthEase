import { useNavigation } from "@react-navigation/native";
import React from "react";
import Image from "./Image";
import TextComponent from "./TextComponent";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../utilities/Colors";
import Icon, { IconTypes } from "./Icon";
import { Fonts } from "../utilities/Fonts";
import Button from "./Button";

const DoctorCard = ({ item, book, heart }) => {
    const navigation = useNavigation();


    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DoctorDetails', { item: item })}>
            <Image source={item?.image} style={styles.image} resizeMode={'cover'} />
            <View style={styles.subview}>
                <View style={styles.subview2}>
                    <TextComponent style={styles.text} text={item?.name} numberOfLines={1} />
                    {
                    heart &&
                        <Icon type={IconTypes.Ionicons} name={'heart-sharp'} color={Colors?.PRIMARY} size={20} />
                    }
                </View>
                <TextComponent style={styles.span} text={item?.category} />

                <View style={[styles.flex, { gap: 5 }]}>
                    <Icon name={'location'} type={IconTypes?.EvilIcons} size={18} color={Colors?.BLACK} />
                    <TextComponent style={styles.span} text={item?.hospital_name} />
                </View>

                <View style={styles.subview2}>
                    <View style={styles.flex}>
                        <Image source={require('../assets/images/star.png')}  style={{ width: 18, height: 18, marginRight: 3 }} />
                        <TextComponent style={styles.spanx} text={item?.rating + ' ( 50+ Reviews )'} />
                    </View>
                    {
                        book &&
                        <Button title={'Book Now'} onPress={() => navigation.navigate('DoctorDetails', { item: item })} style={styles.button} light text_style={{ fontSize: 10 }} />
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DoctorCard;


const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors?.WHITE,
        borderRadius: 12,
        width: '99%',
        elevation: 3,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 13,
    },
    text: {
        width: '55%',
        fontFamily: Fonts?.SEMIBOLD,
        fontSize: 15
    },
    subview: {
        width: '80%'
    },
    span: {
        color: Colors?.BLACK,
        fontSize: 12,
    },
    spanx: {
        color: Colors?.DDGREY,
        fontSize: 11,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    subview2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
    },
    flex: {
        flexDirection: "row",
        alignItems: 'center'
    },
    button: {
        width: '35%',
        paddingVertical: 5,
        alignSelf: 'flex-end',
        right: 5
    }
});