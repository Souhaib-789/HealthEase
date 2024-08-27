import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';

export const ReviewMiddleware = {

  onSubmitReview: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = {
            doctor_id: params?.id,
            review: params?.review,
            rating: params?.rating,
          }

          const data = await Axios.post(Apis.addReview, rawData, await headers.config());
          if (data?.status == 200) {
            resolve(true)
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Submit Review',
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

//   getAppointmentsData: params => {
//     return dispatch => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const rawData = { status: params?.status, search: params?.search }
//           const data = await Axios.post(Apis.get_my_appointments, params?.search ? rawData : {status: params?.status} , await headers.config());
//           if (data?.status == 200) {
//             resolve(true)
//             dispatch(getMyAppointments(data?.data?.data))
//           }
//         } catch (error) {
//           reject(error);
//           dispatch(
//             showAlert({
//               title: 'Get My Appointment',
//               message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
//               type: 'Error',
//               status: error?.response?.status,
//             }),
//           );
//         }
//       });
//     };
//   },



};