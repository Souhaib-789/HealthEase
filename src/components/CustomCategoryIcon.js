import React from 'react';
import {View, } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../Config/Colors';
// import {useSelector} from 'react-redux';

const CustomCategoryIcon = props => {
  // const theme = useSelector(state => state.AppReducer.theme);
  // const color = props?.color ? props?.color :  (theme ? Colors.BLACK : Colors.WHITE);
  const color =  Colors.WHITE

  return (
    <View>
      {props?.category == 'dentist' ? (
        <FontAwesome5
          size={18}
          color={color}
          name="tooth"
        />
      ) : props?.category == 'dermatologist' ? (
        <FontAwesome6
          size={18}
          color={color}
          name="mask-face"
        />
      )
      : props?.category == 'cardiologist' ? (
        <FontAwesome6
          size={18}
          color={color}
          name="heart-pulse"
        />
      ) : props?.category == 'Vehicle' ? (
        <FontAwesome5
          size={18}
          color={color}
          name="car"
        />
      )
      : props?.category == 'Mobile Phone' ? (
        <FontAwesome5
          size={18}
          color={color}
          name="mobile"
        />
      )
      : props?.category == 'Education' ? (
        <FontAwesome6
          size={18}
          color={color}
          name="graduation-cap"
        />
      ) : props?.category == 'Travel' ? (
        <FontAwesome5
          size={18}
          color={color}
          name="car-side"
        />
      ) : props?.category == 'Bills' ? (
        <FontAwesome6
          size={18}
          color={color}
          name="clipboard-list"
        />
      ) : props?.category == 'Sport' ? (
        <FontAwesome6
          size={18}
          color={color}
          name="table-tennis-paddle-ball"
        />
      ) : props?.category == 'Gift' ? (
        <FontAwesome6
          size={18}
          color={color}
          name="gift"
        />
      ) : props?.category == 'Fuel' ? (
        <FontAwesome6
          size={18}
          color={color}
          name="gas-pump"
        />
      ) : props?.category == 'Rent' ? (
        <Ionicons
          size={18}
          color={color}
          name="home"
        />
      ) : props?.category == 'Medical' ? (
        <MaterialIcons
          size={18}
          color={color}
          name="health-and-safety"
        />
      ) : props?.category == 'Food' ? (
        <MaterialIcons
          size={18}
          color={color}
          name="fastfood"
        />
      ) : props?.category == 'Salary' ? (
        <MaterialCommunityIcons
          size={18}
          color={color}
          name="credit-card-check"
        />
      ) : props?.category == 'Awards' ? (
        <FontAwesome5
          size={18}
          color={color}
          name="trophy"
        />
      ) : props?.category == 'Profit' ? (
        <Entypo
          size={18}
          color={color}
          name="bar-graph"
        />
      ) : props?.category == 'Refunds' ? (
        <MaterialCommunityIcons
          size={18}
          color={color}
          name="credit-card-refund"
        />
      ) : props?.category == 'Grants' ? (
        <MaterialCommunityIcons
          size={18}
          color={color}
          name="account-cash"
        />
      ) : (
        <FontAwesome5
          size={18}
          color={color}
          name="money-check-alt"
        />
      )}
    </View>
  );
};

export default CustomCategoryIcon;