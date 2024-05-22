import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import Header from "../../components/Header";
import moment, { duration } from "moment";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import FormModal from "../../components/FormModal";
import { AirbnbRating, Rating } from "react-native-ratings";
import STAR from '../../assets/images/star.png';
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";

const AppointmentDetails = (props) => {

    const routeData = props?.route?.params?.item;
    const screenType = props?.route?.params?.screenType;


    const details = [
        {
            name: 'Reviews',
            no: '50 +',
            icon_name: 'star'
        },
        {
            name: 'Experience',
            no: `${routeData?.experience} Years`,
            icon_name: 'tips-and-updates'
        },
        {
            name: 'per slot',
            no: routeData?.fees ? routeData?.fees : 1000 + ' Rs',
            icon_name: 'price-change'
        },
    ]

    const renderDetailsItem = (item, index) => {
        return (
            <View style={styles.row}>
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

    const navigation = useNavigation();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);



    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Header title={'Details'} back />
                <Image source={routeData?.image} style={styles.card_image} />

                <View style={styles.details_card}>

                    <View style={{ alignItems: 'center' }}>
                        <TextComponent style={styles.text} text={routeData?.name} />
                        <TextComponent style={styles.textx} text={routeData?.category} />
                        <TextComponent style={styles.textx} text={routeData?.hospital_name} />
                    </View>


                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', marginVertical: 20 }}>
                        {details.map(renderDetailsItem)}
                    </View>

                    <View style={styles.box}>
                        <TextComponent style={styles.heading} text={
                            screenType === 'upcoming' ? 'Scheduled Appointment'
                                : 'Completed Appointment'} />
                        <View style={styles.wide_row}>
                            <View style={styles.row}>
                                <Icon name='calendar-clear-outline' type={IconTypes.Ionicons} size={18} color={Colors?.BLACK} />
                                <TextComponent text={'Day :  '} style={styles.short_heading} />
                            </View>
                            <TextComponent text={'Monday , 23 Oct'} style={styles.texty} />
                        </View>

                        <View style={styles.wide_row}>
                            <View style={styles.row}>
                                <Icon name='clockcircleo' type={IconTypes.AntDesign} size={18} color={Colors?.BLACK} />
                                <TextComponent text={'Time :  '} style={styles.short_heading} />
                            </View>
                            <TextComponent text={'5:00 PM'} style={styles.texty} />
                        </View>

                        <View style={styles.wide_row}>
                            <View style={styles.row}>
                                <Icon name='timer-outline' type={IconTypes.Ionicons} size={18} color={Colors?.BLACK} />
                                <TextComponent text={'Duration :  '} style={styles.short_heading} />
                            </View>
                            <TextComponent text={'30 Minutes'} style={styles.texty} />
                        </View>

                        <View style={styles.hr} />


                        <TextComponent style={styles.heading} text={'Patient Info'} />

                        <View style={styles.wide_row}>
                            <TextComponent text={'Name :  '} style={styles.short_heading} />
                            <TextComponent text={'Stefen Jhon'} style={styles.textx} />
                        </View>

                        <View style={styles.wide_row}>
                            <TextComponent text={'Relationship :  '} style={styles.short_heading} />
                            <TextComponent text={'My Son'} style={styles.textx} />
                        </View>

                        <View style={styles.wide_row}>
                            <TextComponent text={'Contact No :  '} style={styles.short_heading} />
                            <TextComponent text={'123 456 789'} style={styles.textx} />
                        </View>
                    </View>

                    {
                        screenType === 'upcoming' ?

                            <Button icon={<Icon name='map-location' type={IconTypes.FontAwesome6} size={20} color={Colors?.PRIMARY} />} title={`Get Directions to ${routeData.hospital_name ? routeData.hospital_name : 'hopital'}`} light style={styles.button} />
                            :
                            <Button onPress={() => setShowReviewModal(true)} icon={<Icon name='star' type={IconTypes.AntDesign} size={20} color={Colors?.PRIMARY} />} title={'Add Review'} light style={styles.button} />
                    }
                </View>
            </ScrollView>

            {/* -------------------- ADD REVIEW MODAL -------------------- */}

            <FormModal
                visible={showReviewModal}
                title={'Add Review'}
                onClose={() => setShowReviewModal(false)}
                onSubmit={() => setShowReviewModal(false)}
                submitTitle={'Submit'}
            >
                <View style={{ padding: 15 }}>
                    <TextComponent text={'Rate your experience'} style={styles.heading} />

                    <AirbnbRating
                        count={5}
                        defaultRating={rating}
                        size={28}
                        showRating={false}
                        starImage={STAR}
                        selectedColor={Colors?.YELLOW}
                        onFinishRating={(e) => setRating(e)}
                        ratingContainerStyle={{ alignSelf: 'center', marginBottom: 10, }}
                    />

                    <Input
                        style={{ textAlignVertical: 'top' }}
                        placeholder={'Write your review'}
                        multiline
                        numberOfLines={5}
                        value={review}
                        onChangeText={(text) => setReview(text)}
                    />

                </View>
                <Button title={'Submit'} onPress={() => {
                    if (!rating) {
                        alert('Please give rating')
                    }
                    else if (!review) {
                        alert('Please write review statement')
                    }
                    else {
                        setShowReviewModal(false), navigation.goBack()
                    }
                }
                }
                />
            </FormModal>
        </View>
    )
}

export default AppointmentDetails;

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
    box: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        marginVertical: 10
    },
    hr: {
        borderBottomColor: Colors?.GREY,
        borderBottomWidth: 1,
        marginTop: 15
    },
    heading: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts?.SEMIBOLD,
        marginVertical: 10
    },
    short_heading: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts?.REGULAR,
    },
    textx: {
        fontSize: 12,
        color: Colors?.DGREY,
        lineHeight: 20
    },
    texty: {
        fontSize: 14,
        marginRight: 5,
        color: Colors?.PRIMARY,
        fontFamily: Fonts?.SEMIBOLD
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    wide_row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 3
    },
    heart: {
        position: "absolute",
        right: 20,
        top: 20
    },
    details_card: {
        padding: 15,
    },
    popular_card_subview: {
        width: '70%',
        marginLeft: 15
    },
    card_image: {
        width: 120,
        borderColor: Colors?.WHITE,
        borderWidth: 5,
        height: 120,
        borderRadius: 100,
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
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginVertical: 20
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
    },
    select_button: { backgroundColor: Colors?.LIGHT, borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
    select_text: { color: Colors?.PRIMARY, fontSize: 10 },
    calendar: {
        borderRadius: 10,
        margin: 15
    }
})