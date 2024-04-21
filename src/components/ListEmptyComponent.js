import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from './TextComponent';
import { Colors } from '../utilities/Colors';
import { Fonts } from '../utilities/Fonts';
import DOC from '../assets/images/noData.png'
import Image from './Image';

const ListEmptyComponent = (props) => {

    return (
        <View style={styles.view}>
            <Image source={props?.image ? props?.image : DOC} style={{width: 70 , height: 70}} resizeMode={'cover'} />
            <TextComponent style={{ color: Colors?.DGREY , fontSize:  props?.short ? 12 : 14, fontFamily: Fonts?.REGULAR, top: 3 }} 
            text={props?.text ? props?.text : 'No Data Found !'} />
        </View>
    );
}

export default ListEmptyComponent;

const styles = StyleSheet.create({
    view: { alignItems: 'center',  gap: 10, alignSelf: 'center', marginTop: 20 },
})