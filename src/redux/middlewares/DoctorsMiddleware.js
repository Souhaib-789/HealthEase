import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import { getAllDoctors } from '../actions/DoctorsActions';

export const DoctorsMiddleware = {

  getAllDoctorsData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.getDoctors , await headers.config());
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

 

};