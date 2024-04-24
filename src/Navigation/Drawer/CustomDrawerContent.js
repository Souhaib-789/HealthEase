import { TouchableOpacity, Text, View, StyleSheet, Modal as RNModal, Image, } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useState } from 'react';
import { Colors } from "../../utilities/Colors";
import profile from '../../assets/images/profile.png'
import bg from '../../assets/images/logo.png'
import TextComponent from '../../components/TextComponent';
import { FlatList } from 'react-native-gesture-handler';
import { Fonts } from '../../utilities/Fonts';
import Icon, { IconTypes } from '../../components/Icon';
import { Storage } from '../../utilities/AsyncStorage';
import { useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions/AuthAction';

function CustomDrawerContent(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    const screens = [
        {
            id: 1,
            screenName: 'Profile',
            goto: 'Profile',
            icon: <Icon type={IconTypes.Feather} name={'user'} size={18} />
        },

        // {
        //     id: 3,
        //     screenName: 'Diagnostics Tests',
        //     goto: 'DiagnosticsTests',
        //     icon: <Icon type={IconTypes.Entypo} name={'lab-flask'} size={18} />

        // },
        {
            id: 4,
            screenName: 'Invite a Friend',
            goto: 'InviteFriend',
            icon: <Icon type={IconTypes.Octicons} name={'person-add'} size={18} />
        },
        {
            id: 5,
            screenName: 'About Us',
            goto: 'About',
            icon: <Icon type={IconTypes.AntDesign} name={'infocirlceo'} size={18} />
        },
        {
            id: 5,
            screenName: 'Support',
            goto: 'Support',
            icon: <Icon type={IconTypes.Feather} name={'help-circle'} size={18} />
        },
    ]

    const openModal = () => {
        setModalVisible(true)
    }

    const cancelModal = () => {
        setModalVisible(false)
    }

    const onPressLogout = async () => {
            setModalVisible(false)
            Storage.clearStorage();
            dispatch(Logout());
            navigation.goBack()
    }



    const renderOptionItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(item?.goto)}
                key={index}
                style={{
                    flexDirection: 'row',
                    margin: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                }}>
                <View>{item?.icon}</View>
                <TextComponent style={{ marginLeft: 10, fontSize: 13, color: Colors.BLACK, }} text={item?.screenName} />
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Image source={bg} style={styles.bg_icon} tintColor={Colors.PRIMARY} />

            <View style={styles.profile_view}>
                <Image source={profile} style={styles.image} />
                <TextComponent style={styles.heading} text={'Andrew Ainsley'} />
            </View>
            <DrawerContentScrollView  {...props} showsVerticalScrollIndicator={false}>

                <FlatList
                    data={screens}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderOptionItem}
                />

                <TouchableOpacity style={styles.btn} onPress={openModal}  >
                    <Icon type={IconTypes.MaterialIcons} name={'logout'} color={Colors.RED} size={20} />
                    <TextComponent style={styles.btntxt} text={'Logout'} />
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
                        <Text style={styles.modal_heading}>Hold on !</Text>
                        <Text style={{ marginVertical: 5 }}>are you sure to want to logout ?</Text>

                        <View style={styles.modal_bottom_view}>
                            <TouchableOpacity style={styles.modal_button} onPress={cancelModal}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modal_button} onPress={onPressLogout}>
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
        fontSize: 13,
        color: Colors.RED,
        fontFamily: Fonts?.SEMIBOLD
    },
    bg_icon: {
        width: 120,
        height: 120,
        opacity: 0.1,
        alignSelf: 'flex-end',
        top: 50,
        right: 5,
        position: 'absolute'
    },
    profile_view: {
        marginBottom: 30,
        flexDirection: 'row',
        paddingTop: 80,
        alignItems: 'center',
        padding: 15
    },
    btn: {
        marginTop: 200,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        marginLeft: 30
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
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: 16,
        color: Colors.BLACK,
        marginLeft: 13,
        fontFamily: Fonts?.SEMIBOLD
    }
})