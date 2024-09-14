import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import { useDispatch } from "react-redux";
import { AuthMiddleware } from "../../redux/middlewares/AuthMiddleware";
import Skeleton from "../../components/Skeleton";

const About = () => {

    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        dispatch(AuthMiddleware.getAboutData())
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
            <Header title={'About Us'} back profile />
            <ScrollView style={styles.scrollview}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={getData}
                />
            }
            >
                <TextComponent style={styles.heading} text={'Healthease App'} />
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

export default About;

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