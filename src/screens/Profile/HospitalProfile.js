import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon, { IconTypes } from '../../components/Icon'
import { Colors } from '../../utilities/Colors'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import TextComponent from '../../components/TextComponent'
import { Fonts } from '../../utilities/Fonts'
import AVATAR from '../../assets/images/hospital.png'
import Image from '../../components/Image'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'

const HospitalProfile = () => {
    const navigation = useNavigation()
    const USER = useSelector(state => state.AuthReducer?.user);

    const INFO = [
        {
            id: 2,
            info: USER?.email ? USER?.email : '--',
            icon: <Icon name={'envelope'} type={IconTypes.FontAwesome} size={15} color={Colors.PRIMARY} />
        },
        {
            id: 4,
            icon: <Icon name={'location-pin'} type={IconTypes.Entypo} size={15} color={Colors.PRIMARY} />,
            info: USER?.address ? USER?.address : '--'
        },
        {
            id: 5,
            icon: <Icon name={'call-sharp'} type={IconTypes.Ionicons} size={15} color={Colors.PRIMARY} />,
            info: USER?.phone_number ? USER?.phone_number : '--'
        },
        {
            id: 6,
            icon: <Icon name={'orcid'} type={IconTypes.FontAwesome5Brands} size={15} color={Colors.PRIMARY} />,
            info: USER?._id ? USER?._id.substring(0, 6).toUpperCase() : '--'
        }
    ]

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10, }}>
                <View style={{ borderRadius: 100, width: 38, height: 38, justifyContent: "center", alignItems: 'center', backgroundColor: Colors?.LIGHT_GREY }}>
                    {item?.icon}
                </View>
                <TextComponent text={item?.info} style={{ fontSize: 12, color: Colors.DGREY }} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Header title={'Profile'} />
            <ScrollView showsVerticalScrollIndicator={false} style={{width: '90%' , alignSelf: 'center'}}>
            <TextComponent style={styles.heading} text={USER?.user_name} />
            <Image source={USER?.image ? {uri: USER?.image } : AVATAR} resizeMode={USER?.image ? 'cover' : 'contain'} style={{width: '100%', marginVertical: 20 , alignSelf: 'center', height: 130 , borderRadius: 10}} />


                <FlatList
                    data={INFO}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </ScrollView>
            <Button title={'Edit Profile'} onPress={() => navigation.navigate('HospitalEditProfile')} style={{ marginBottom: 20 }} />
        </View>
    )
}

export default HospitalProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.BLACK
    },
})