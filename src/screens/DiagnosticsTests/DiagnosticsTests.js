import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../utilities/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import category from "../../assets/images/d1.png";
import category2 from "../../assets/images/d2.png";
import category3 from "../../assets/images/d3.png";
import category4 from "../../assets/images/d4.png";
import sugarTest from "../../assets/images/sugar.png";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";

const DiagnosticsTests = () => {

    const [options, setoptions] = useState(false)
    const navigation = useNavigation();

   
    const Categories = [
        {
            id: 1,
            image: category,
            color: 'rgb(99, 55, 255)',
            text: 'Free home Sample pickup'
        },
        {
            id: 2,
            image: category2,
            color: '#08D6A8',
            text: 'Practo asociate labs'
        },
        {
            id: 3,
            image: category3,
            color: '#FE7F44',
            text: 'E-Reports in 24-72 hours'
        },
        {
            id: 4,
            image: category4,
            color: '#FF484C',
            text: 'Free follow-up with a doctor'
        }
    ]

    const PopularTests = [
        {
            id: 1,
            name: 'Advanced Diabetes Test',
            description: 'Ideal for individuals aged 28-60 years',
            test: { label:'Diabetes Test' , price: 500},
            cut_price: 800,
            discount_percentage: 40,
            no_of_remaining: 12
        },
        {
            id: 2,
            name: 'Advanced Diabetes Test',
            description: 'Ideal for individuals aged 28-60 years',
            test: { label:'Diabetes Test' , price: 500},
            cut_price: 800,
            discount_percentage: 40,
            no_of_remaining: 12
        },
        {
            id: 3,
            name: 'Advanced Diabetes Test',
            description: 'Ideal for individuals aged 28-60 years',
            test: { label:'Diabetes Test' , price: 500},
            cut_price: 800,
            discount_percentage: 40,
            no_of_remaining: 12
        },
    ]

    const renderCategoryItem = ({ item }) => {
        return (
            <View style={styles.flex}>
                <View style={[styles.category_box, { backgroundColor: item?.color }]}>
                    <Image source={item?.image} style={styles.category_image} />
                </View>
                <Text style={styles.sub_heading}>{item?.text}</Text>
            </View>
        )
    }

    const renderTestItem = ({item}) => {
        return (
            <View style={styles.test_card}>
                <Text style={[styles.headingx, { marginTop: 0 }]}>{item?.name}</Text>
                <Text style={{ fontSize: 13 }}>{item?.description}</Text>

                <View style={{ borderColor: Colors.PRIMARY, marginVertical: 10, padding: 5, borderRadius: 5, borderWidth: 1, width: '40%', alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: Colors.PRIMARY }} >{item?.no_of_remaining} tests remaining</Text>
                </View>

                <Image source={sugarTest} style={styles.test_card_image} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                    <View>
                        <Text style={{ fontWeight: "bold", color: Colors.BLACK, fontSize: 16 }}>Rs. {item?.test?.price}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ textDecorationLine: "line-through" }}>Rs. {item?.cut_price}</Text>
                            <Text style={{ color: Colors.PRIMARY, marginLeft: 10 }}>{item?.discount_percentage} % Off</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=> navigation.navigate('BookTest', {item: item})}
                     style={{ backgroundColor: Colors.PRIMARY, borderRadius: 8, alignItems: "center", padding: 10, width: '40%' }}>
                        <Text style={{ color: Colors.WHITE }}>Book Now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.Container}>
            <BgImage />
            <Header title={'Diagnostics Tests'} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.sub_view}>
                <Text style={styles.heading}>Get Full body health checkups
                    from the comfort of your home.</Text>

                <FlatList
                    data={Categories}
                    numColumns={2}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item?.id}
                />

                <View style={styles.middle_view}>
                    <Text style={styles.headingx}>Recommended for you</Text>
                    <TouchableOpacity onPress={()=> setoptions(!options)}>
                    <SimpleLineIcons name={'options-vertical'} size={15} color={Colors.BLACK} style={{ marginRight: 10 }} />
                    </TouchableOpacity>

                    {
                        options ?
                            <View style={styles.option_box}>
                                <TouchableOpacity style={styles.option_inner} onPress={()=> navigation.navigate('MyTests') }>
                                    <FontAwesome5 name={'file-medical'} size={18} color={Colors.PRIMARY} />
                                    <Text style={styles.option_text}>My Tests</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.option_inner} onPress={()=> navigation.navigate('EReports') }>
                                    <FontAwesome5 name={'file-import'} size={18} color={Colors.PRIMARY} />
                                    <Text style={styles.option_text}>E reports</Text>
                                </TouchableOpacity>
                            </View>
                            : null}
                </View>


                <FlatList
                    data={PopularTests}
                    renderItem={renderTestItem}
                    keyExtractor={item => item?.id}
                />
            </ScrollView>

        </View>
    )
}

export default DiagnosticsTests;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    sub_view: {
        width: '95%',
        alignSelf: "center",
    },
    heading: {
        fontSize: 20,
        marginVertical: 15,
        lineHeight: 30,
    },
    headingx: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 20,
        lineHeight: 25,
        color: Colors.BLACK
    },
    sub_heading: {
        fontSize: 13,
        width: '60%',
        lineHeight: 18,
        marginLeft: 8,
        color: Colors.BLACK,
        fontWeight: 500,
    },
    category_box: {
        width: 45,
        height: 45,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    category_image: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        width: '50%',
        marginVertical: 10,
        marginLeft: 2,
    },
    test_card: {
        backgroundColor: Colors.WHITE,
        elevation: 3,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 10,
        margin: 3,
        marginVertical: 18
    },
    test_card_image: {
        resizeMode: "cover",
        width: '100%',
        height: 180,
        borderRadius: 3
    },
    middle_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
    },
    option_inner: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3,
        borderBottomColor: Colors.LIMEBLUE,
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    option_text: {
        fontSize: 16,
        color: Colors.PRIMARY,
        marginLeft: 5
    },
    option_box: {
        position: "absolute",
        top: 15,
        right: 35,
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        elevation: 5,
        paddingVertical: 15,
        paddingHorizontal: 30
    }
})