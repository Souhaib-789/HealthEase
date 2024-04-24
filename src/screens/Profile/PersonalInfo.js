import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon, { IconTypes } from '../../components/Icon'
import { Colors } from '../../utilities/Colors'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import TextComponent from '../../components/TextComponent'
import { Fonts } from '../../utilities/Fonts'

const PersonalInfo = () => {
    const navigation = useNavigation()

    const personalInfo = [
        {
            id: 2,
            info: 'marvie@gmail.com',
            icon: <Icon name={'envelope'} type={IconTypes.FontAwesome} size={15} color={Colors.PRIMARY} />
        },
        {
            id: 3,
            icon: <Icon name={'call-sharp'} type={IconTypes.Ionicons} size={15} color={Colors.PRIMARY} />,
            info: '0300 000 000'
        },
        {
            id: 4,
            icon: <Icon name={'location-pin'} type={IconTypes.Entypo} size={15} color={Colors.PRIMARY} />,
            info: 'Los angeles , California'
        },
        {
            id: 5,
            icon: <Icon name={'weight'} type={IconTypes.FontAwesome5} size={15} color={Colors.PRIMARY} />,
            info: '80 kg'
        },
        {
            id: 6,
            icon: <Icon name={'human-male-height'} type={IconTypes.MaterialCommunityIcons} size={15} color={Colors.PRIMARY} />,
            info: '5.8 ft'
        },
        {
            id: 7,
            info: 'B+',
            icon: <Icon name={'bloodtype'} type={IconTypes.MaterialIcons} size={15} color={Colors.PRIMARY} />,
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
            <TextComponent style={styles.heading} text={'Personal Information'} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <FlatList
                    data={personalInfo}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </ScrollView>
            <Button title={'Edit Profile'} onPress={() => navigation.navigate('EditProfile')} style={{ marginBottom: 20 }} />
        </View>
    )
}

export default PersonalInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 20
    },
    heading: {
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.BLACK
    },
})