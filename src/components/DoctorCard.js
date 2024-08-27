import { useNavigation } from "@react-navigation/native";
import React from "react";
import Image from "./Image";
import TextComponent from "./TextComponent";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../utilities/Colors";
import Icon, { IconTypes } from "./Icon";
import { Fonts } from "../utilities/Fonts";
import Button from "./Button";
import AVATAR from '../assets/images/avatar.png'
import { useDispatch } from "react-redux";
import { getDoctorDetails } from "../redux/actions/DoctorsActions";
import Skeleton from "./Skeleton";
import { isUrduLanguage } from "../utilities/Utilities";

const DoctorCard = ({ item, book, heart, style, loading }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    return (
        <TouchableOpacity disabled={loading} style={[styles.card, { ...style }]} onPress={() => {
            dispatch(getDoctorDetails(item))
            navigation.navigate('DoctorDetails')
        }}>
            {
                loading ?
                    <Skeleton style={styles.image} styles={{ width: '22%' }} />
                    :
                    <Image source={item?.image_url ? { uri: item?.image_url } : AVATAR} style={styles.image} resizeMode={'cover'} />
            }

            {
                loading ?
                    <View>
                        <Skeleton style={{ width: '60%', height: 18, borderRadius: 5 }} />
                        <Skeleton style={{ width: '40%', height: 10, borderRadius: 3 }} />
                        <Skeleton style={{ width: '50%', height: 6, borderRadius: 3 }} />
                        <Skeleton style={{ width: '40%', height: 6, borderRadius: 3 }} />
                    </View>
                    :
                    <View style={styles.subview}>
                        <View style={styles.subview2}>

                            <TextComponent style={styles.text} text={item?.name} numberOfLines={1} />

                            {
                                heart &&
                                <Icon type={IconTypes.Ionicons} name={'heart-sharp'} color={Colors?.PRIMARY} size={20} />
                            }
                        </View>
                        <TextComponent style={[styles.span, { color: Colors.BLACK, alignSelf: 'flex-start' }]} text={item?.specialization ? item?.specialization : '--'} />

                        <View style={[styles.flex, { gap: 5 }]}>
                            <Icon name={'location'} type={IconTypes?.EvilIcons} size={16} color={Colors?.DDGREY} />
                            <TextComponent style={styles.span} text={item?.hospital?.user_name ? item?.hospital?.user_name : '--'} />
                        </View>

                        <View style={styles.subview2}>
                            <View style={styles.flex}>
                                <Image source={require('../assets/images/star.png')} style={{ width: 18, height: 18, marginRight: 3 }} />
                                <TextComponent style={styles.spanx} text={item?.rating ? item?.rating : 0 + ' Reviews'} />
                            </View>
                            {
                                book &&
                                <Button title={'Book Now'} onPress={() => {
                                    dispatch(getDoctorDetails(item))
                                    navigation.navigate('DoctorDetails')
                                }} style={styles.button} light text_style={{ fontSize: 10 }} />
                            }
                        </View>
                    </View>
            }
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
        width: '60%',
        fontFamily: Fonts?.SEMIBOLD,
        fontSize: 14
    },
    subview: {
        width: '80%'
    },
    span: {
        color: Colors?.DDGREY,
        fontSize: 11,
    },
    spanx: {
        color: Colors?.DDGREY,
        fontSize: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
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