import React from "react";
import { Text, View, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from "react-native";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Colors } from "../../Config/Colors";
import docC from "../../assets/images/doc3.png";
import docD from "../../assets/images/doc4.png";
import docE from "../../assets/images/doc5.png";
import { AirbnbRating } from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";

const FavDoctors = () => {

    const navigation = useNavigation();

    const FavoriteDoctors = [
        {
            id: 1,
            image: docC,
            name: 'Dr. Crick',
            fees: '2500',
            rating: 3.7,
            hearted: false,
            category: 'Medicine Specialist',
            experience: 5,
        },
        {
            id: 2,
            image: docD,
            name: 'Dr. Strain',
            fees: '2200',
            rating: 3.0,
            hearted: true,
            category: 'Dentist ',
            experience: 3,
        },
        {
            id: 3,
            image: docE,
            name: 'Dr. Lachinet',
            fees: '2900',
            rating: 2.9,
            hearted: false,
            category: 'Physio Therapy Specialist',
            experience: 5,
        },
        {
            id: 4,
            image: docC,
            name: 'Dr. Crick',
            fees: '2500',
            rating: 3.7,
            hearted: true,
            category: 'Cardiologist',
            experience: 9,
        },
    ]

    console.log(FavoriteDoctors);
    const renderDoctorItem = ({ item }) => {
        return (
            <View style={styles.popular_card}>
                <View>
                    <Image source={item?.image} style={styles.popular_image} />
                    <View style={styles.next_available}>
                        <Text style={[styles.textx, { color: Colors.PRIMARY, fontWeight: "bold" }]}>Next Available</Text>
                        <Text style={styles.textx}><Text style={styles.span}>10:00 AM</Text> tomorrow</Text>
                    </View>
                </View>

                <View style={styles.popular_card_subview}>
                    <TouchableOpacity style={styles.heart}>
                        <Ionicons name={item?.hearted ? 'heart' : 'ios-heart-outline'} size={23} color={item?.hearted ? Colors?.RED : Colors.DGREY} />
                    </TouchableOpacity>

                    <Text style={styles.text}>{item?.name}</Text>
                    <Text style={styles.textx}>{item?.category}</Text>
                    <View style={{ alignSelf: "flex-start", marginTop: 3 }}>
                        <AirbnbRating
                            isDisabled={true}
                            count={5}
                            defaultRating={item?.rating}
                            size={15}
                            selectedColor={Colors.ORANGE}
                            unSelectedColor={Colors.GREY}
                            showRating={false}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DoctorDetails', { item: item })}>
                        <Text style={styles.button_text}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <BgImage />
            <Header title={'Favorite Doctors'} />
            <ScrollView>
                <View style={styles.sub_container}>
                    <Input leftIcon={true} rightIcon={true} placeholder={'Search'} mainStyle={{ marginVertical: 20 }} />

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={FavoriteDoctors}
                        renderItem={renderDoctorItem}
                        keyExtractor={item => item?.id}
                        ListEmptyComponent={
                            <Text style={styles.no_data} >No doctors available</Text>
                        }
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default FavDoctors;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
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
        padding: 10
    },
    popular_card_subview: {
        width: '70%',
    },
    popular_image: {
        width: 85,
        height: 85,
        borderRadius: 8,
        resizeMode: "cover"
    },
    button: {
        borderRadius: 5,
        width: '60%',
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        alignSelf: "flex-end",
        marginRight: 18,
        marginTop: 28
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 13,
        fontWeight: 500
    },
    no_data: {
        textAlign: "center",
        marginTop: 10,
        fontWeight: 500
    }
})