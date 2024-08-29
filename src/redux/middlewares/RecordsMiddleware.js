import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';

export const RecordsMiddleware = {

  onAddRecord : params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
         const formData = new FormData();
            formData.append('file', params?.file);
            formData.append('file_name', params?.name);
            formData.append('type', params.type);

            
          const data = await Axios.post(Apis.uploadMedicalRecords, formData, await headers.multiPart());
          if (data?.status == 200) {
            console.log(data.data);
            
            resolve(true)
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'On Add Record',
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

  getAllRecords : () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.post(Apis.getMedicalRecords , await headers.config());
          if (data?.status == 200) {
            console.log(data.data);
            
            resolve(true)
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Get All Records',
              message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        }
      });
    };
  },

  onDeleteRecord : (params) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
            const rawData = {
              doc_id: params?.id
            }
          const data = await Axios.post(Apis.deleteMedicalRecords , rawData ,await headers.config());
          if (data?.status == 200) {
            console.log(data.data);
            resolve(true)
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'onDeleteRecord',
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