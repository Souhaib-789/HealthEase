import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal as RNModal,
} from 'react-native';
import React from 'react';
import { Colors } from '../Config/Colors';


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
                            <Text style={[styles.lang, { ...props.textStyle }]}>

                                {props.text ? props.text : 'Close'}
                            </Text>
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
        fontSize: 16,
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