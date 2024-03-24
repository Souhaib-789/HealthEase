import { StyleSheet, View, Modal as RNModal, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../utilities/Colors';
import Icon, { IconTypes } from './Icon';

const FormModal = props => {
    return (
        <RNModal
            animationType={'fade'}
            transparent={true}
            visible={props?.visible}
            onRequestClose={props?.onClose}>
            <View style={styles.modal_parent}>
                <View style={styles.ModalContainer}>
                    <TouchableOpacity onPress={props?.onClose} style={styles.icon}>
                        <Icon name="close" type={IconTypes.AntDesign} color={Colors.DGREY} size={15} />
                    </TouchableOpacity>
                    {props?.children}
                </View>
            </View>
        </RNModal>
    );
};

export default FormModal;

const styles = StyleSheet.create({
    modal_parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    ModalContainer: {
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
        borderRadius: 20,
        width: '90%',
    },
    icon: {
        alignSelf: 'flex-end',
        position: 'relative',
        right: 15, top: 10
    }
});