import { StyleSheet, Text, View, TextInput, I18nManager, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../Config/Colors';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Fonts } from '../Config/Fonts';

const Input = props => {
    return (
        <View style={[styles.inputContainer, { ...props?.mainStyle }]}>
            {
                props?.leftIcon ?
                    <AntDesign name={'search1'} color={Colors.DGREY} size={20} />
                    : null
            }

            {
                props?.search ?
                    <AntDesign name={'search1'} color={'#C8C8C8'} size={23} />
                    : null
            }

            <TextInput
                style={[styles.input, { ...props?.style }]}
                placeholder={props?.placeholder}
                placeholderTextColor={Colors.DGREY}
                value={props?.value}
                onChangeText={props?.onChangeText}
                editable={props?.editable}
                secureTextEntry={props?.secureTextEntry}
                keyboardType={props?.keyboardType}
            />

            {
                props?.rightIcon ?
                    <Entypo name={'cross'} color={Colors.DGREY} size={20} />
                    : null
            }

            {
                props?.icon ?
                    <TouchableOpacity onPress={props?.onIconPress}>
                        {props?.icon}
                    </TouchableOpacity>
                    : null
            }

            {
                props?.pencil ?
                    <TouchableOpacity onPress={props?.onPencilPress}>
                        <FontAwesome5 name={'pencil-alt'} color={Colors.DGREY} size={18} />
                    </TouchableOpacity>
                    : null
            }

        </View>
    )
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        // justifyContent: 'space-between',
        width: '100%',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        // elevation: 1
    },
    text: {
        fontSize: 14,
    },
    input: {
        color: '#000',
        fontSize: 14,
        width: '85%',
        fontFamily: Fonts?.REGULAR
    },
});