import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const BgImage = ({src}) => {
  return (
    <View style={{position: 'absolute'}}>

    </View>
    // <Image
    //   source={src ? src : require('../assets/images/bg.png')}
    //   resizeMode="stretch"
    //   style={{...StyleSheet.absoluteFill, height: '100%', width: '100%'}}
    // />
  );
};

export default BgImage;

const styles = StyleSheet.create({});