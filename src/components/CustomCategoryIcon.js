import React from 'react';
import { View, } from 'react-native';
import { Colors } from '../utilities/Colors';
import Image from './Image';
import Icon, { IconTypes } from './Icon';

const CustomCategoryIcon = props => {

  const color = props?.color ? props?.color : Colors.WHITE
  const Size = props?.size ? props?.size : 18;

  return (
    <View>
      {props?.category == 'dentist' ? (
        <Icon type={IconTypes?.FontAwesome5} name="tooth" size={Size} color={color} />

      ) : props?.category == 'dermatologist' ? (
        <Icon type={IconTypes?.FontAwesome6} name="mask-face" size={Size} color={color} />
      )
        : props?.category == 'cardiologist' ? (
          <Icon type={IconTypes?.FontAwesome6} name="heart-pulse" size={Size} color={color} />

        ) : props?.category == 'neurologist' ? (
          <Icon type={IconTypes?.MaterialCommunityIcons} name="brain" size={Size} color={color} />
        )
          : props?.category == 'gastroenterologist' ? (
            <Icon type={IconTypes?.MaterialCommunityIcons} name="stomach" size={Size} color={color} />
          )
            : props?.category == 'physio therapist' || props?.category == 'physiotherapist' ? (
              <Icon type={IconTypes?.Ionicons} name="body" size={Size} color={color} />
            )
              : props?.category == 'all' ? (
                <Icon type={IconTypes?.Entypo} name="list" size={Size} color={color} />
              )
                : (
                  <Image source={require('../assets/images/doc.png')}
                    tintColor={Colors?.PRIMARY}
                    style={{ height: Size, width: Size }} />
                )}
    </View>
  );
};

export default CustomCategoryIcon;