import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Image from '../components/Image';
import bellIcon from '../assets/images/bell.png'
import TextComponent from './TextComponent';
import Icon, { IconTypes } from './Icon';
import { Colors } from '../utilities/Colors';
import { Fonts } from '../utilities/Fonts';
import AVATAR from '../assets/images/avatar.png'
import { useSelector } from 'react-redux';


const Header = props => {
  const navigation = useNavigation();
  const USER_DATA = useSelector(state => state.AuthReducer.user)

  return (
    <View style={[styles.container, { ...props?.style, justifyContent: props?.chat ? 'flex-start' : 'space-between' }]}>
      <View style={{ width: props?.chat ? '12%' : '20%', }}>
        {
          props?.back ?
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_icon}>
              <Icon name="chevron-back" size={18} color={props?.iconColor ? props?.iconColor : Colors.BLACK} type={IconTypes.Ionicons} />
            </TouchableOpacity>
            : null
        }
      </View>


      <TextComponent text={props?.title} numberOfLines={2} style={[styles.heading , {...props?.titleStyle}]} />



      <View style={styles.view_b}>
        {
          props?.bell &&
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} >
            <Image source={bellIcon} style={styles.icon_image} tintColor={Colors.PRIMARY} />
          </TouchableOpacity>
        }

        {
          props?.profile &&
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
            <Image source={USER_DATA?.image_url ? { uri: USER_DATA?.image_url } : AVATAR} style={styles.profile_image} resizeMode='cover'  />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};


export default Header;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    height: 60,
    zIndex: 199,
  },
  view_b: {
    width: '20%',
    alignItems: 'flex-end',

  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  callImg: {
    height: 17,
    width: 17,
    resizeMode: "contain"
  },
  back_icon: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.GREY
  },
  videoImg: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  heading: {
    fontSize: 15,
    color: Colors.BLACK,
    fontFamily: Fonts.SEMIBOLD
  },
  icon_image: {
    width: 20,
    height: 20,
    color: Colors.PRIMARY
  },
  profile_image: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});