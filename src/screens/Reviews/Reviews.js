import React from "react";
import { View, StyleSheet, ScrollView, FlatList, } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import { Rating, AirbnbRating } from 'react-native-ratings';
import STAR from '../../assets/images/star.png';
import { useSelector } from "react-redux";


const Reviews = (props) => {


    const item = props.route?.params?.item;
    const USER = useSelector(state => state.AuthReducer?.user);
    console.log(JSON.stringify(item));

    return (
        <View style={styles.mainContainer}>
            <Header back profile title={'Reviews'} />
            <ScrollView>

                <FlatList
                    key={"ReviewsList"}
                    showsVerticalScrollIndicator={false}
                    data={USER?.user_role == 'doctor' ? USER?.Reviews : item}
                    renderItem={({ item }) => (
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