import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import IntroSlider from '../screens/IntroSlider/IntroSlider';



const Stack = createNativeStackNavigator();

const AuthStack = (props) => {
  return (
    <Stack.Navigator initialRouteName={!props?.getstarted ? 'IntroSlider' : 'Login'}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      {
        !props?.getstarted &&
        <Stack.Screen name="IntroSlider" component={IntroSlider} options={{ headerShown: false }} />
      }

    </Stack.Navigator>
  );
}

export default AuthStack;