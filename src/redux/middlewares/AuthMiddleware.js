import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { Storage } from '../../utilities/AsyncStorage';
import { login, userData } from '../actions/AuthAction';
import { headers } from '../../utilities/Utilities';

export const AuthMiddleware = {

  login: user_data => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const formData = {
            email: user_data?.email,
            password: user_data?.password,
            // device_id: userdata.deviceID,
          };
          const data = await Axios.post(Apis.login, formData);
          // console.log(JSON.stringify(data, null, 8))
          if (data?.status == 200) {
            await Storage.setToken(data?.data?.token);

            if (data?.data?.user?.user_role == 'doctor') {
              await Storage.set('@user', JSON.stringify({ ...data?.data?.user, ...data?.data?.details }));
              dispatch(userData({ ...data?.data?.user, ...data?.data?.details }));
              dispatch(login(true));
            } else {
              await Storage.set('@user', JSON.stringify(data?.data?.user));
              dispatch(userData(data?.data?.user));
              dispatch(login(true));
            }
          }
        } catch (error) {
          reject(error);
          console.log('=========', error);
          dispatch(
            showAlert({
              title: 'login',
              message: error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong',
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  signUp: userdata => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const pFormData = {
            user_name: userdata?.name,
            phone_number: userdata?.contact,
            email: userdata?.email,
            address: userdata?.address,
            password: userdata?.password,
            password_confirmation: userdata?.confirm_password,
            user_role: userdata?.user_role,
          };

          const hFormData = {
            user_name: userdata?.name,
            phone_number: userdata?.contact,
            email: userdata?.email,
            address: userdata?.address,
            password: userdata?.password,
            password_confirmation: userdata?.confirm_password,
            user_role: userdata?.user_role,
            lat: userdata?.lat,
            lng: userdata?.lng,
          };


          const data = await Axios.post(Apis.signup, userdata.user_role == 'hospital' ? hFormData : pFormData);
          // console.log(JSON.stringify(data, null, 8))
          if (data?.status == 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: 'signup',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'signup',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },


  onUpdateProfile: userdata => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {

          let formData = new FormData();
          if (userdata?.name) {
            formData.append('user_name', userdata?.name);
          }
          if (userdata?.address) {
            formData.append('address', userdata?.address);
          }
          if (userdata?.lat) {
            formData.append('lat', userdata?.lat);
          }
          if (userdata?.lng) {
            formData.append('lng', userdata?.lng);
          }

          if (userdata?.contact) {
            formData.append('phone_number', userdata?.contact);
          }
          if (userdata?.image) {
            formData.append('image', userdata?.image);
          }

          const data = await Axios.post(Apis.update_profile, formData, await headers.multiPart());
          if (data?.status == 200) {
            dispatch(userData(data?.data?.data));
            await Storage.set('@user', JSON.stringify(data?.data?.data));
            resolve(true);
            dispatch(
              showAlert({
                title: 'edit profile',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'edit profile',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },


  getAboutData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.about, await headers.config());
          if (data?.status == 200) {
            resolve(data?.data?.data);
          }
        } catch (error) {
          reject(error);
          dispatch(showAlert({ message: 'Something went wrong while loading content', type: 'Error' }));
        }
      });
    };
  },

  getPrivacyPolicyData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.privacy_policy, await headers.config());
          if (data?.status == 200) {
            resolve(data?.data?.data);
          }
        } catch (error) {
          reject(error);
          dispatch(showAlert({ message: 'Something went wrong while loading content', type: 'Error' }));
        }
      });
    };
  },

  getSupportData : () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          console.log('====================================', await headers.config());

          const data = await Axios.get(Apis.get_support, await headers.config());
          
          if (data?.status == 200) {
            console.log('====================================');
            console.log(JSON.stringify(data?.data, null, 8));
            console.log('====================================');
            // resolve(data?.data?.data);
          }
        } catch (error) {
          reject(error);
          dispatch(showAlert({ message: 'Something went wrong while loading content', type: 'Error' }));
        }
      });
    };
  },

  //   Sociallogin: userdata => {
  //     return dispatch => {
  //       dispatch(showLoading());
  //       return new Promise(async (resolve, reject) => {
  //         try {
  //           let formdata = new FormData();
  //           formdata.append('email', userdata?.email);
  //           formdata.append('first_name', userdata?.first_name);
  //           formdata.append('last_name', userdata?.last_name);
  //           formdata.append('device_id', userdata?.deviceID);
  //           formdata.append('role', userdata?.role);
  //           const data = await Axios.post(Apis.social_login, formdata);
  //           if (data?.status == 200) {
  //             await Storage.setToken(data?.data?.data?.token);
  //             await Storage.set('@user', JSON.stringify(data?.data?.data));
  //             dispatch(userData(data?.data?.data));
  //             dispatch(login(true));
  //           }
  //         } catch (error) {
  //           reject(error);
  //           dispatch(
  //             showAlert({
  //               title: 'Sociallogin',
  //               message: error?.response?.data?.message,
  //               type: 'Error',
  //               status: error?.response?.status,
  //             }),
  //           );
  //         } finally {
  //           dispatch(hideLoading());
  //         }
  //       });
  //     };
  //   },



};