import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import { useDispatch } from "react-redux";
import { AuthMiddleware } from "../../redux/middlewares/AuthMiddleware";
import Skeleton from "../../components/Skeleton";

const PrivacyPolicy = () => {

    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        dispatch(AuthMiddleware.getPrivacyPolicyData())
            .then((res) => {
                setContent(res)
                setLoading(false)
            })
            .catch((error) => {
                console.log('about error', error)
                setLoading(false)
            })
    }


    return (
        <View style={styles.Container}>
            <Header title={'Privacy Policy'} back profile />
            <ScrollView style={styles.scrollview}>
                {
                    loading ?
                        <>
                            <Skeleton style={{ width: '100%', marginTop: 20, height: 18, borderRadius: 5 }} />
                            <Skeleton style={{ width: '100%',  height: 18, borderRadius: 5 }} />
                            <Skeleton style={{ width: '80%',  height: 18, borderRadius: 5 }} />
                            <Skeleton style={{ width: '100%',  height: 18, borderRadius: 5 }} />
                            <Skeleton style={{ width: '50%',  height: 18, borderRadius: 5 }} />
                            <Skeleton style={{ width: '90%',  height: 18, borderRadius: 5 }} />
                            <Skeleton style={{ width: '100%',  height: 18, borderRadius: 5 }} />
                            <Skeleton style={{ width: '50%',  height: 18, borderRadius: 5 }} />
                        </>

                        :
                        <TextComponent style={styles.text} text={content} />
                }

            </ScrollView>
        </View>
    )
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: Fonts.SEMIBOLD
    },
    scrollview: {
        width: '90%',
        alignSelf: "center"
    },
    text: {
        lineHeight: 25,
        marginVertical: 5
    }

})