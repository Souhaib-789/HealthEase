import React, { useState } from "react";
import { FlatList, LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";
import TextComponent from "./TextComponent";
import Icon, { IconTypes } from "./Icon";
import { Colors } from "../utilities/Colors";

const Dropdown = (props) => {
  const [openDropdown, setopenDropdown] = useState(false);

  const renderItem = ({ item, index }) => {
    const focus =  item?.id == props?.state?.id;

    return (
      <TouchableOpacity
        style={[styles.optionContainer, { ...props.optionStyle }]}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          props.setState(item);
          setopenDropdown(false);
        }}
      >
        <Icon type={IconTypes?.AntDesign} name={"checkcircle"} color={focus ? Colors?.PRIMARY : Colors?.GREY} size={18} />
        <TextComponent text={item?.name} style={{ fontSize: 10, width: "59%", ...props.textStyle, zIndex: 999, }} />
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <TextComponent text={"No options found"} style={{ fontSize: 12 , alignSelf: "center", margin: 5, color: Colors?.BLACK }} />
    );
  };

  return (
    <View style={[styles.inputContainer, { ...props.style, zIndex: 1990 }]}  >

    
        <TouchableOpacity onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.linear); setopenDropdown(!openDropdown); }}
          style={styles.innerContainer}    >
          <TextComponent
            text={props.state?.name ? props.state?.name : props?.placeholder}
            numberOfLines={1}
            style={{
              color: props?.state ? Colors?.BLACK : Colors?.DGREY,
              fontSize: 12,
            }}
          />
          <Icon type={IconTypes?.MaterialIcons} name={openDropdown ? "arrow-drop-up" : "arrow-drop-down"} color={Colors?.DGREY} size={30} />
        </TouchableOpacity>

      {openDropdown && (
        <View
          style={[
            styles.openDropdownContainer,
            {
              maxHeight: 150,
              position: "absolute",
              top: "127%",
              right: props.isRelative ? null : -12,
            },
          ]}
        >
          <FlatList
            nestedScrollEnabled
            data={props?.array}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
    gap: 5,
    paddingHorizontal: 10,
    borderColor: Colors.GREY,
    backgroundColor: Colors?.INPUT_BG,

  },
  label: {
    fontSize: 14,
    marginLeft: 18,
    marginBottom: 10,
  },
  innerContainer: {
    width: "100%",
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  openDropdownContainer: {
    marginRight: 22,
    backgroundColor: Colors?.WHITE,
    borderColor: Colors?.BORDER,
    elevation: 4,
    width: 130,
    padding: 5,
    alignSelf: "flex-end",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 999,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
  },
});

export default Dropdown;