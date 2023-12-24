import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Pressable } from "react-native";
import BgImage from "../../components/BgImage";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { AirbnbRating } from 'react-native-ratings';
import Header from "../../components/Header";
import moment from "moment";
import { Colors } from "../../Config/Colors";

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
console.log(routeData);
    const [date, setDate] = useState(Slots[0])
    const DetailsCard = () => {
        return (
            <View style={styles.popular_card}>
                <Image source={routeData?.image} style={styles.popular_image} />
                <View style={styles.popular_card_subview}>
                    <TouchableOpacity style={styles.heart}>
                        <Ionicons name={'ios-heart-outline'} size={23} color={Colors.DGREY} />
                    </TouchableOpacity>

                    <Text style={styles.text}>{routeData?.name}</Text>
                    <Text style={styles.textx}>{routeData?.category}</Text>
                    <Text style={[styles.textx, { color: Colors.PRIMARY }]}>{routeData?.experience} Years experience</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 3 }}>
                        <AirbnbRating
                            isDisabled={true}
                            count={5}
                            defaultRating={routeData?.rating}
                            size={15}
                            selectedColor={Colors.ORANGE}
                            unSelectedColor={Colors.GREY}
                            showRating={false}
                        />
                        <Text style={[styles.textx, { fontWeight: "bold", color: Colors.PRIMARY }]}>Rs. {routeData?.fees} /slot  </Text>
                    </View>
                </View>
            </View>
        )
    }

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

    return (
        <View style={styles.mainContainer}>
            <BgImage />
            <Header title={'Details'} />
            <ScrollView>
                <View style={styles.sub_container}>

                    <DetailsCard />

                    <Text style={styles.text}>Availability</Text>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={Slots}
                        horizontal
                        renderItem={renderDatesItem}
                        keyExtractor={item => item?.id}
                    />

                    <Text style={[styles.text, { alignSelf: 'center', marginVertical: 10 }]}>{`Today , ${moment(currentDate).format('LL')}`} </Text>
                    <Text style={[styles.text, { marginTop: 20 }]}>Available Slots</Text>

                    <View style={styles.slots_view}>
                        {
                            date?.slots?.length == 0 ?
                                <Text style={[styles.textx, { marginLeft: '35%', marginTop: 10 }]}>No Slots Available</Text>
                                :
                                date?.slots?.map((item, index) => {
                                    return (
                                        <Pressable key={index} style={[styles.slot_box, { backgroundColor: item?.time == confirmedSlot?.time ? Colors.PRIMARY : 'rgba(14,	190,	127, 0.1)' }]}
                                            onPress={() => setconfirmedSlot(item)}>
                                            <Text style={{ fontWeight: "bold", color: item?.time == confirmedSlot?.time ? Colors.WHITE : Colors.PRIMARY }}>{item?.time}</Text>
                                        </Pressable>
                                    )
                                })
                        }
                    </View>

                    {
                        date?.slots?.length > 0 ?
                            <TouchableOpacity disabled={confirmedSlot ? false : true}
                                onPress={() => navigation.navigate('Appointment', { item: routeData, timeSlot: confirmedSlot, date: date })}
                                style={[styles.button, { opacity: confirmedSlot ? 'none' : 0.5 }]}>
                                <Text style={styles.button_text}>Fix an appointment</Text>
                            </TouchableOpacity>
                            : null
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
        backgroundColor: Colors.WHITE,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
        paddingVertical: 10
    },
    heading: {
        fontSize: 20,
        color: Colors.WHITE,
        fontWeight: "bold"
    },
    headingx: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.BLACK
    },
    text: {
        fontSize: 18,
        color: Colors.BLACK,
        marginVertical: 2,
        fontWeight: "bold"
    },
    span: {
        fontWeight: "bold"
    },
    textx: {
        fontSize: 12
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
        backgroundColor: 'blue',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    heart: {
        position: "absolute",
        right: 18,
        top: 5
    },
    popular_card: {
        width: '100%',
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        elevation: 2,
        marginHorizontal: 2,
        marginVertical: 8,
        padding: 15
    },
    popular_card_subview: {
        width: '70%',
        marginLeft: 15
    },
    popular_image: {
        width: 85,
        height: 85,
        borderRadius: 8,
        resizeMode: "cover"
    },

    option: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.GREY,
        alignItems: "center",
        // width: '50%',
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
        width: 95,
        paddingVertical: 15,
        borderRadius: 7,
        backgroundColor: 'rgba(14,	190,	127, 0.1)',
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