import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../utilities/Colors';
import { Fonts } from '../utilities/Fonts';
import { useTranslation } from 'react-i18next';


const TextComponent = (props) => {
  const { t } = useTranslation();

  return (
    <Text
      numberOfLines={props?.numberOfLines}
      onTextLayout={props?.onTextLayout}
      style={[styles.text,props?.style]}>{t(props?.text)}</Text>
  )
};

export default TextComponent;


const styles = StyleSheet.create({
  text:
    { color: Colors.BLACK, fontSize: 14, fontFamily: Fonts.REGULAR , top: 2 }
});
