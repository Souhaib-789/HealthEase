import React from "react";
import { Text, View, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from "react-native";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Colors } from "../../Config/Colors";
import md_a from "../../assets/images/md_a.png";
import md_b from "../../assets/images/md_b.png";
import md_c from "../../assets/images/md_c.jpg";
import md_d from "../../assets/images/md_d.png";
import md_e from "../../assets/images/md_e.jpg";
import md_f from "../../assets/images/md_f.png";
import md_g from "../../assets/images/md_g.png";
import md_h from "../../assets/images/md_h.png";
import md_i from "../../assets/images/md_i.jpg";
import md_j from "../../assets/images/md_j.png";
import medicineA from "../../assets/images/medi1.png";
import { useNavigation } from "@react-navigation/native";

const Pharmacy = () => {

    const navigation = useNavigation();
console.log(navigation);
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
        {
            id: 6,
            image: md_f,
            name: 'Panadol',
            price: '300',
        },
        {
            id: 7,
            image: md_g,
            name: 'Panadol',
            price: '560',
        },
        {
            id: 8,
            image: md_h,
            name: 'Panadol',
            price: '450',
        },
        {
            id: 9,
            image: md_i,
            name: 'Panadol',
            price: '80',
        },
        {
            id: 10,
            image: md_j,
            name: 'Panadol',
            price: '90',
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

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.button_text}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <BgImage />
            <Header title={'Pharmacy'} cartIcon={true} />
            <ScrollView>
                <View style={styles.sub_container}>
                    <Input leftIcon={true} rightIcon={true} placeholder={'Search'} mainStyle={{ marginVertical: 20 }} />

                    <View style={styles.banner}>
                        <Text style={styles.banner_text}>We have medicines for you</Text>
                        <Image source={medicineA} style={styles.banner_image} />
                    </View>

                    <Text style={styles.headingx}>Available Products</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Products}
                        numColumns={2}
                        renderItem={renderProductsItem}
                        keyExtractor={item => item?.id}
                        ListEmptyComponent={
                            <Text style={styles.no_data} >No products available</Text>
                        }
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Pharmacy;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
    },
    heading: {
        fontSize: 20,
        color: Colors.WHITE,
        fontWeight: "bold"
    },
    headingx: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.BLACK,
        marginVertical: 10
    },
    text: {
        fontSize: 18,
        color: Colors.BLACK,
        marginVertical: 2,
        fontWeight: 500
    },
    span: {
        fontWeight: "bold"
    },
    textx: {
        fontSize: 14
    },
    sub_heading: {
        fontSize: 18,
        color: Colors.WHITE
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    banner: {
        width: '100%',
        borderRadius: 10,
        padding: 15,
        marginTop: 25,
        height: 140,
        backgroundColor: 'rgba(14, 190, 127, 0.8)',
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    banner_text: {
        fontSize: 20,
        width: '50%',
        lineHeight: 30,
        fontWeight: "bold",
        color: Colors.WHITE,
        textShadowColor: Colors.BLACK,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    banner_image: {
        width: 180,
        height: 180,
        resizeMode: "contain",
        position: "absolute",
        bottom: 8,
        right: -10
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
        padding: 8,
        paddingVertical: 15
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
    no_data: {
        textAlign: "center",
        marginTop: 10,
        fontWeight: 500
    }
})