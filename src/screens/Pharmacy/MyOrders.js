import React from "react";
import { Text, View, StyleSheet, ScrollView, Image,  FlatList } from "react-native";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import Ionicons from 'react-native-vector-icons/Ionicons'
import md_a from "../../assets/images/md_a.png";
import md_b from "../../assets/images/md_b.png";
import { Colors } from "../../Config/Colors";
const MyOrders = () => {

    const Products = [
        {
            id: 1,
            image: md_a,
            name: 'Panadol',
            price: '50',
        },
        {
            id: 2,
            image: md_b,
            name: 'Panadol',
            price: '80',
        },

    ]

    const renderProductsItem = ({ item }) => {
        return (
            <View style={styles.popular_card}>
                <View style={styles.flex}>
                    <Image source={item?.image} style={styles.popular_image} />
                    <View style={styles.popular_card_subview}>
                        <Text style={styles.text}>{item?.name}</Text>
                        <Text style={styles.textx}>Rs. {item?.price} /-</Text>
                    </View>
                </View>

                <Text >2</Text>
                <Text style={styles.button_text}>Sub-Total - Rs.100</Text>
            </View>
        )
    }

    const renderOrderItem = () => {
        return (
            <View style={styles.order_card}>
                <Text style={styles.heading}>Order # : 12345</Text>
                <View style={styles.order_card_subview}>
                    <View>
                        <Text style={styles.text} >Thu , June 20 , 2023</Text>
                        <Text style={styles.text}>at 10:30 PM</Text>
                    </View>
                    <Text style={styles.text}>Total: Rs. 5000/-</Text>
                </View>
                <Text style={styles.text}>
                    <Ionicons name={'location'} color={Colors.PRIMARY} size={15} />  H# 25 balon street , hawky town , Poland</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Products}
                    renderItem={renderProductsItem}
                    keyExtractor={item => item?.id}
                />
            </View>
        )
    }

    return (
        <View style={styles.Container}>
            <BgImage />
            <Header title={'My Orders'} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 10 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Products}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item?.id}
                />
            </ScrollView>
        </View>
    )
}

export default MyOrders;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.PRIMARY
    },
    text: {
        color: Colors.BLACK,
    },
    textx: {
        fontSize: 12
    },
    order_card: {
        backgroundColor: Colors.WHITE,
        elevation: 5,
        padding: 15,
        marginVertical: 15,
        marginHorizontal: 15,
        borderRadius: 5
    },
    order_card_subview: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 13
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    popular_card: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.WHITE,
        padding: 8,
        borderBottomColor: Colors.LIMEBLUE,
        borderBottomWidth: 1,
        marginVertical: 10
    },
    popular_card_subview: {
        marginLeft: 20
    },
    popular_image: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    button: {
        borderRadius: 5,
        width: 100,
        alignSelf: "flex-end",
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: 'rgba(14, 190, 127, 0.08)',
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    button_text: {
        color: Colors.PRIMARY,
        fontSize: 13,
        fontWeight: 500
    },
    address: {
        textDecorationLine: "underline"
    }
})