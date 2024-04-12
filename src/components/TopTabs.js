import React from 'react';
import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import TextComponent from './TextComponent';
import { Colors } from '../utilities/Colors';
import { Fonts } from '../utilities/Fonts';

const TopTab = props => {

  return (
    <View
      style={[styles.container, props.style ]}>
      {props?.options?.map((item, index) => {
        let itsActive = item?.name == props?.focused;
        return (
          <TouchableOpacity
            key={index}
            style={[
              item?.name == props?.focused ? styles.tab : styles.tabx,
              { width: props.width ? props.width : '45%'},
            ]}
            onPress={() => props?.onActivePress(item)}>
            <TextComponent
              style={{
                color: itsActive ? Colors.PRIMARY : Colors.DGREY,
                  fontFamily: itsActive ? Fonts.SEMIBOLD : Fonts.REGULAR,
                fontSize: 13,
                ...props.textstyle,
              }}
              text={item?.name}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 8,
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 2,
  },
  tabx: {
    borderBottomColor: Colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 8,
  },
});