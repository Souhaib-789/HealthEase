import React, { useState } from "react";
import { View, StyleSheet, FlatList, } from "react-native";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Header from "../../components/Header";
import BotIcon from "../../assets/images/bot.png";
import Image from "../../components/Image";
import Avatar from "../../assets/images/avatar.png";
import perfil from "../../assets/images/profile.jpg";
import moment from "moment";
import Input from "../../components/Input";
import Icon, { IconTypes } from "../../components/Icon";
import ChatLoader from "../../components/ChatLoader";

const HealthbotChat = () => {
    const user = { id: 1 }
    const [message, setMessage] = useState(null)
    const [loader, setLoader] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const [ChatList, setChatList] = useState([
        {
            id: 1,
            message: 'Oh , Thats great Thank you ',
            type: 'text',
            createdAt: new Date(),
            user: {
                id: 1,
            },
        },
        {
            id: 2,
            message: 'Yeah sure , You should drink corn soup , and avoid eating ice-cream and drinking juices',
            createdAt: new Date(),
            type: 'text',
            user: {
                id: 2,
            },
        },
        {
            id: 3,
            message: "I'm feeling very cold , can you suggest anything that can releif me?",
            type: 'text',
            createdAt: new Date(),
            user: {
                id: 1,
            },
        },
        {
            id: 4,
            message: 'Hii ! Andrew how are you feeling today ?',
            type: 'text',
            createdAt: new Date(),
            user: {
                id: 2,
            },
        },

    ])

    const renderChatItem = ({ item }) => {
        if (item?.user?.id != user?.id) {
            return (
                <View style={styles.healthbot_main_chat_item}>
                    <Image source={BotIcon} style={styles.bot_image} />
                    <View>
                        <View style={styles.healthbot_chat_item}>
                            <TextComponent text={item?.message} style={styles.message} />
                        </View>
                        <TextComponent text={moment(item?.createdAt).fromNow()} style={styles.chat_time} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.person_main_chat_item}>
                    <View>
                        <View style={styles.person_chat_item}>
                            <TextComponent text={item?.message} style={[styles.message, { color: Colors?.WHITE }]} />
                        </View>
                        <TextComponent text={moment(item?.createdAt).fromNow()} style={[styles.chat_time, { alignSelf: 'flex-start' }]} />
                    </View>
                    <Image source={perfil ? perfil : Avatar} style={styles.bot_image} resizeMode={'cover'} />
                </View>
            );
        }
    };

    const onSendMessage = () => {
        let copy_arr = []
        copy_arr.push({
            message: message,
            type: 'text',
            createdAt: new Date(),
            user: {
                id: 1,
            },
        })
        setChatList([ ...copy_arr , ...ChatList])
        setMessage(null)
        setRefreshing(!refreshing)
    }

    return (
        <View style={styles.Container}>
            <Header title={"Healthbot"} back />
            <FlatList
                style={{ flex: 1 , width: '95%' , alignSelf: 'center' }}
                showsVerticalScrollIndicator={false}
                data={ChatList}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={renderChatItem}
                inverted={ChatList.length > 0 ? true : false}
            />

            {
                loader &&

                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Image source={BotIcon} style={styles.bot_image} />
                    <View style={{ height: 70 }}>
                        <ChatLoader />
                    </View>
                </View>
            }


            <Input
                placeholder={'Type a message'}
                value={message}
                extraData={refreshing}
                onChangeText={(e) => setMessage(e)}
                onPressRightIcon={onSendMessage}
                mainStyle={styles.input}
                rightIcon={<Icon name={'send'} type={IconTypes.Ionicons} size={20} color={Colors.PRIMARY} />}
            />


        </View>
    )
}

export default HealthbotChat;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    bot_image: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    message: {
        fontSize: 13,
        fontFamily: Fonts?.REGULAR
    },
    person_main_chat_item: {
        paddingVertical: 8,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        width: '65%',
        // marginVertical: 5,
    },

    person_chat_item: {
        backgroundColor: Colors.PRIMARY,
        padding: 12,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        marginRight: 10,
    },
    healthbot_main_chat_item: {
        paddingVertical: 8,
        flexDirection: 'row',
        width: '70%',
        marginVertical: 5,
    },

    healthbot_chat_item: {
        backgroundColor: Colors.LIGHT_GREY,
        padding: 12,
        marginLeft: 10,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    chat_time: {
        fontSize: 10,
        color: Colors.GREY,
        alignSelf: 'flex-end',
        marginTop: 5,

    },
    input: {
        marginVertical: 10,
        paddingVertical: 3,
        borderWidth: 0,
        backgroundColor: Colors.WHITE,
        elevation: 5,

    }
})