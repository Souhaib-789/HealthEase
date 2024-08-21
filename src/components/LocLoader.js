import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Colors } from '../utilities/Colors';

export const LocLoader = (props) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props?.visible} >
            <View style={styles.container} >

                <Spinner
                    isVisible={true}
                    color={Colors.PRIMARY}
                    size={180}
                    type={'Pulse'}
                />


            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(00, 00, 00, 0.2)",
        alignItems: 'center',
        justifyContent: 'center',
    },
    sub_container: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 40
    },
});