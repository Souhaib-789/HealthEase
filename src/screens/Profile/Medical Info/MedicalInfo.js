import { LayoutAnimation, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../utilities/Colors'
import Icon, { IconTypes } from '../../../components/Icon'
import TextComponent from '../../../components/TextComponent'
import { useNavigation } from '@react-navigation/native'

const MedicalInfo = () => {

    const [onExpand, setOnExpand] = useState(false)
    const navigation = useNavigation();
    const details = 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat. vestibulum nunc sit amet, ultrices libero. Nulla facilisi. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices libero. Nulla facilisi. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices libero. Nulla facilisi. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices libero. Nulla facilisi. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices libero. Nulla facilisi.'

    const onShare = async () => {
        try {
           Share.share({
            message: details
          });
        } catch (error) {
          Alert.alert(error.message);
        }
      };
    return (
        <View style={styles.container}>

            {/* <TouchableOpacity style={styles.item}
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setOnExpand(!onExpand)
                }}>
                <View style={styles.wide_row} >
                    <View style={styles.row}>
                        <Icon name={'clipboard-text-outline'} type={IconTypes.MaterialCommunityIcons} size={20} color={Colors.PRIMARY} />
                        <View>
                            <TextComponent text={'Prescriptions'} style={{ color: Colors.PRIMARY, fontSize: 14 }} />
                            <TextComponent text={'20-Oct-2024'} style={{ fontSize: 10 }} />
                        </View>
                    </View>
                    <Icon name={onExpand ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} type={IconTypes.MaterialIcons} size={20} color={Colors.BLACK} />
                </View>
                {
                    onExpand &&
                    <>
                        <TextComponent text={details} style={styles.text} />
                        <TextComponent text={'10 Oct 2024'} style={styles.text} />
                        <View style={styles.wide_row}>
                            <TextComponent text={'By Doctor Mathews Dall'} style={styles.text} />
                            <TouchableOpacity onPress={onShare}>
                                <Icon name={'share-social-outline'} type={IconTypes.Ionicons} size={20} color={Colors.PRIMARY} />
                            </TouchableOpacity>
                        </View>
                    </>
                }

            </TouchableOpacity> */}

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Records')}>
                <View style={styles.wide_row} >
                    <View style={styles.row}>
                        <Icon name={'document-attach-outline'} type={IconTypes.Ionicons} size={20} color={Colors.PRIMARY} />
                        <TextComponent text={'Medical Records'} style={{ color: Colors.PRIMARY, fontSize: 14 }} />
                    </View>
                    <Icon name={'keyboard-arrow-right'} type={IconTypes.MaterialIcons} size={20} color={Colors.BLACK} />
                </View>
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
    wide_row: {

        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'
    },
    item: {
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        marginVertical: 15, padding: 12,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: { color: Colors.BLACK, fontSize: 12, margin: 8 }
})