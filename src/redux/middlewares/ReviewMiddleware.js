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





};