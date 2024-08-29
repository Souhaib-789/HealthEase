import React, { useEffect, useState } from "react";
import { Alert, Linking,  StyleSheet, TouchableOpacity, View } from "react-native";
import TextComponent from "../../components/TextComponent";
import Header from "../../components/Header";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Colors } from "../../utilities/Colors";
import CALL from '../../assets/images/call.png'
import { Fonts } from "../../utilities/Fonts";
import { useDispatch } from "react-redux";
import { AuthMiddleware } from "../../redux/middlewares/AuthMiddleware";


const Support = () => {

    const dispatch = useDispatch();
    const [List, setList] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        dispatch(AuthMiddleware.getSupportData())
            .then((res) => {               
                // setList(res)
                console.log('===============support=====================');
                console.log(JSON.stringify(res, null, 8));
                console.log('====================================');
                setLoading(false)
            })
            .catch((error) => {
                console.log('about error', error)
                setLoading(false)
            })
    }


    const onPressCall = async (e) => {
        try {
            Linking.openURL(e)
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Support" back />

            <Image source={CALL} style={{ width: 200, height: 200 , alignSelf: 'center'}} />

            <TextComponent text={"Need any help ? You can contact to any hospital for any inquiries or details."} style={styles.sub_heading} />

            <View style={styles.row}>
                <View style={{flexDirection: 'row' , gap: 8}}>
                <TextComponent text={'City Hospital -'} style={styles.span} />
                <TextComponent text={'000 000 000'} style={styles.span} />
                </View>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10 }} onPress={() => onPressCall('tel:000 000 000')}>
                <Icon name='add-call' type={IconTypes.MaterialIcons} size={20} color={Colors.PRIMARY} />
            </TouchableOpacity>
            </View>

            


        </View>
    )
}


export default Support;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
    },
    button: { marginTop: 20 },
    logo: { width: 140, height: 140, alignSelf: 'center', marginVertical: 10 },
    heading: { textAlign: 'center', fontSize: 18, fontFamily: Fonts.SEMI_BOLD, borderBottomWidth: 1.5, borderBottomColor: Colors.PRIMARY, padding: 5, width: '50%', marginTop: 25, alignSelf: 'center' },
    sub_heading: { marginBottom: 20 ,fontSize: 13, width: '90%', alignSelf: 'center',  textAlign: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-between' , marginVertical: 15 ,padding: 5 , borderBottomColor: Colors.GREY , borderBottomWidth: 1 , alignItems: 'center', width: '90%', alignSelf: 'center' },
    span: { fontSize: 13, alignSelf: 'center',  color: Colors.DGREY },
    ads_image: { width: '90%', height: 80, alignSelf: 'center', marginTop: 30, borderRadius: 10 }
})