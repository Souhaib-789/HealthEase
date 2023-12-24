import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {Colors} from '../Config/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_view}>
          <Ionicons name={'chevron-back'} size={20} color={Colors.BLACK} />
        </TouchableOpacity>
     
      
      <Text style={[styles.heading, {color: props?.titleColor ? props?.titleColor : Colors.BLACK }]}>{props?.title}</Text> 
      </View>

      {
        props?.cartIcon ?
        <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
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
    height: 70,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.Placeholder,
    borderBottomWidth: 0.2,
    paddingTop: 15,
    paddingHorizontal:10,
    alignItems: 'center',
  },
  back_view:{
    backgroundColor: Colors.WHITE,
    padding: 5,
    borderRadius: 10
  },

  heading: {
    color: Colors.BLACK,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15
  },
});