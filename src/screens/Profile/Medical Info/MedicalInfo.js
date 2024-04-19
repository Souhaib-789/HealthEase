import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../utilities/Colors'
import Icon, { IconTypes } from '../../../components/Icon'
import TextComponent from '../../../components/TextComponent'

const MedicalInfo = () => {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.wide_row}>
                <View style={styles.row}>
                    <Icon name={'clipboard-text-outline'} type={IconTypes.MaterialCommunityIcons} size={20} color={Colors.PRIMARY} />
                    <TextComponent text={'Prescriptions'} style={{ color: Colors.PRIMARY, fontSize: 14 }} />
                </View>

                <Icon name={'keyboard-arrow-down'} type={IconTypes.MaterialIcons} size={20} color={Colors.BLACK} />
            </TouchableOpacity>
        </View>
    )
}

export default MedicalInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 15
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    wide_row: { backgroundColor: Colors.WHITE , elevation: 5 , borderRadius: 8 , marginVertical: 15, padding: 12 , flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
})