import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal as RNModal,
} from 'react-native';
import React from 'react';
import { Colors } from '../utilities/Colors';
import TextComponent from './TextComponent';


const SuccessModal = props => {

    return (
        <RNModal
            animationType={'fade'}
            transparent={true}
            visible={props?.visible}
            onRequestClose={() => { }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={styles.ModalContainer}>
                    {props.children}
                    {props.close ? (
                        <TouchableOpacity
                            style={[styles.ViewFooter, { ...props.styles }]}
                            onPress={props.OnClose}>
                            <TextComponent style={[styles.lang, { ...props.textStyle }]}
                                text={props.text ? props.text : 'Close'}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </RNModal>
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    ModalContainer: {
        backgroundColor: Colors.WHITE,
        marginTop: 25,
        borderRadius: 20,
        width: '85%',
        minHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lang: {
        fontSize: 14,
        color: Colors.WHITE,
        textAlign: 'center',
    },
    ViewFooter: {
        width: '80%',
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
    },
});