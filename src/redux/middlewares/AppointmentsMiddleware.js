import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import {  getDoctorAppointments, getMyAppointments, updateDoctorAppointments } from '../actions/AppointmentsActions';

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
            duration: params?.duration,
            startTime: params?.startTime,
            endTime: params?.endTime,
            name: params?.patientName,
            relation: params?.relationship,
            contact: params?.contactNo
          }
console.log('====================================');
console.log('rawData', JSON.stringify(rawData, null, 8));
console.log('====================================');
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
          const rawData = { status: params?.status, search: params?.search }
          const data = await Axios.post(Apis.get_my_appointments, params?.search ? rawData : {status: params?.status} , await headers.config());
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
            dispatch(getDoctorAppointments(data?.data?.data))
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

  //complete appointment by doctor
  onCompleteAppointment : params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = {
            appointment_id: params?.id,
          }
          const data = await Axios.post(Apis.completeAppointment, rawData, await headers.config());
          if (data?.status == 200) {           
            resolve(data?.data)
            dispatch(updateDoctorAppointments(data?.data?.data))
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Complete Appointment',
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

  //add prescription by doctor
  onAddPrescription : params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = {
            appointment_id: params?.id,
            prescription: params?.prescription,
          }
          
          const data = await Axios.post(Apis.writePrescription, rawData, await headers.config());
          if (data?.status == 200) {
            resolve(true)
            dispatch(
              showAlert({
                title: 'Add Prescription',
                message: 'Prescription added successfully',
                type: 'Success',
                status: data?.status,
              }),
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Add Prescription',
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