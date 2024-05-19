import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../utilities/Colors';
import { Fonts } from '../utilities/Fonts';
// import { useSelector } from 'react-redux';
// import { Fonts } from '../utilities/Fonts';

const TextComponent = (props) => {
  //   const theme = useSelector(state => state.AppReducer.theme)

  return (
    <Text
      numberOfLines={props?.numberOfLines}
      onTextLayout={props?.onTextLayout}
      style={[styles.text,props?.style]}>{props?.text}</Text>
  )
};

export default TextComponent;


const styles = StyleSheet.create({
  text:
    { color: Colors.BLACK, fontSize: 14, fontFamily: Fonts.REGULAR , top: 2 }
});
