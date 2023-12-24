import React from "react";
import { Text, View, StyleSheet, ScrollView, Image , TouchableOpacity} from "react-native";
import { Colors } from "../../Config/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import medicineA from "../../assets/images/medicine3.png";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";

const PharmacyDashboard = () => {

    const navigation = useNavigation();
    const options = [
        {
            id: 1,
            name: 'My Orders',
            icon: 'cart-check',
            goto: 'MyOrders'
        },
        {
            id: 2,
            name: 'My Cart',
            icon: 'cart-plus',
            goto: 'Cart'
        }
    ]

    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView>
                <Header title={'Pharmacy Dashboard'} />
                <View style={styles.sub_container}>

                    <View style={styles.banner}>
                        <Text style={styles.banner_text}>We will deliver you medicines</Text>
                        <Image source={medicineA} style={styles.banner_image} />
                    </View>


                    <View style={styles.options_view}>
                        {
                            options?.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.option_card} onPress={()=> navigation.navigate(item?.goto)}>
                                        <View style={styles.option_card_innerview}>
                                            <MaterialCommunityIcons name={item?.icon} color={Colors.PRIMARY} size={30} />
                                        </View>
                                        <Text style={styles.text}>{item?.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default PharmacyDashboard;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    sub_container: {
        width: '90%',
        alignSelf: "center",
        paddingTop: 10
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold"
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
        width: '40%',
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
    options_view: {
        marginVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    option_card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        width: '40%',
        alignItems: "center",
        elevation: 6,
        padding: 10,
        margin: 15
    },
    option_card_innerview: {
        backgroundColor: Colors.LIMEBLUE,
        borderRadius: 50,
        padding: 15,
        marginVertical: 10
    },
    text: {
        fontWeight: "bold",
        color: Colors.LIMEGREY,
        marginBottom: 5
    }
})