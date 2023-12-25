import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from "../Config/Colors";
import TextComponent from "./TextComponent";
import { Fonts } from "../Config/Fonts";


const Button = (props) => {
    return (
        <TouchableOpacity
            disabled={props?.disabled}
            style={[styles.button,
                 { backgroundColor: props?.light ? Colors?.LIGHT : Colors?.PRIMARY }
                , { ...props?.style }]} onPress={props?.onPress}>
            <TextComponent style={[styles.text, { color: props?.light ? Colors?.PRIMARY : Colors?.WHITE, fontFamily: Fonts?.SEMIBOLD }, { ...props?.text_style }]} text={props?.title} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: 'center',
        width: '90%',
        paddingVertical: 13,
    },
})

export default Button;