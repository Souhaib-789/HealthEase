import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import { Colors } from '../Config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FavDoctors from '../screens/FavDoctors/FavDoctors';
import Profile from '../screens/Profile/Profile';
import Pharmacy from '../screens/Pharmacy/Pharmacy';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (

    <Tab.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          if (route?.name == 'Home') {
            ICON = <Ionicons name={'home-sharp'} size={23} color={color} />
          } else if (route?.name == 'FavDoctors') {
            ICON = <Ionicons name={'heart'} size={23} color={color} />
          } else if (route?.name == 'Pharmacy') {
            ICON = <MaterialCommunityIcons name={'shopping'} size={23} color={color} />
          } else if (route?.name == 'Profile') {
            ICON = <MaterialIcons name={'person-outline'} size={23} color={color} />
          }
          return ICON;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.WHITE,
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.DDGREY,
        tabBarItemStyle: { borderRadius: 100, marginHorizontal: 20, marginVertical: 4 },
        tabBarStyle: { paddingTop: 2, backgroundColor: 'white', height: 58, borderTopWidth: 0, borderTopEndRadius: 20, borderTopLeftRadius: 20 },

      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="FavDoctors" component={FavDoctors} options={{ headerShown: false }} />
      <Tab.Screen name="Pharmacy" component={Pharmacy} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>

  );
}