import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import { getAppointments, getMyAppointments } from '../actions/AppointmentsActions';

export const AppointmentsMiddleware = {

  //appointment booking by patient
  onBookAppointment: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = {
            docter_id: params?.doctorId,
            date: params?.appointmentDate,
            startTime: params?.startTime,
            endTime: params?.endTime,
            name: params?.patientName,
            relation: params?.relationship,
            contact: params?.contactNo
          }
          const data = await Axios.post(Apis.bookAppointment, rawData, await headers.config());
          if (data?.status == 200) {
            resolve(true)
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Schedule Appointment',
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

  //get appointments by patient
  getAppointmentsData: params => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.get_my_appointments, await headers.config());
          if (data?.status == 200) {
            resolve(true)
            dispatch(getMyAppointments(data?.data?.data))
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Get My Appointment',
              message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        }
      });
    };
  },

  // get appointments by doctor
  getDoctorAppointmentsData: params => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = { doctor_id: params?.doctorId }

          const data = await Axios.post(Apis.getDocterAppointment,
             params?.date ? { doctor_id: params?.doctorId , date: params?.date } : rawData,
              await headers.config());

          if (data?.status == 200) {
            resolve(true)
            dispatch(getAppointments(data?.data?.data))
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Get Doctor Appointments',
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