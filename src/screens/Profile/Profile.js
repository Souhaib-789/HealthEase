import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../utilities/Colors";
import Header from "../../components/Header";
import perfil from '../../assets/images/profile.png'
import Image from "../../components/Image";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Avatar from '../../assets/images/avatar.png'
import PersonalInfo from "./PersonalInfo";
import MedicalRecords from "./Medical Info/MedicalInfo";
import { useSelector } from "react-redux";

const Profile = () => {
    const USER = useSelector(state => state.AuthReducer?.user);

    const [activeComponent, setActiveComponent] = React.useState({ name: 'Personal Info' })

    const renderTopTab = (item, index) => {
        let itsActive = item?.name == activeComponent.name

        return (
            <TouchableOpacity key={index} onPress={() => setActiveComponent(item)} style={itsActive ? styles.tab : styles.tabx}  >
                <TextComponent text={item?.name} style={itsActive ? styles.active_tab_text : styles.tab_text} />
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.Container}>
            <Header title={'Profile'} back bell={USER?.user_role != 'doctor'} style={{ backgroundColor: Colors.PRIMARY }}
                titleStyle={{ color: Colors.WHITE }} iconColor={Colors.WHITE} logout={USER?.user_role == 'doctor'} />

            <View style={styles.flex}>
                <Image source={USER?.image_url ? { uri: USER?.image_url } : USER?.image ? { uri: USER?.image } :  Avatar} style={styles.profile_image} resizeMode={'cover'} />
                <TextComponent text={USER?.user_name} style={styles.text} />
            </View>

            {
                USER?.user_role == 'doctor' ?
                    null :
                    (
                        <View style={styles.tab_container}>
                            {[{ id: 1, name: 'Personal Info' }, { id: 2, name: 'Medical Info' }].map(renderTopTab)}
                        </View>
                    )
            }

            {
                activeComponent.name == 'Personal Info' ?
                    <PersonalInfo />
                    :
                    <MedicalRecords />
            }
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    text: {
        color: Colors.WHITE,
        fontSize: 16,
        width: '60%'
    },

    profile_image: {
        width: 70,
        borderRadius: 100,
        height: 70,
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        backgroundColor: Colors.PRIMARY,
        padding: 20
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingVertical: 8,
        borderBottomColor: Colors.WHITE,
        borderBottomWidth: 2,
        width: '45%'
    },
    tabx: {
        borderBottomColor: Colors.GREY,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingVertical: 8,
        width: '45%'
    },
    active_tab_text: {
        color: Colors.WHITE,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: 13,
    },
    tab_text: {
        color: Colors.LGREY,
        fontFamily: Fonts.REGULAR,
        fontSize: 13,
    },
    tab_container: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        backgroundColor: Colors.PRIMARY,
    },
})