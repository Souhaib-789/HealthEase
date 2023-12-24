import { useNavigation } from "@react-navigation/native";
import React from "react";
import Image from "./Image";
import TextComponent from "./TextComponent";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../Config/Colors";
import Icon, { IconTypes } from "./Icon";
import { Rating } from 'react-native-ratings';

const DoctorCard = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DoctorDetails', { item: item })}>
            <Image source={item?.image} style={styles.image} />
            <View style={styles.subview}>
                <View style={styles.subview2}>
                    <TextComponent style={styles.text} text={item?.name} numberOfLines={1} />

                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                        {
                            Array(item?.rating).map((x, index) => {
                                return (
                                    <Image key={index} t source={require('../assets/images/star.png')} style={{ width: 15, height: 15 }} />
                                )
                            })
                        }
                    </View>

                </View>
                <TextComponent style={styles.span} text={item?.category} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Icon name={'location'} type={IconTypes?.EvilIcons} size={18} color={Colors?.DDGREY} />
                    <TextComponent style={styles.span} text={item?.hospitalName} />
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
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 13,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
    text: {
        width: '60%',
    },
    subview: {
        gap: 1
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
        width: '83%',
    }
});