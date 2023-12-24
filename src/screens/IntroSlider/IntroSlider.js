import React, { useRef } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import CircleOne from '../../assets/images/circleone.png'
import One from '../../assets/images/splash1.jpg'
import Two from '../../assets/images/splash7.png'
import Three from '../../assets/images/splash5.png'
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from "../../Config/Colors";
import Image from '../../components/Image';
import TextComponent from '../../components/TextComponent';
import { Fonts } from '../../Config/Fonts';

const IntroSlider = () => {

    let SliderRef = useRef(null);
    const navigation = useNavigation();
    const slides = [
        {
            key: 1,
            heading: 'Easy Appointments',
            text: 'Say goodbye to long waits and book doctor appointments with ease using Ease Health.',
            image: One,
        },
        {
            key: 2,
            heading: 'Pharmacy on Fingertips',
            text: 'Get your medications delivered right to your doorstep with just a few taps on our app.',
            image: Two,
        },
        {
            key: 3,
            heading: 'Contented Test Bookings ',
            text: 'Take control of your health and schedule diagnostic tests online with our app',
            image: Three,
        },
    ];

    const renderItem = ({ item, index }) => {
        return (

            <View style={styles.Container}>
                <Image source={CircleOne} tintColor={Colors.PRIMARY} style={styles.side_image} />
                <Image source={item?.image} style={styles.image} resizeMode={'cover'} />
                <View style={styles.bottom_view}>
                    <TextComponent style={styles.heading} text={item?.heading} />
                    <TextComponent style={styles.span} text={item?.text} />


                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (item?.key == 3) {
                            navigation.navigate('DrawerBar')
                        } else {
                            SliderRef.goToSlide(index + 1);
                        }
                    }} >
                        <TextComponent style={styles.button_text} text={'Next'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('DrawerBar')}>
                        <TextComponent style={{ color: Colors.DDGREY }} text={'Skip'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <AppIntroSlider
            ref={ref => (SliderRef = ref)}
            data={slides}
            renderItem={renderItem}
            bottomButton={false}
            showNextButton={false}
            showSkipButton={false}
            showDoneButton={false}
        />
    );
};
export default IntroSlider;


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
    },
    heading: {
        color: Colors.BLACK,
        fontSize: 20,
        fontFamily: Fonts?.SEMIBOLD,
        marginBottom: 8
    },
    span: {
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 13
    },
    side_image:{
        width: 300,
        height: 300,
        position: 'absolute',
        left: -40,
        resizeMode: 'contain'
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 200,
        alignSelf: 'center',
        marginTop: '20%'

    },
    button: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        marginTop: 20
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
    },
    bottom_view: { alignSelf: 'center', alignItems: 'center', width: '80%', marginTop: 110 }
})