import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon, { IconTypes } from '../../components/Icon'
import { Colors } from '../../utilities/Colors'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import TextComponent from '../../components/TextComponent'
import { Fonts } from '../../utilities/Fonts'
import { useSelector } from 'react-redux'
import moment from 'moment'

const PersonalInfo = () => {
    const navigation = useNavigation()
    const USER = useSelector(state => state.AuthReducer?.user);
    const personalInfo = [
        {
            id: 2,
            info: USER?.email,
            icon: <Icon name={'envelope'} type={IconTypes.FontAwesome} size={15} color={Colors.PRIMARY} />
        },
        {
            id: 3,
            icon: <Icon name={'call-sharp'} type={IconTypes.Ionicons} size={15} color={Colors.PRIMARY} />,
            info: USER?.phone_number
        },
        {
            id: 4,
            icon: <Icon name={'location-pin'} type={IconTypes.Entypo} size={15} color={Colors.PRIMARY} />,
            info: USER?.address
        }
    ]

    const doctorInfo = [
        {
            id: 2,
            info: USER?.email ? USER?.email : '--',
            icon: <Icon name={'envelope'} type={IconTypes.FontAwesome} size={15} color={Colors.PRIMARY} />
        },
        {
            id: 4,
            icon: <Icon name={'location-pin'} type={IconTypes.Entypo} size={15} color={Colors.PRIMARY} />,
            info: USER?.hospital?.user_name ? USER?.hospital?.user_name : '--'
        },
        {
            id: 5,
            icon: <Icon name={'user-doctor'} type={IconTypes.FontAwesome6} size={15} color={Colors.PRIMARY} />,
            info: USER?.specialization ? USER?.specialization : '--'
        },
        {
            id: 6,
            icon: <Icon name={'tips-and-updates'} type={IconTypes.MaterialIcons} size={15} color={Colors.PRIMARY} />,
            info: USER?.experience ? USER?.experience + ' years experience' : '--'
        },
        {
            id: 7,
            info: USER?.fee ? USER?.fee + ' per slot' : '--',
            icon: <Icon name={'price-change'} type={IconTypes.MaterialIcons} size={15} color={Colors.PRIMARY} />,
        },
        {
            id: 8,
            info: USER?.about ? USER?.about + ' per slot' : '--',
            icon: <Icon name={'info'} type={IconTypes.MaterialIcons} size={15} color={Colors.PRIMARY} />,
        },
        {
            id: 9,
            slots: true,
            icon: <Icon name={'clockcircle'} type={IconTypes.AntDesign} size={15} color={Colors.PRIMARY} />,
        }

    ]
    
    console.log('====================================');
    console.log('USER', JSON.stringify(USER , null ,8));
    console.log('====================================');
    
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10, }}>
                <View style={{ borderRadius: 100, width: 38, height: 38, justifyContent: "center", alignItems: 'center', backgroundColor: Colors?.LIGHT_GREY }}>
                    {item?.icon}
                </View>
                {
                    
                    item?.slots ?
                        <FlatList
                            data={USER?.slots}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, width: '75%' }}>
                                        <TextComponent text={item?.day} style={{ fontSize: 12, }} />
                                        <TextComponent text={(item?.shift_start_Time ? moment(item?.shift_start_Time).utc().format('hh:mm A') : '--') + ' - ' + (item?.shift_end_Time ? moment(item?.shift_end_Time).utc().format('hh:mm A') : '--')} style={{ fontSize: 12 }} />
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <TextComponent text={item?.info} style={{ fontSize: 12, color: Colors.DGREY, width: '80%' }} />
                }
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <TextComponent style={styles.heading} text={'Personal Information'} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <FlatList
                    data={USER?.user_role == 'doctor' ? doctorInfo : personalInfo}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </ScrollView>

            {
                USER?.user_role == 'doctor' ?
                    null :
                    <Button title={'Edit Profile'} onPress={() => navigation.navigate('EditProfile')} style={{ marginBottom: 20 }} />
            }
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