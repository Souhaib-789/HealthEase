import React, { useState } from "react";
import {  View, StyleSheet, TouchableOpacity, ScrollView,  FlatList, } from "react-native";
import docC from "../../assets/images/doc3.png";
import docD from "../../assets/images/doc4.png";
import docE from "../../assets/images/doc5.png";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import DoctorCard from "../../components/DoctorCard";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import TextComponent from "../../components/TextComponent";
import CustomCategoryIcon from "../../components/CustomCategoryIcon";
import { useSelector } from "react-redux";

const Doctors = () => {

    const navigation = useNavigation();
    const [currCategory, setcurrCategory] = useState({ id: 1 });
    const Doctors = useSelector(state => state.DoctorsReducer?.allDoctors)

    const Categories = [
        {
            id: 1,
            name: 'All',
        },
        {
            id: 2,
            name: 'Dentist'
        },
        {
            id: 3,
            name: 'Cardiologist'
        },
        {
            id: 4,
            name: 'Physio Therapist'
        },
        {
            id: 5,
            name: 'Neurologist'
        },
        {
            id: 6,
            name: 'Dermatologist'
        },
        {
            id: 7,
            name: 'Gastroenterologist'
        },
    ]

    // const Doctors = [
    //     {
    //         id: 1,
    //         image: docC,
    //         name: 'Dr. Crick',
    //         fees: '2500',
    //         rating: 5,
    //         hearted: false,
    //         category: 'Medicine Specialist',
    //         hospital_name: 'City Hospital',
    //         experience: 5,
    //     },
    //     {
    //         id: 2,
    //         image: docD,
    //         name: 'Dr. Strain',
    //         fees: '2200',
    //         rating: 3,
    //         hearted: true,
    //         category: 'Dentist ',
    //         hospital_name: 'City Hospital',
    //         experience: 3,
    //     },
    //     {
    //         id: 3,
    //         image: docE,
    //         name: 'Dr. Lachinet',
    //         fees: '2900',
    //         rating: 2,
    //         hearted: false,
    //         category: 'Physio Therapy Specialist',
    //         hospital_name: 'City Hospital',
    //         experience: 5,
    //     }
    // ]

    const renderCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.category_box, { backgroundColor: item?.id == currCategory?.id ? Colors.PRIMARY : Colors?.LIGHT }]}
                onPress={() => setcurrCategory(item)}>
                <CustomCategoryIcon category={item?.name.toLowerCase()} size={15} color={item?.id == currCategory?.id ? Colors?.WHITE : Colors.PRIMARY} />
                <TextComponent style={[styles.category_text, { color: item?.id == currCategory?.id ? Colors?.WHITE : Colors.PRIMARY }]} text={item?.name} />
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.mainContainer}>
            <Header back profile title={'Doctors'} />
            <ScrollView>
                <Input search placeholder={'Search'} mainStyle={{ marginVertical: 15 , width: '90%' }} />

                <FlatList
                    key={"CategoriesList"}
                    showsHorizontalScrollIndicator={false}
                    data={Categories}
                    horizontal
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item?.id}
                    style={{width: '90%', alignSelf: 'center'}}
                />

                <FlatList
                    key={"DoctorsList"}
                    showsVerticalScrollIndicator={false}
                    data={Doctors}
                    renderItem={({ item }) => (
                        <DoctorCard item={item} style={{width: '90%'}} />
                    )}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={<ListEmptyComponent text={'no doctors found'} />}
                />
            </ScrollView>
        </View>
    )
}

export default Doctors;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    category_box: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 8,
        gap: 6
    },
    category_text: {
        color: Colors.PRIMARY,
        fontSize: 12
    },
})