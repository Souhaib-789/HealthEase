import { useNavigation } from "@react-navigation/native";
import React from "react";
import Image from "./Image";
import TextComponent from "./TextComponent";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../utilities/Colors";
import Icon, { IconTypes } from "./Icon";
import { Fonts } from "../utilities/Fonts";
import AVATAR from "../assets/images/avatar.png";
import moment from "moment";
import Skeleton from "./Skeleton";

const AppointCard = ({ item, screenType, loading }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AppointmentDetails', { item: item, screenType: screenType })}>
            {
                loading ?
                    <Skeleton style={styles.image} borderRadius={10} styles={{ width: '15%' }} />
                    :
                    <Image source={item?.docter?.image_url ? { uri: item?.docter?.image_url } : AVATAR} style={styles.image} resizeMode={'cover'} />
            }
              {
                loading ?
                    <View>
                        <Skeleton style={{ width: '60%', height: 18, borderRadius: 5 }} />
                        <Skeleton style={{ width: '40%', height: 10, borderRadius: 3 }} />
                        <Skeleton style={{ width: '75%', height: 8, borderRadius: 3 }} />
                        <Skeleton style={{ width: '40%', height: 8, borderRadius: 3 }} />
                    </View>
                    :
            <View style={styles.subview}>
                <View style={styles.wide_row}>
                    <TextComponent style={styles.text} text={item?.docter?.name ? item?.docter?.name : '--'} numberOfLines={1} />
                    {
                        screenType == 'completed' ?
                            <Icon name={'check-circle-fill'} type={IconTypes.Octicons} color={'#03C03C'} size={20} />
                            :
                            <Icon type={IconTypes.MaterialCommunityIcons} name={'clock-fast'} color={Colors?.PRIMARY} size={20} />
                    }
                </View>
                <TextComponent style={[styles.span, { color: Colors.BLACK }]} text={item?.docter?.specialization ? item?.docter?.specialization : '--'} />

                <View style={styles.flex}>
                    <View style={[styles.flex, { gap: 5 }]}>
                        <Icon type={IconTypes.Feather} name={'calendar'} size={12} color={Colors.GREY} />
                        <TextComponent style={styles.span} text={item?.date ? moment(item?.date).format('DD MMM YYYY') + '  |  ' : '--'} />
                    </View>
                    <View style={[styles.flex, { gap: 5 }]}>
                        <Icon type={IconTypes.SimpleLineIcons} name={'clock'} size={12} color={Colors.GREY} />
                        <TextComponent style={styles.span} text={item?.time ? moment(item?.time, 'hh : mm A').format('LT') : '--'} />
                    </View>
                </View>

                <View style={[styles.flex, { gap: 5 }]}>
                    <Icon type={IconTypes.SimpleLineIcons} name={'location-pin'} size={12} color={Colors.GREY} />
                    <TextComponent style={styles.span} text={item?.docter?.hospital?.user_name ? item?.docter?.hospital?.user_name : '--'} />
                </View>
            </View>
}
        </TouchableOpacity>
    )
}

export default AppointCard;


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
        // alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 13,
    },
    text: {
        width: '55%',
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
        width: 40,
        height: 40,
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
    },
    wide_row: {
        // width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});