import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import docC from "../../assets/images/doc3.png";
import docF from "../../assets/images/doc9.jpg";
import docD from "../../assets/images/doc4.png";
import docE from "../../assets/images/doc5.png";
import { Colors } from "../../Config/Colors";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Fonts } from "../../Config/Fonts";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import DoctorCard from "../../components/DoctorCard";

const Home = () => {
    const navigation = useNavigation();
    const [search, setsearch] = useState();
    const Featured = [
        {
            id: 1,
            image: docC,
            name: 'Dr. Crick',
            fees: '2500',
            rating: 5,
            hearted: false,
            category: 'Medicine Specialist',
            hospital_name: 'City Hospital',
            experience: 5,
        },
        {
            id: 2,
            image: docD,
            name: 'Dr. Strain',
            fees: '2200',
            rating: 3,
            hearted: true,
            category: 'Dentist ',
            hospital_name: 'City Hospital',
            experience: 3,
        },
        {
            id: 3,
            image: docE,
            name: 'Dr. Lachinet',
            fees: '2900',
            rating: 2,
            hearted: false,
            category: 'Physio Therapy Specialist',
            hospital_name: 'City Hospital',
            experience: 5,
        }
    ]

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >

                <View style={styles.home_header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather name='menu' size={23} color={Colors.BLACK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bell_icon}>
                    <Icon type={IconTypes.MaterialCommunityIcons} name={'bell-outline'} size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.mV}>
                    <TextComponent style={styles.sub_heading} text={'Good Morning !'} />
                    <TextComponent style={styles.heading} text={'Andrew Ainsley'} />
                </View>

                <View style={styles.sub_container}>
                    <TextComponent style={styles.sub_container_heading} text={'How are you feeling today ?'} />

                    <Input
                        placeholder={'Search'}
                        value={search}
                        search
                        onChangeText={(e) => setsearch(e)}
                        mainStyle={styles.search_input} />


                    <View style={styles.flex}>
                        <TextComponent style={styles.headingx} text={'Upcoming Appointments'} />
                        <TouchableOpacity onPress={() => navigation.navigate('Doctors')}>
                            <TextComponent text={'See all '} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('DoctorDetails')}>
                        <View style={styles.Appointment_card} >
                            <View style={styles.appointment_card_subview1}>
                                <View style={styles.appointment_card_subview2}>
                                    <Image source={docF} style={styles.Appointment_image} />
                                    <View>
                                        <TextComponent style={[styles.appointment_card_text, { fontFamily: Fonts?.SEMIBOLD }]} text={'Dr. Kelvin Oswald'} />
                                        <TextComponent style={styles.appointment_card_span} text={'Dentist'} />
                                    </View>
                                </View>
                                <Icon type={IconTypes.MaterialIcons} name={'keyboard-arrow-right'} size={25} color={Colors.WHITE} />
                            </View>

                            <View style={styles.appointment_card_subview3}>
                                <View style={styles.appointment_card_subview4}>
                                    <Icon type={IconTypes.Feather} name={'calendar'} size={15} color={Colors.WHITE} />
                                    <TextComponent style={styles.appointment_card_span} text={'23 Oct 2023'} />
                                </View>
                                <View style={styles.appointment_card_subview4}>
                                    <Ionicons name='time-outline' color={Colors.WHITE} size={15} />
                                    <TextComponent style={styles.appointment_card_span} text={'12:00 AM'} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    key={'Featured Doctors'}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={[styles.flex, styles.mV]}>
                            <TextComponent style={styles.headingx} text={'Find your doctor'} />
                            <TouchableOpacity onPress={() => navigation.navigate('Doctors')}>
                                <TextComponent text={'See all'} />
                            </TouchableOpacity>
                        </View>
                    )}
                    data={Featured}
                    decelerationRate={'fast'}
                    renderItem={({ item }) =>
                    (<DoctorCard item={item}/>)}
                    ListEmptyComponent={<ListEmptyComponent text={'no doctors found'} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
        padding: 15
    },
    mV: {
        marginVertical: 10
    },
    scrollView: {
        marginBottom: 10
    },
    search_input: {
        marginTop: 10,
        elevation: 2,
        borderRadius: 25,
        backgroundColor: Colors.WHITE,
        width: '100%',
        alignSelf: 'center',
        borderWidth: 0,
    },
    sub_container: {
        marginVertical: 10,
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        padding: 15,
        alignSelf: "center",
        backgroundColor: Colors.LGREY,
    },
    sub_container_heading: {
        fontSize: 20,
        color: Colors.BLACK,
        width: '70%',
        lineHeight: 25,
        marginVertical: 8
    },
    heading: {
        fontSize: 16,
        color: Colors.BLACK,
        fontFamily: Fonts?.BOLD
    },
    headingx: {
        fontSize: 15,
        fontFamily: Fonts?.SEMIBOLD,
        color: Colors.BLACK
    },
    appointment_card_text: {
        fontSize: 14,
        color: Colors.WHITE,
        marginVertical: 2,
    },
    appointment_card_span: {
        fontSize: 12,
        color: Colors.WHITE,
        fontFamily: Fonts?.REGULAR
    },
    text: {
        fontSize: 16,
        color: Colors.BLACK,
        marginVertical: 2,
        fontWeight: "bold"
    },
    textx: {
        fontSize: 12,
    },
    sub_heading: {
        fontSize: 11,
        color: Colors.BLACK,
        fontFamily: Fonts?.REGULAR
    },
    upper_view: {
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: Colors.PRIMARY,
        paddingBottom: 40,
        padding: 15
    },
    profile_image: {
        borderRadius: 50,
        width: 45,
        height: 45,
    },
    home_header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    category_box: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
        backgroundColor: Colors.BG_BLUE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    category_image: {
        width: 25,
        height: 25,
        resizeMode: "contain"
    },
    flex: {
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    Appointment_card: {
        borderRadius: 15,
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 15,
        paddingVertical: 13,
        alignItems: "center"
    },
    appointment_card_subview2: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    appointment_card_subview3:
    {
        marginTop: 10,

        paddingVertical: 10,
        width: '100%',
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    appointment_card_subview4:
    {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    appointment_card_subview1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%'
    },
    Appointment_image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    featured_card: {
        borderRadius: 10,
        width: 120,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: Colors.WHITE,
        elevation: 2,
        marginHorizontal: 10,
        marginVertical: 4,
        alignItems: "center"
    },
    featured_image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginVertical: 5
    },
    flexA: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    bell_icon:{
        backgroundColor: Colors?.WHITE,
        elevation: 5,
        borderRadius: 50,
        padding: 5,
        margin: 2
    }
})