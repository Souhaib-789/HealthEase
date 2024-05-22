import React, { useRef } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import CircleOne from '../../assets/images/circleone.png'
import One from '../../assets/images/splash1.jpg'
import Two from '../../assets/images/healthbot.png'
import Three from '../../assets/images/capturing.jpg'
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from "../../utilities/Colors";
import Image from '../../components/Image';
import TextComponent from '../../components/TextComponent';
import { Fonts } from '../../utilities/Fonts';

const IntroSlider = () => {

    let SliderRef = useRef(null);
    const navigation = useNavigation();
    const slides = [
        {
            key: 1,
            heading: 'Easy Appointments',
            text: 'Say goodbye to long waits and book doctor appointments with ease using Healthease.',
            image: One,
        },
        {
            key: 2,
            heading: 'HealthBot: AI Diet Assistant',
            text: "Get meal suggestions customized to your health needs with our HealthBot." ,
            image: Two,
        },
        {
            key: 3,
            heading: 'Instant Med Recognition',
            text: 'Scan and share medication details in seconds with scanner feature.',
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
                            navigation.navigate('Login')
                        } else {
                            SliderRef.goToSlide(index + 1);
                        }
                    }} >
                        <TextComponent style={styles.button_text} text={'Next'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('Login')}>
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
            activeDotStyle={{ backgroundColor: Colors.PRIMARY }}
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