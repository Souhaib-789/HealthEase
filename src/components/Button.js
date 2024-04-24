import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from "../utilities/Colors";
import TextComponent from "./TextComponent";
import { Fonts } from "../utilities/Fonts";


const Button = (props) => {
    return (
        <TouchableOpacity
            disabled={props?.disabled}
            style={[styles.button,
                 { backgroundColor: props?.light ? Colors?.LIGHT : Colors?.PRIMARY , borderWidth: props?.light ? 1 : 0, borderColor: Colors?.PRIMARY}
                , { ...props?.style }]} onPress={props?.onPress}>

                    {
                        props?.icon && props?.icon
                    }
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
        flexDirection: 'row',
        gap: 10
    },
    text: {
        fontSize: 12,
    }
})

export default Button;