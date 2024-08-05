import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { Storage } from '../../utilities/AsyncStorage';
import i18n from '../../translations/i18n';
import Icon, { IconTypes } from '../../components/Icon';
import TextComponent from '../../components/TextComponent';
import Header from '../../components/Header';
import { Colors } from '../../utilities/Colors';
import { Fonts } from '../../utilities/Fonts';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/actions/GeneralAction';


const Languages = () => {

    const dispatch = useDispatch();
    const [selected, setSelected] = useState('en');
    const { t } = useTranslation()

    const arr = [
        {
            id: '1',
            name: 'English',
            value: 'en',
        },
        {
            id: '2',
            name: 'اردو',
            value: 'ur',
        },

    ];

    useEffect(() => {
        getLanguage()
    }, [])

    const getLanguage = async () => {
        let Language = await Storage.getLanguage()
        setSelected(Language ? Language : 'en');
        i18n.changeLanguage(Language ? Language : 'en')
    }

    const onChangeLanguage = async (item) => {
        setSelected(item?.value);
        i18n.changeLanguage(item?.value)
        await Storage.setLanguage(item?.value);
        dispatch(showAlert({ message: t("Language Changed Successfully"), type: 'success' }))
    };

    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    padding: 20,
                    borderBottomColor: Colors?.LGREY,
                    borderBottomWidth: 1,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => onChangeLanguage(item)}>
                    <Icon
                        type={IconTypes.MaterialCommunityIcons}
                        name={
                            selected == item?.value
                                ? 'checkbox-marked'
                                : 'checkbox-blank-outline'
                        }
                        size={25}
                        color={selected == item?.value ? Colors?.PRIMARY : Colors?.BGRAY}
                    />
                </TouchableOpacity>
                <TextComponent
                    text={item.name}
                    style={{  marginLeft: 10}}
                />
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors?.WHITE }}>
            <Header title="Change Language" back />

            <FlatList
                data={arr}
                renderItem={renderItem}
            />
        </View>
    );
};

export default Languages;