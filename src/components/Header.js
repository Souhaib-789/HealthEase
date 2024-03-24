import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../utilities/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import TextComponent from './TextComponent';
import { Fonts } from '../utilities/Fonts';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={[styles.header , {...props?.style}]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {
          props?.backIcon &&
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_view}>
            <Ionicons name={'chevron-back'} size={18} color={Colors.BLACK} />
          </TouchableOpacity>
        }
        <TextComponent style={[styles.heading, { color: props?.titleColor ? props?.titleColor : Colors.BLACK }]} text={props?.title} />
      </View>

      {
        props?.cartIcon ?
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Feather name={'shopping-cart'} size={25} color={Colors.PRIMARY} />
          </TouchableOpacity>
          : null
      }

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 65,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back_view: {
    backgroundColor: Colors.WHITE,
    padding: 5,
    marginLeft: 5,
    borderRadius: 10,
    elevation: 3
  },

  heading: {
    color: Colors.BLACK,
    fontSize: 16,
    fontFamily: Fonts?.SEMIBOLD
  },
});