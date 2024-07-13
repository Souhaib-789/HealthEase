import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import { getAllDoctors, getHospitalDoctors } from '../actions/DoctorsActions';

export const DoctorsMiddleware = {

  // doctor list for patient
  getAllDoctorsData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.getDoctors, await headers.config());
          if (data?.status == 200) {
            dispatch(getAllDoctors(data?.data?.data));
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Get All Doctors',
              message: error?.response?.data?.message,
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
          dispatch( showAlert({title: 'Get Hospital Doctors', message: error?.response?.data?.message, type: 'Error', status: error?.response?.status }));
        }
      });
    };
  },

  // create doctor by hospital
  createDoctor: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append('docter_name', params?.name);
          formData.append('specialization', params?.specialization);
          formData.append('experience', params?.experience);
          formData.append('specialization', params?.speciality);
          formData.append('email', params?.email);
          formData.append('password', params?.password);
          formData.append('about', params?.about);
          formData.append('fee', params?.fee);
          for (const [index, item] of params?.availability?.entries()) {
            formData.append(`slots[${index}][day]`, item?.day?.name);
            formData.append(`slots[${index}][shift_start_Time]`, item?.startTime);
            formData.append(`slots[${index}][shift_end_Time]`, item?.endTime);
          }

          console.log('formData', JSON.stringify(formData, null, 8));

          const data = await Axios.post(Apis.createDocter, formData , await headers.config());
          console.log(JSON.stringify(data, null, 8))
          if (data?.status == 200) {
            resolve(true);
            console.log('data', data);
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



};