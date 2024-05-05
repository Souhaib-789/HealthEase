import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import { Colors } from '../utilities/Colors';
import FavDoctors from '../screens/FavDoctors/FavDoctors';
import Healthbot from '../screens/Healthbot/Healthbot';
import Icon, { IconTypes } from '../components/Icon';
import Appointments from '../screens/Appointment';
import Image from '../components/Image';
import DoctorHome from '../screens/Home/DoctorHome';
import { useSelector } from 'react-redux';
import HospitalDoctors from '../screens/Doctors/HospitalDoctors';
import HospitalHome from '../screens/Home/HospitalHome';
import HospitalProfile from '../screens/Profile/HospitalProfile';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

  const USER = useSelector(state => state.AuthReducer?.user);
  return (

    <Tab.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          if (route?.name == 'Home') {
            ICON = <Icon type={IconTypes?.AntDesign} name={'home'} size={23} color={color} /> 
          } else if (route?.name == 'FavDoctors') {
            ICON = <Icon type={IconTypes?.Ionicons} name={'heart-outline'} size={23} color={color} />
          } else if (route?.name == 'Healthbot') {
            ICON = <Image source={require('../assets/images/boticn.png')} style={{ width: 23, height: 23, tintColor: color }} />

          } else if (route?.name == 'Appointments') {
            ICON = <Icon type={IconTypes?.AntDesign} name={'profile'} size={23} color={color} />
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
      <Tab.Screen name="Home" component={HospitalDoctors} options={{ headerShown: false }} />
      <Tab.Screen name="FavDoctors" component={FavDoctors} options={{ headerShown: false }} />
      <Tab.Screen name="Healthbot" component={Healthbot} options={{ headerShown: false }} />
      <Tab.Screen name="Appointments" component={Appointments} options={{ headerShown: false }} />

      {/* if doctor ? 
      DoctorHome
      Reviews
      Profile */}

      {/* if hospital
      HospitalHome
      HospitalProfile
      HospitalDoctors */}
      
    </Tab.Navigator>

  );
}