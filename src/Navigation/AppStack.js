import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerBar from './Drawer/DrawerBar';
import Doctors from '../screens/Doctors/Doctors';
import DoctorDetails from '../screens/Doctors/DoctorDetails';
import EReports from '../screens/DiagnosticsTests/EReports';
import BookTest from '../screens/DiagnosticsTests/BookTest';
import MyTestsDetails from '../screens/DiagnosticsTests/MyTestsDetails';
import EditProfile from '../screens/Profile/EditProfile';
import AppointmentForm from '../screens/Appointment/AppointmentForm';
import IntroSlider from '../screens/IntroSlider/IntroSlider';
import HealthbotChat from '../screens/Healthbot/HealthbotChat';
import Records from '../screens/Profile/Medical Info/Records';
import Notifications from '../screens/Notifications/Notifications';
import AppointmentDetails from '../screens/Appointment/AppointmentDetails';
import Reviews from '../screens/Reviews/Reviews';
import Profile from '../screens/Profile/Profile';
import PatientDetails from '../screens/Patient/PatientDetails';
import HospitalEditProfile from '../screens/Profile/HospitalEditProfile';
import HospitalProfile from '../screens/Profile/HospitalProfile';
import HospitalDoctorDetails from '../screens/Doctors/HospitalDoctorDetails';


const Stack = createNativeStackNavigator();

const AppStack = () =>{
  return (
      <Stack.Navigator>
       <Stack.Screen name="IntroSlider" component={IntroSlider} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerBar" component={DrawerBar} options={{ headerShown: false }} />
        <Stack.Screen name="Doctors" component={Doctors} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Appointment" component={AppointmentForm} options={{ headerShown: false }} />
        <Stack.Screen name="HealthbotChat" component={HealthbotChat} options={{ headerShown: false }} />

        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />

        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Records" component={Records} options={{ headerShown: false }} />

        <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Reviews" component={Reviews} options={{ headerShown: false }} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} options={{ headerShown: false }} />
        <Stack.Screen name="HospitalEditProfile" component={HospitalEditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="HospitalProfile" component={HospitalProfile} options={{ headerShown: false }} />
        <Stack.Screen name="HospitalDoctorDetails" component={HospitalDoctorDetails} options={{ headerShown: false }} />

      </Stack.Navigator>
  );
}

export default AppStack;