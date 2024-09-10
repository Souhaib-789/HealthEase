import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, } from "react-native";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Header from "../../components/Header";
import BotIcon from "../../assets/images/bot.png";
import Image from "../../components/Image";
import Avatar from "../../assets/images/avatar.png";
import moment from "moment";
import Input from "../../components/Input";
import Icon, { IconTypes } from "../../components/Icon";
import ChatLoader from "../../components/ChatLoader";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/actions/GeneralAction";
import { askHealthbot } from "../../apis/Gemini";
import { saveChat } from "../../redux/actions/HealthbotActions";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const HealthbotChat = () => {
    const user = { id: 1 }
    const dispatch = useDispatch()
    const [message, setMessage] = useState(null)
    const [loader, setLoader] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const XList = useSelector(state => state.HealthbotReducer?.chatList)
    // console.log('XList', JSON.stringify(XList, null, 8))
    const {t} = useTranslation()
    const [isTextShown, setisTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const USER = useSelector(state => state.AuthReducer?.user);

    const renderChatItem = ({ item }) => {
        if (item?.user?.id != user?.id) {
            return (
                <View style={styles.healthbot_main_chat_item}>
                    <Image source={BotIcon} style={styles.bot_image} />
                    <View>
                        <View style={styles.healthbot_chat_item}>
                            {
                                item?.message?.length > 50 ?
                                    <>
                                        <TextComponent
                                            onTextLayout={onTextLayout}
                                            numberOfLines={isTextShown ? undefined : 8}
                                            text={item?.message} style={styles.message} />
                                        {lengthMore && (
                                            <TouchableOpacity onPress={toggleNumberOfLines}>
                                                <TextComponent text={isTextShown ? 'Read Less' : 'Read More'} style={[styles.message, { color: Colors.PRIMARY, fontSize: 12 }]} />
                                            </TouchableOpacity>
                                        )}
                                    </>
                                    :
                                    <TextComponent text={item?.message} style={styles.message} />
                            }
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
                    <Image source={USER?.image_url ? {uri: USER?.image_url} : USER?.image ? {uri: USER?.image } : Avatar} style={styles.bot_image} resizeMode={'cover'} />
                </View>
            );
        }
    };

    const onSendMessage = async () => {
        if (!message) {
            dispatch(showAlert({ message: 'Please enter a message' }))
        } else {
            setMessage(null)
            setLoader(true)
            let copy_arr = [...XList]
            copy_arr.unshift({
                message: message,
                type: 'text',
                createdAt: new Date(),
                user: {
                    id: 1,
                },
            })
            dispatch(saveChat([...copy_arr]))

            await askHealthbot(message)
                .then(response => {
                    copy_arr.unshift({
                        message: response,
                        type: 'text',
                        createdAt: new Date(),
                        user: {
                            id: 2,
                        },
                    })
                    dispatch(saveChat([...copy_arr]))
                    setLoader(false)
                })
                .catch(error => {
                    console.error(error)
                    setLoader(false)
                }

                )
            setRefreshing(!refreshing)
        }
    }

    const toggleNumberOfLines = () => {
        setisTextShown(!isTextShown);
    };

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4);
    }, []);

    return (
        <View style={styles.Container}>
            <Header title={"Healthbot"} back />
            <FlatList
                style={{ flex: 1, width: '95%', alignSelf: 'center' }}
                showsVerticalScrollIndicator={false}
                data={XList}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={renderChatItem}
                inverted={XList.length > 0 ? true : false}
                ListEmptyComponent={
                    <ListEmptyComponent short text={'No Chats Found'} />
                }
            />

            {
                loader &&

                <View style={{ flexDirection: "row", alignItems: 'center', marginLeft: 10 }}>
                    <Image source={BotIcon} style={styles.bot_image} />
                    <View style={{ height: 80 }}>
                        <ChatLoader />
                    </View>
                </View>
            }


            <Input
                placeholder={t('Type a message')}
                value={message}
                extraData={refreshing}
                onChangeText={(e) => setMessage(e)}
                onPressRightIcon={loader ? null : onSendMessage}
                mainStyle={styles.input}
                editable={!loader}
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
        fontFamily: Fonts?.REGULAR,
        lineHeight: 22,
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
        width: '75%',
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
        marginVertical: 15,
        paddingVertical: 3,
        borderWidth: 0,
        backgroundColor: Colors.WHITE,
        elevation: 5,
        width: '90%',

    }
})