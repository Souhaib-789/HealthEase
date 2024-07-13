import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';

export const AppointmentsMiddleware = {

  onScheduleAppointment: params => {
    return dispatch => {
        dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
            const formData = new FormData();
            formData.append('doctorId', params?.doctorId);
            formData.append('appointmentDate', params?.appointmentDate);
            formData.append('appointmentTime', params?.appointmentTime);
            formData.append('patientName', params?.patientName);
            formData.append('relationship', params?.relationship);
            formData.append('contactNo', params?.contactNo);
            
          const data = await Axios.post(Apis.scheduleAppointment , formData , await headers.config());
          if (data?.status == 200) {
            resolve(true)
            dispatch(
              showAlert({
                title: 'Schedule Appointment',
                message: data?.data?.message,
                type: 'success',
              }),
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Schedule Appointment',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        }finally{
          dispatch(hideLoading());
        }
      });
    };
  },

 

};