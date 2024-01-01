import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerBar from './Drawer/DrawerBar';
import Doctors from '../screens/Home/Doctors';
import DoctorDetails from '../screens/Home/DoctorDetails';
import MyTests from '../screens/DiagnosticsTests/MyTests';
import EReports from '../screens/DiagnosticsTests/EReports';
import BookTest from '../screens/DiagnosticsTests/BookTest';
import MyTestsDetails from '../screens/DiagnosticsTests/MyTestsDetails';
import EditProfile from '../screens/Profile/EditProfile';
import AppointmentForm from '../screens/Appointment/AppointmentForm';
import IntroSlider from '../screens/IntroSlider/IntroSlider';


const Stack = createNativeStackNavigator();

const AppStack = () =>{
  return (
      <Stack.Navigator>
       <Stack.Screen name="IntroSlider" component={IntroSlider} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerBar" component={DrawerBar} options={{ headerShown: false }} />
        <Stack.Screen name="Doctors" component={Doctors} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Appointment" component={AppointmentForm} options={{ headerShown: false }} />
       
        <Stack.Screen name="MyTests" component={MyTests} options={{ headerShown: false }} />
        <Stack.Screen name="EReports" component={EReports} options={{ headerShown: false }} />
        <Stack.Screen name="BookTest" component={BookTest} options={{ headerShown: false }} />
        <Stack.Screen name="MyTestsDetails" component={MyTestsDetails} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />

      </Stack.Navigator>
  );
}

export default AppStack;