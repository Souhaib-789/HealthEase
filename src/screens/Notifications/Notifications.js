import React from "react";
import { FlatList, StyleSheet,  View } from "react-native";
import TextComponent from "../../components/TextComponent";
import Image from "../../components/Image";
import Header from "../../components/Header";
import BELL from '../../assets/images/bell.png';
import Icon, { IconTypes } from "../../components/Icon";
import { Colors } from "../../utilities/Colors";
import { Fonts } from "../../utilities/Fonts";

const Notifications = () => {


    const renderItem = ({ item, index}) => {
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <Image source={BELL} style={styles.image}  />
                    <View style={{width: '85%'}}>
                        <TextComponent text={'Appointment Alert!'} style={styles.text} />
                        <TextComponent text={'You have an appointment today with mr jack at 11:00 PM. '} numberOfLines={1} style={styles.span} />
                    </View>
                </View>
                <Icon name='circle' size={10} color={'#03C03C'} type={IconTypes.FontAwesome} style={{position: 'absolute', left: 20, top: 17}} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
        <Header title="Notifications" back  profile/>
            <FlatList
                data={[1,2,3,4,5,6]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}


export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
    },

    card: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        elevation: 3
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    image: { width: 20, height: 20},
    text: { fontSize: 14, top: 5, fontFamily: Fonts?.MEDIUM },
    span: { fontSize: 11,  marginTop: 5},
    icon: { width: 20, height: 20 },
})