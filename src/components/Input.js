import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../utilities/Colors';
import { Fonts } from '../utilities/Fonts';
import TextComponent from './TextComponent';
import Icon, { IconTypes } from './Icon';

const Input = props => {

    const [isPassword, setIsPassword] = useState(props.isPassword);

    return (
        <View style={props?.parentStyle}>
            {
                props?.label &&
                <TextComponent style={styles.text} text={props?.label} />
            }
            <View style={[styles.inputContainer, { ...props?.mainStyle }]}>

                {
                    props?.search &&
                    <AntDesign name={'search1'} color={'#C8C8C8'} size={23} />
                }

                <TextInput
                    style={[styles.input, {  width: props?.search ? '80%' : props?.rightIcon || props?.isPassword ? '90%' : '100%' }, { ...props?.style }]}
                    placeholder={props?.placeholder}
                    placeholderTextColor={Colors.DGREY}
                    value={props?.value}
                    onChangeText={props?.onChangeText}
                    editable={props?.editable}
                    multiline={props?.multiline}
                    numberOfLines={props?.numberOfLines}
                    secureTextEntry={props?.isPassword ? isPassword : props?.secureTextEntry}
                    keyboardType={props?.keyboardType}
                />


                {
                    props?.rightIcon &&
                    <TouchableOpacity onPress={props?.onPressRightIcon}>
                        {props?.rightIcon}
                    </TouchableOpacity>
                }

                {props?.isPassword && (
                    <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
                        {
                            isPassword ?
                                <Icon name={'eye-off'} type={IconTypes.Feather} size={18} color={Colors?.GREY} />
                                :
                                <Icon name={'eye'} type={IconTypes.Feather} size={18} color={Colors?.GREY} />
                        }
                    </TouchableOpacity>
                )}

            </View>
        </View>
    )
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.GREY
    },
    text: {
        fontSize: 12,
        fontFamily: Fonts?.MEDIUM,
        marginBottom: 5
    },
    input: {
        color: '#000',
        fontSize: 12,
        fontFamily: Fonts?.REGULAR,
    },
});