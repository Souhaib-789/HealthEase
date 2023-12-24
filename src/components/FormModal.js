import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal as RNModal,
} from 'react-native';
import React from 'react';
import { Colors } from '../Config/Colors';


const FormModal = props => {

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
                    {props?.children}
                </View>
            </View>
        </RNModal>
    );
};

export default FormModal;

const styles = StyleSheet.create({
    ModalContainer: {
        backgroundColor: Colors.WHITE,
        marginTop: '80%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        // minHeight: 300,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
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