import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from './TextComponent';
import Icon, { IconTypes } from './Icon';
import { Colors } from '../Config/Colors';
import { Fonts } from '../Config/Fonts';


const ListEmptyComponent = (props) => {

    return (
        <View style={styles.view}>
            <Icon name='unknowfile1' type={IconTypes?.AntDesign} size={ props?.short ? 22 : 27} color={Colors?.GREY} />
            <TextComponent style={{ color: Colors?.GREY , fontSize:  props?.short ? 12 : 14, fontFamily: Fonts?.REGULAR, top: 3 }} text={props?.text ? props?.text : 'No Data Found !'} />
        </View>
    );
}

export default ListEmptyComponent;

const styles = StyleSheet.create({
    view: { alignItems: 'center',  gap: 10, alignSelf: 'center', marginTop: 20 },
})