import React from "react";
import { View, StyleSheet, ScrollView, FlatList, } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import { Rating, AirbnbRating } from 'react-native-ratings';
import STAR from '../../assets/images/star.png';


const Reviews = () => {

    const Reviews = [
        {
            id: 1,
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
            <Header back profile title={'Reviews'} />
            <ScrollView>

                <FlatList
                    key={"ReviewsList"}
                    showsVerticalScrollIndicator={false}
                    data={Reviews}
                    renderItem={({ item }) => (
                        <View style={styles.reviewCard}>

                            <Rating
                                type='custom'
                                ratingImage={STAR}
                                ratingColor={Colors.YELLOW}
                                ratingBackgroundColor='#c8c7c8'
                                ratingCount={10}
                                imageSize={30}
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 10 }}
                            />
                            <TextComponent style={styles.reviewText} text={item.category} />
                            <TextComponent style={styles.reviewAuthor} text={item.hospital_name} />
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
        lineHeight: 20
    },
    reviewAuthor: {
        marginTop: 10,
        fontSize: 13,
        fontFamily: Fonts.ITALIC,
    },
})