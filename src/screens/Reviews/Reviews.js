import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList, RefreshControl, } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import { Rating, AirbnbRating } from 'react-native-ratings';
import STAR from '../../assets/images/star.png';
import { useDispatch, useSelector } from "react-redux";
import { DoctorsMiddleware } from "../../redux/middlewares/DoctorsMiddleware";
import Skeleton from "../../components/Skeleton";


const Reviews = (props) => {


    const item = props.route?.params?.item;
    const USER = useSelector(state => state.AuthReducer?.user);
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (USER?.user_role == 'doctor') {
            getData()
        }else{
            setLoading(false)
        }
    }, [])

    console.log(JSON.stringify(content, null , 8));


    const getData = () => {
        dispatch(DoctorsMiddleware.getDoctorsReview())
            .then((res) => {               
                setContent(res)
                setLoading(false)
            })
            .catch((error) => {
                console.log('error', error)
                setLoading(false)
            })
    }

    return (
        <View style={styles.mainContainer}>
            <Header back profile title={'Reviews'} />
            <ScrollView
             refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={getData}
                />
            }
            >

                <FlatList
                    key={"ReviewsList"}
                    showsVerticalScrollIndicator={false}
                    data={USER?.user_role == 'doctor' ? loading ? [1,2,3,4,5]  :content : item}
                    renderItem={({ item }) => (
                        loading ?
                        <Skeleton style={{ width: '90%', marginTop: 15, alignSelf: 'center', height: 75, borderRadius: 10 }} />
                        :
                        <View style={styles.reviewCard}>

                            <Rating
                                type='custom'
                                ratingImage={STAR}
                                ratingColor={Colors.WHITE}
                                ratingBackgroundColor={Colors.WHITE}
                                ratingCount={item?.rating}
                                readonly={true}
                                imageSize={18}
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 5, alignSelf: 'flex-start' }}
                            />
                            <TextComponent style={styles.reviewText} text={item?.review} />
                            <TextComponent style={styles.reviewAuthor} text={item?.reviewer?.user_name} />
                        </View>
                    )}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={<ListEmptyComponent text={'no reviews found'} />}
                />
            </ScrollView>
        </View>
    )
}

export default Reviews;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    reviewCard: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: Colors.WHITE,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    reviewText: {
        color: Colors.DGREY,
        lineHeight: 20,
        fontSize: 12,
    },
    reviewAuthor: {
        fontSize: 12,
        fontFamily: Fonts.ITALIC,
    },
})