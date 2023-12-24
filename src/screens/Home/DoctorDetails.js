import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Pressable } from "react-native";
import BgImage from "../../components/BgImage";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { AirbnbRating } from 'react-native-ratings';
import Header from "../../components/Header";
import moment from "moment";
import { Colors } from "../../Config/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../Config/Fonts";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";

const DoctorDetails = (props) => {

    const navigation = useNavigation();
    const routeData = props?.route?.params?.item;
    const [confirmedSlot, setconfirmedSlot] = useState();
    const [currentDate, setcurrentDate] = useState(new Date());

    const Slots = [
        {
            id: 1,
            day: 'Today',
            slots: [
                {
                    id: 1,
                    time: '4:00 PM'
                },
                {
                    id: 2,
                    time: '4:30 PM'
                },
                {
                    id: 3,
                    time: '5:00 PM'
                },
                {
                    id: 4,
                    time: '5:30 PM'
                },

                {
                    id: 5,
                    time: '6:00 PM'
                },

                {
                    id: 6,
                    time: '6:30 PM'
                },

                {
                    id: 7,
                    time: '7:00 PM'
                },
                {
                    id: 8,
                    time: '7:30 PM'
                }]
        },
        {
            id: 2,
            day: 'Tomorrow',
            slots: []
        },
        {
            id: 3,
            day: 'Thursday',
            slots: [
                {
                    id: 1,
                    time: '4:00 PM'
                },
                {
                    id: 1,
                    time: '4:30 PM'
                },
                {
                    id: 1,
                    time: '5:00 PM'
                },
                {
                    id: 1,
                    time: '5:30 PM'
                },
            ]
        },
        {
            id: 4,
            day: 'Saturday',
            slots: [
                {
                    id: 1,
                    time: '4:00 PM'
                },
                {
                    id: 1,
                    time: '4:30 PM'
                },
            ]
        },
    ]

    const details = [
        {
            name: 'Reviews',
            no: '50 +',
            icon_name: 'star'
        },
        {
            name: 'Experience',
            no: '2+ Years',
            icon_name: 'tips-and-updates'
        },
        {
            name: 'per slot',
            no: '1000/-',
            icon_name: 'price-change'
        },
    ]

    console.log(routeData);
    const [date, setDate] = useState(Slots[0])


    const renderDatesItem = ({ item }) => {
        return (
            <Pressable style={[styles.option, { backgroundColor: item?.id == date?.id ? Colors.PRIMARY : 'transparent', borderWidth: item?.id == date?.id ? 0 : 1 }]}
                onPress={() => setDate(item)}>

                <Text style={[styles.text, { textAlign: "center", color: item?.id == date?.id ? Colors.WHITE : Colors.BLACK }]}
                >{item?.day}</Text>

                <Text style={[styles.textx, { color: item?.id == date?.id ? Colors.LGREY : Colors.DDGREY, fontSize: 10 }]}
                >{item?.slots?.length == 0 ? 'No' : item?.slots?.length} slots available</Text>
            </Pressable>
        )
    }

    const renderDetailsItem = (item, index) => {
        return (
            <View style={styles.flex}>
                <View style={{ backgroundColor: Colors?.LIGHT, padding: 8, borderRadius: 50, marginRight: 6 }}>
                    <Icon type={IconTypes?.MaterialIcons} name={item?.icon_name} size={16} color={Colors?.PRIMARY} />
                </View>
                <View>
                    <TextComponent style={[styles.textx, { fontFamily: Fonts?.SEMIBOLD, fontSize: 12, color: Colors?.BLACK }]} text={item?.no} />
                    <TextComponent style={[styles.textx, { color: Colors?.DGREY, fontSize: 10 }]} text={item?.name} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Header title={'Details'} backIcon style={{ margin: 10 }} titleColor={Colors?.WHITE} />
            <ScrollView>
                <Image source={routeData?.image} style={styles.card_image} />

                <View style={styles.details_card}>
                    <TouchableOpacity style={styles.heart}>
                        <Icon type={IconTypes.Ionicons} name={'heart-sharp'} color={Colors?.GREY} size={22} />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <TextComponent style={styles.text} text={routeData?.name} />
                        <TextComponent style={styles.textx} text={routeData?.category} />
                    </View>


                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 }}>
                        {details.map(renderDetailsItem)}
                    </View>

                    <TextComponent style={styles.heading} text={'Description'} />
                    <TextComponent style={styles.textx} text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} />

                    <TextComponent style={styles.heading} text={'Avaialibity'} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={Slots}
                    horizontal
                    renderItem={renderDatesItem}
                    keyExtractor={item => item?.id}
                />

                <Text style={[styles.heading , {alignSelf: 'center' , marginVertical: 8 , color: Colors?.PRIMARY}]}>{`Today , ${moment(currentDate).format('LL')}`} </Text>
                <TextComponent style={styles.heading} text={'Available Slots'} />

                <View style={styles.slots_view}>
                    {
                        date?.slots?.length == 0 ?
                            <Text style={[styles.textx, { marginLeft: '35%', marginTop: 10 }]}>No Slots Available</Text>
                            :
                            date?.slots?.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} 
                                    style={[styles.slot_box,
                                         { backgroundColor: item?.time == confirmedSlot?.time
                                             ? Colors.PRIMARY : Colors?.LIGHT }]}
                                        onPress={() => setconfirmedSlot(item)}>
                                        <TextComponent style={{ color: item?.time == confirmedSlot?.time ? Colors.WHITE : Colors.PRIMARY , fontSize: 10 }} text={item?.time} />
                                    </TouchableOpacity>
                                )
                            })
                    }
                </View>

                {
                    date?.slots?.length > 0 &&
                    <Button 
                    title={'Fix an appointment'}
                     disabled={confirmedSlot ? false : true}
                     style={{marginVertical: 15}}
                    onPress={() => navigation.navigate('Appointment', { item: routeData, timeSlot: confirmedSlot, date: date })} />
                }
                   </View>
            </ScrollView>
        </View>
    )
}

export default DoctorDetails;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
        paddingVertical: 10
    },
    headingx: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.BLACK
    },
    text: {
        fontSize: 18,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD
    },
    heading: {
        fontSize: 16,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD,
        marginTop: 10
    },
    span: {
        fontWeight: "bold"
    },
    textx: {
        fontSize: 12,
        color: Colors?.DGREY,
        lineHeight: 20
    },
    sub_heading: {
        fontSize: 18,
        color: Colors.WHITE
    },
    category_box: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 8,
        backgroundColor: 'rgba(14, 190, 127, 0.08)',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 10
    },
    category_text: {
        color: Colors.PRIMARY,
        fontSize: 14
    },
    next_available: {
        marginVertical: 10
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15
    },
    heart: {
        position: "absolute",
        right: 20,
        top: 20
    },
    details_card: {
        width: '100%',
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: Colors.WHITE,
        marginTop: 50,
        padding: 15,
        paddingTop: 60
    },
    popular_card_subview: {
        width: '70%',
        marginLeft: 15
    },
    card_image: {
        width: 100,
        borderColor: Colors?.WHITE,
        borderWidth: 5,
        height: 100,
        borderRadius: 100,
        zIndex: 99,
        position: "absolute",
        alignSelf: 'center'
    },

    option: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.GREY,
        alignItems: "center",
        marginHorizontal: 8,
        marginVertical: 15,
        paddingHorizontal: 20,
        paddingVertical: 7,
    },
    button: {
        borderRadius: 5,
        width: '90%',
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginTop: 20
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
    },
    slot_box: {
        width: 70,
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    },
    slots_view: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10
    }
})