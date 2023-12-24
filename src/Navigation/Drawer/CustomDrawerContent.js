import { TouchableOpacity, Text, View, StyleSheet, Modal as RNModal, Image, } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useState } from 'react';
import { Colors } from "../../Config/Colors";

import profile from '../../assets/images/profile.png'

function CustomDrawerContent(props) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const screens = [
        {
            id: 1,
            screenName: 'Medical Records',
            goto: 'MedicalRecords',
            icon: <MaterialIcons name={'file-copy'} color={'black'} size={20} />
        },
        {
            id: 2,
            screenName: 'Pharmacy',
            goto: 'PharmacyDashboard',
            icon: <FontAwesome5 name={'cart-plus'} color={'black'} size={20} />
        },
        {
            id: 3,
            screenName: 'Diagnostics Tests',
            goto: 'DiagnosticsTests',
            icon: <Entypo name={'lab-flask'} color={'black'} size={20} />
        },
        {
            id: 4,
            screenName: 'Privacy Policy',
            goto: 'PrivacyPolicy',
            icon: <MaterialIcons name={'privacy-tip'} color={'black'} size={20} />
        },
        // {
        //     id: 5,
        //     screenName: 'Settings',
        //     goto: 'Settings',
        //     icon: <Ionicons name={'settings-sharp'} color={'black'} size={20} />
        // }
    ]

    const openModal = () => {
        setModalVisible(true)
    }

    const cancelModal = () => {
        setModalVisible(false)
    }

    const Logout = async () => {
        try {
            navigation.goBack()
            setModalVisible(false)

            // dispatch(AuthActions.Logout())
            // await AsyncStorage.clear();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <View style={{ backgroundColor: Colors.PRIMARY, height: 150, marginBottom: 30, flexDirection: 'row', paddingTop: 80, alignItems: 'center', padding: 15 }}>
                <Image source={profile} style={styles.image} />
                <Text style={styles.heading}>Marrvie Jhon</Text>
            </View>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                {/* <DrawerItemList {...props} /> */}
                {
                    screens.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(item?.goto)}
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    margin: 10,
                                    paddingVertical: 15,
                                    paddingHorizontal: 20,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    backgroundColor: 'white',
                                    borderBottomColor: Colors?.GREY,
                                    borderBottomWidth: 1
                                }}>
                                <View>{item?.icon}</View>
                                <Text style={{ marginLeft: 20, fontSize: 15, color: Colors.BLACK, }}>{item?.screenName}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

                <TouchableOpacity style={styles.btn} onPress={openModal}  >
                    <MaterialIcons name='logout' color={Colors.WHITE} size={20} />
                    <Text style={styles.btntxt}>  Logout</Text>
                </TouchableOpacity>

            </DrawerContentScrollView>



            <RNModal
                animationType={'fade'}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modal_view}>
                    <View style={styles.modal_sub_view}>
                        <SimpleLineIcons name={'logout'} color={Colors.PRIMARY} size={50} />
                        <Text style={styles.modal_heading}>Logout</Text>
                        <Text style={{ marginVertical: 5 }}>are you sure to want to logout ?</Text>

                        <View style={styles.modal_bottom_view}>
                            <TouchableOpacity style={styles.modal_button} onPress={cancelModal}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modal_button} onPress={Logout}>
                                <Text style={styles.text}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RNModal>
        </>
    );
}
export default CustomDrawerContent;

const styles = StyleSheet.create({
    btntxt: {
        fontSize: 15,
        color: Colors.WHITE
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        width: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop: 170,
        marginLeft: 15
    },
    text: {
        color: Colors.WHITE
    },
    modal_view: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_sub_view: {
        alignItems: "center", backgroundColor: Colors.WHITE,
        marginTop: 25,
        borderRadius: 20,
        width: '85%',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_heading: { fontSize: 25, color: Colors.BLACK, fontWeight: 'bold', marginTop: 10 },
    modal_bottom_view: { width: '60%', marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    modal_button: {
        backgroundColor: Colors.PRIMARY, borderRadius: 5,
        width: 75, alignItems: 'center', justifyContent: 'center', paddingVertical: 8
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'contain'
    },
    heading:{
        fontSize: 18,
        color: Colors.WHITE,
        marginLeft: 10,
        textShadowColor: Colors.BLACK,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        fontWeight: 'bold'
    }
})