import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../Config/Colors';
import { Fonts } from '../Config/Fonts';
// import { useSelector } from 'react-redux';
// import { Fonts } from '../config/Fonts';

const TextComponent = (props) => {
  //   const theme = useSelector(state => state.AppReducer.theme)

  return (
    <Text
      numberOfLines={props?.numberOfLines}
      style={[styles.text,props?.style]}>{props?.text}</Text>
  )
};

export default TextComponent;


const styles = StyleSheet.create({
  text:
    { color: Colors.BLACK, fontSize: 14, fontFamily: Fonts.REGULAR }
});
