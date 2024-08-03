import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import HOSPITAL from '../../assets/images/hospital.png'
import Image from "../../components/Image";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HospitalEditProfile = () => {
const navigation = useNavigation()
const USER = useSelector(state => state.AuthReducer?.user);

     const [formData , setFormData] = useState({
        name: USER?.user_name,
        contact: USER?.phone_number,
        address: USER?.address,
    })


    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title={'Edit Profile'} back />

                <Image source={USER?.image ? {uri: USER?.image } : HOSPITAL} resizeMode={USER?.image ? 'cover' : 'contain'}  style={{width: '90%', marginVertical: 20 , alignSelf: 'center', height: 130 , borderRadius: 10}} />

                <TouchableOpacity style={styles.picker}>
                    <Icon name={'pencil'} type={IconTypes.Ionicons} size={15} color={Colors.PRIMARY} />
                </TouchableOpacity>

                <Input
                    label={'Name'}
                    value={
                        formData.name
                    }
                    placeholder='Enter hospital name'
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            name: e
                        })
                    }
                    parentStyle={styles.input} />

                <Input
                    label={'Contact No.'}
                    keyboardType={'number-pad'}
                    value={
                        formData.contact
                    }
                    placeholder='Enter hospital contact'
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            contact: e
                        })
                    }
                    parentStyle={styles.input} />

                <Input
                    label={'Address'}
                    value={
                        formData.address
                    }
                    placeholder='Enter hospital address'
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            address: e
                        })
                    }
                    parentStyle={styles.input}
                />

            </ScrollView>
            <Button title={'Save'} onPress={() => navigation.goBack()} style={{ marginBottom: 20 }} />

        </View>
    )
}

export default HospitalEditProfile;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    input: {
        marginTop: 8,
        width: '90%',
        alignSelf: 'center'
    },
    picker: {
        backgroundColor: Colors?.WHITE,
        elevation: 5,
        padding: 5,
        borderRadius: 100,
        position: 'absolute',
        right: 27,
        top: 170
    },
})