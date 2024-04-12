import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AuthStack from './AuthStack';
// import SplashScreen from 'react-native-splash-screen';
import { Text, View, Modal as RNModal, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import AppStack from './AppStack';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from 'react-native-paper';
import { Colors } from '../utilities/Colors';
import { Storage } from '../utilities/AsyncStorage';
import { login, userData } from '../redux/actions/AuthAction';
import { hideAlert } from '../redux/actions/GeneralAction';



const AppNavigation = () => {
  const islogin = useSelector(state => state.AuthReducer.isLogin);
  const loading = useSelector(state => state.GeneralReducer.loading);
  const showAlert = useSelector(state => state.GeneralReducer.showAlert);
  const alert = useSelector(state => state.GeneralReducer.alertOptions);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   checkPermission()
  //   messaging().registerDeviceForRemoteMessages();
  //   messaging().onMessage(onMessageReceived)
  // }, [])


  // const checkPermission = async () => {
  //   const enabled = await messaging().hasPermission();
  //   if (enabled != messaging.AuthorizationStatus.AUTHORIZED) {
  //     requestPermission();
  //   }
  // }

  // const requestPermission = async () => {
  //   try {
  //     await messaging().requestPermission();
  //   } catch (error) {
  //     console.log('permission rejected');
  //   }
  // }

  // const onMessageReceived = async (message) => {
  //   let channelId = await notifee.createChannel({
  //     id: 'BestDayEver_app',
  //     name: 'BestDayEver Channel',
  //     sound: "default",
  //     vibration: true,
  //     badge: true,
  //     importance: 4,
  //     visibility: 1,
  //     bypassDnd: true
  //   });
  //   // Display a notification
  //   await notifee.displayNotification({
  //     ...message.notification,
  //     data: message?.data,
  //     android: {
  //       channelId: channelId,
  //       importance: 4,
  //       sound: "default",
  //     },
  //   });
  // }

  // useEffect(() => {
  //   fetchStarted();
  // }, [islogin, GetStarted]);

  // const fetchStarted = async () => {
  //   let response = await Storage.get('@getstarted');
  //   setGetStarted(response);
  // };

  // const logout = async () => {
  //   await Storage.clearStorage();
  //   dispatch(Logout());
  //   setsession(false);
  // };


  useEffect(() => {
    isAuthentication();
  }, [islogin]);


  const isAuthentication = async () => {
    let user_data = await Storage.get('@user');
    if (user_data != null) {
      const userdata = JSON.parse(user_data);
      dispatch(userData(userdata));
      dispatch(login(true));
    } else {
      dispatch(login(false));
    }
    // SplashScreen.hide();
  };


  return (
    <NavigationContainer>

      {
        islogin ? (
          <AppStack />
        ) : (
          <AuthStack />)
      }
      {/* {Platform.OS === 'ios' ? (
        <SafeAreaView style={{ flex: 1 }}>
          {islogin == undefined ? (
            SplashScreen.show()
          ) : islogin ? (
            <AppStack />
          ) : (
            <AuthStack />
          )}
        </SafeAreaView>
      ) : islogin == undefined ? (
        SplashScreen.show()
      ) : islogin ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}  */}

      <RNModal visible={loading} transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={Colors.WHITE} />
          <Text style={{ color: '#fff', margin: 10 }}>Loading , Please wait ...</Text>
        </View>
      </RNModal>


      <Snackbar
        onDismiss={() => dispatch(hideAlert())}
        duration={3000}
        style={{ backgroundColor: Colors.PRIMARY }}
        visible={showAlert}>
        {alert?.message ? alert?.message : null}
      </Snackbar>
    </NavigationContainer>
  );
};

export default AppNavigation;
