import { useNavigation } from "@react-navigation/native";
import React from "react";
import Image from "./Image";
import TextComponent from "./TextComponent";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../Config/Colors";
import Icon, { IconTypes } from "./Icon";
import { Fonts } from "../Config/Fonts";

const DoctorCard = ({ item }) => {
    const navigation = useNavigation();
    let rating = item?.rating == 5 ? [1, 2, 3, 4, 5]
        : item?.rating == 4 ? [1, 2, 3, 4]
            : item?.rating == 3 ? [1, 2, 3]
                : item?.rating == 2 ? [1, 2]
                    : item?.rating == 1 ? [1]
                        : []

    const ratingItem = (x, index) => {
        return (
            <Image key={index} source={require('../assets/images/star.png')} style={{ width: 15, height: 15 }} />
        )
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DoctorDetails', { item: item })}>
            <Image source={item?.image} style={styles.image} resizeMode={'cover'} />
            <View style={styles.subview}>
                <View style={styles.subview2}>
                    <TextComponent style={styles.text} text={item?.name} numberOfLines={1} />

                    <View style={styles.flex}>
                        {rating.map(ratingItem)}
                    </View>

                </View>
                <TextComponent style={styles.span} text={item?.category} />
                <View style={[styles.flex, { gap: 5 }]}>
                    <Icon name={'location'} type={IconTypes?.EvilIcons} size={18} color={Colors?.DDGREY} />
                    <TextComponent style={styles.span} text={item?.hospital_name} />
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
        fontFamily: Fonts?.SEMIBOLD
    },
    subview: {
        gap: 1,
        width: '80%'
    },
    span: {
        color: Colors?.DDGREY,
        fontSize: 12,
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
    flex: { flexDirection: "row", alignItems: 'center' }
});