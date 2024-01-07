import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../Config/Colors';
import { Fonts } from '../Config/Fonts';
import TextComponent from './TextComponent';

const Input = props => {
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
                    style={[styles.input, { width: props?.search ? '80%' : props?.rightIcon ?  '90%' : '100%' }, { ...props?.style }]}
                    placeholder={props?.placeholder}
                    placeholderTextColor={Colors.DGREY}
                    value={props?.value}
                    onChangeText={props?.onChangeText}
                    editable={props?.editable}
                    secureTextEntry={props?.secureTextEntry}
                    keyboardType={props?.keyboardType}
                />


                {
                    props?.rightIcon &&
                    <TouchableOpacity onPress={props?.onPressRightIcon}>
                        {props?.rightIcon}
                    </TouchableOpacity>
                }

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
        fontSize: 14,
        fontFamily: Fonts?.MEDIUM,
        marginBottom: 8
    },
    input: {
        color: '#000',
        fontSize: 14,
        fontFamily: Fonts?.REGULAR,
    },
});