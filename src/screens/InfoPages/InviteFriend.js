import React, { useState } from "react";
import { Alert, Share, StyleSheet, TouchableOpacity, View } from "react-native";
import TextComponent from "../../components/TextComponent";
import Header from "../../components/Header";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import { Colors } from "../../utilities/Colors";
import INVITE from '../../assets/images/invite.png'


const InviteFriend = () => {
    const link = 'https://www.healthease.com'


    const onShare = async () => {
        try {
            Share.share({
                message: link,
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Invite Friends" back  />
                <Image source={INVITE} style={{width: 170 , height: 170 , marginTop: 50, alignSelf: 'center'}} resizeMode={'cover'} />
                <TextComponent text={"Invite your friends so they can also avail easy health treatment"} style={styles.sub_heading} />

                    <TextComponent text={link} style={styles.span} />

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }} onPress={onShare}>
                    <Icon name='share-alt' type={IconTypes.FontAwesome5} size={25} color={Colors.PRIMARY} />
                </TouchableOpacity>


        </View>
    )
}


export default InviteFriend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.WHITE,
    },
    sub_heading: { width: '80%', fontSize: 13, alignSelf: 'center', marginVertical: 20, textAlign: 'center' },
    span: { fontSize: 13, alignSelf: 'center', marginVertical: 10, color: Colors.DGREY },
})