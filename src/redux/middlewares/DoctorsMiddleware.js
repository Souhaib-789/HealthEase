import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import { getAllDoctors, getHospitalDoctors } from '../actions/DoctorsActions';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const DoctorsMiddleware = {

  // doctor list for patient
  getAllDoctorsData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.getDoctors, await headers.config());
          if (data?.status == 200) {
            dispatch(getAllDoctors(data?.data?.data));
            resolve(true);
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Get All Doctors',
              message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        }
      });
    };
  },

  // doctors list of hospital
  getHospitalDoctorsData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.getHospitalDoctors, await headers.config());
          if (data?.status == 200) {
            resolve(true);
            dispatch(getHospitalDoctors(data?.data?.data));
          }
        } catch (error) {
          reject(error);
             dispatch(showAlert({ title: 'Get Hospital Doctors', message: 'Something went wrong'  , type: 'Error',  }));
        }
      });
    };
  },

  // create doctor by hospital
  onCreateDoctor: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append('docter_name', params?.name);
          formData.append('specialization', params?.specialization?.name);
          formData.append('experience', params?.experience);
          formData.append('fee', params?.fee);
          formData.append('about', params?.about);
          for (const [index, item] of params?.availability?.entries()) {
            formData.append(`slots[${index}][day]`, item?.day?.name);
            formData.append(`slots[${index}][shift_start_Time]`, item?.startTime);
            formData.append(`slots[${index}][shift_end_Time]`, item?.endTime);
          }
          formData.append('email', params?.email);
          formData.append('password', params?.password);
          formData.append('image', params?.image);
          // console.log('data ->>>>>>>>>>>>>>>' , JSON.stringify(formData, null, 8));

          const data = await Axios.post(Apis.createDocter, formData, await headers.multiPart());
          if (data?.status == 200) {
            resolve(true);
            console.log('data ->>>>>>>>>>>>>>>' , JSON.stringify(data, null, 8));
            dispatch(
              showAlert({
                title: 'create doctor',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
          }
          
        } catch (error) {
          reject(error);
          console.log(JSON.stringify(error, null, 8));
          dispatch(
            showAlert({
              title: 'create doctor',
              message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
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


  getTimeSlots: params => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = {
            doctor_id: params?.id,
            date: params?.date,
            startTime: params?.startTime,
            endTime: params?.endTime
          }
      
          const data = await Axios.post(Apis.getDocterSlots, rawData, await headers.config());
          if (data?.status == 200) {
            resolve(data?.data?.data);
          }
        } catch (error) {
          reject(error);
          dispatch(hideLoading());
          dispatch(
            showAlert({
              title: 'get Time Slots',
              message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        }
      });
    };
  },



};