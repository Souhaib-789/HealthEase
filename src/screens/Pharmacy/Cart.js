import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import { Colors } from "../../Config/Colors";
import md_a from "../../assets/images/md_a.png";
import md_b from "../../assets/images/md_b.png";
import md_c from "../../assets/images/md_c.jpg";
import md_d from "../../assets/images/md_d.png";
import md_e from "../../assets/images/md_e.jpg";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import noRecordImage from '../../assets/images/empty.png'

const Cart = () => {

    const navigation = useNavigation();
    const [address, setaddress] = useState();

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
        {
            id: 3,
            image: md_c,
            name: 'Panadol',
            price: '100',
        },
        {
            id: 4,
            image: md_d,
            name: 'Panadol',
            price: '500',
        },
        {
            id: 5,
            image: md_e,
            name: 'Panadol',
            price: '200',
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

                        <View style={styles.counter}>
                            <TouchableOpacity>
                                <AntDesign name={'minussquareo'} color={Colors.PRIMARY} size={22} />
                            </TouchableOpacity>
                            <Text style={styles.text}>      1       </Text>
                            <TouchableOpacity>
                                <AntDesign name={'plussquareo'} color={Colors.PRIMARY} size={22} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={styles.span}>Rs. 50</Text>
            </View>
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={styles.list_empty_view}>
                <Image source={noRecordImage} style={styles.no_record_image} />
                <Text style={[styles.heading, { color: Colors.BLACK }]}>No Orders placed yet</Text>
                <Text style={styles.bio}>Place your first order now.</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <BgImage />
            <Header title={'Shopping Cart'} />
            <ScrollView>
                <View style={styles.sub_container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Products}
                        numColumns={2}
                        renderItem={renderProductsItem}
                        keyExtractor={item => item?.id}
                        ListEmptyComponent={ListEmptyComponent}
                    />
                    {
                        Products?.length > 0 ?

                            <View style={styles.checkout_section}>
                                <Text style={styles.headingx}>Delivery Address</Text>
                                <TextInput style={styles.input} placeholder={'enter address'} value={address} onChangeText={(e) => setaddress(e)} />

                                <Text style={styles.headingx}>Payment Method</Text>
                                <TextInput style={styles.input} editable={false} value={'Cash on Delivery'} onChangeText={(e) => setaddress(e)} />

                                <View style={[styles.flex, { marginTop: 10 }]}>
                                    <Text style={styles.headingx}>Sub-Total</Text>
                                    <Text style={styles.amount}>Rs. 900</Text>
                                </View>
                                <View style={styles.flex}>
                                    <Text style={styles.headingx}>Delivery Charges</Text>
                                    <Text style={styles.amount}>Rs. 200</Text>
                                </View>
                                <View style={styles.flex}>
                                    <Text style={styles.headingx}>TOTAL</Text>
                                    <Text style={[styles.amount, { fontWeight: "bold", fontSize: 17 }]}>Rs. 1100</Text>
                                </View>
                            </View>
                            : null}

                    {
                        Products?.length > 0 ?

                            <TouchableOpacity style={styles.button}
                                onPress={() => navigation.goBack()}>
                                <Text style={styles.button_text}>Place Order</Text>
                            </TouchableOpacity>

                            :
                            <TouchableOpacity style={styles.button}
                                onPress={() => navigation.navigate('Pharmacy')}>
                                <Text style={styles.button_text}>Order Medicines</Text>
                            </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Cart;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
        paddingTop: 15
    },
    heading: {
        fontSize: 18,
        color: Colors.WHITE,
        fontWeight: "bold"
    },
    headingx: {
        fontSize: 15,
        fontWeight: 700,
        color: Colors.DDGREY,
        marginVertical: 5
    },
    text: {
        fontSize: 16,
        color: Colors.BLACK,
        fontWeight: 500
    },
    span: {
        fontWeight: "bold",
        color: Colors.PRIMARY,
        fontSize: 16,
    },
    textx: {
        fontSize: 14
    },
    amount: {
        color: Colors.BLACK,

    },
    sub_heading: {
        fontSize: 18,
        color: Colors.WHITE
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    popular_card: {
        width: '100%',
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.WHITE,
        elevation: 2,
        marginVertical: 8,
        padding: 10,
    },
    popular_card_subview: {
        marginLeft: 20
    },
    popular_image: {
        width: 80,
        height: 60,
        resizeMode: "contain"
    },
    button: {
        borderRadius: 5,
        width: '80%',
        alignSelf: "center",
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        marginBottom: 15
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
    },
    no_data: {
        textAlign: "center",
        marginTop: 10,
        fontWeight: 500
    },
    counter: {
        flexDirection: "row",
        marginVertical: 8,
        alignItems: "center"
    },
    checkout_section: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    input_container: {
        padding: 0,
        borderColor: Colors.PRIMARY,
        borderWidth: 1
    },
    input: {
        marginBottom: 10,
        fontSize: 14,
        backgroundColor: 'rgba(211, 211, 211, 0.2)',
        borderRadius: 5,
        padding: 12,
        color: Colors.DGREY
    },
    bio: {
        textAlign: "center",
        marginTop: 8,
        marginBottom: 25
    },
    no_record_image: {
        width: 160,
        height: 160,
        resizeMode: "contain",
        marginTop: 80,
        marginBottom: 25
    },
    list_empty_view: {
        alignItems: "center",
    },
})