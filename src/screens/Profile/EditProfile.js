import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import perfil from '../../assets/images/profile.png'
import Image from "../../components/Image";
import Icon, { IconTypes } from "../../components/Icon";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Avatar from '../../assets/images/avatar.png'
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
const navigation = useNavigation()
     const [formData , setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        weight: '',
        height: '',
        bloodGroup: ''
    })


    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title={'Edit Profile'} back />

                <Image source={perfil ? perfil : Avatar} style={styles.profile_image} resizeMode={'cover'} />
                <TouchableOpacity style={styles.picker}>
                    <Icon name={'pencil'} type={IconTypes.Ionicons} size={18} color={Colors.PRIMARY} />
                </TouchableOpacity>

                <Input
                    label={'Name'}
                    value={
                        formData.name
                    }
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            name: e
                        })
                    }
                    placeholder={'Enter your name'}
                    parentStyle={styles.input} />

                <Input
                    label={'Contact No.'}
                    keyboardType={'number-pad'}
                    placeholder={'Enter your contact number'}
                    value={
                        formData.contact
                    }
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            contact: e
                        })
                    }
                    parentStyle={styles.input} />

                <Input
                    label={'Address'}
                    placeholder={'Enter your address'}
                    value={
                        formData.address
                    }
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            address: e
                        })
                    }
                    parentStyle={styles.input}
                />

                <Input
                    label={'Weight'}
                    placeholder={'Enter your weight'}
                    value={
                        formData.weight
                    }
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            weight: e
                        })
                    }
                    parentStyle={styles.input}
                />

                <Input
                    label={'Height'}
                    placeholder={'Enter your height'}
                    value={
                        formData.height
                    }
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            height: e
                        })
                    }
                    parentStyle={styles.input}
                />

<Input
                    label={'Blood Group'}
                    placeholder={'Enter your blood group'}
                    value={
                        formData.bloodGroup
                    }
                    onChangeText={(e) => 
                        setFormData({
                            ...formData,
                            bloodGroup: e
                        })
                    }
                    parentStyle={styles.input}
                />


            </ScrollView>
            <Button title={'Save'} onPress={() => navigation.goBack()} style={{ marginBottom: 20 }} />

        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    input: {
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center'
    },
    picker: {
        backgroundColor: Colors?.WHITE,
        elevation: 5,
        padding: 5,
        borderRadius: 100,
        position: 'absolute',
        left: 80,
        top: 130,
    },
    profile_image: {
        width: 80,
        borderRadius: 100,
        height: 80,
        marginBottom: 25,
        marginTop: 20,
        marginLeft: 20
    },
})