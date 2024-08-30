import Axios from 'axios';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import Apis from '../../apis/apis';
import { getMedicalRecords } from '../actions/RecordActions';

export const RecordsMiddleware = {

  onAddRecord: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append('file', params?.file);
          formData.append('file_name', params?.name);
          formData.append('type', params.type);


          const data = await Axios.post(Apis.uploadMedicalRecord, formData, await headers.multiPart());
          if (data?.status == 200) {
            dispatch(getMedicalRecords(data?.data?.data?.medical_record));
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

  getAllRecords: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.getMedicalRecord, await headers.config());
          if (data?.status == 200) {
            dispatch(getMedicalRecords(data?.data?.data?.medical_record));
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

  onDeleteRecord: (id) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(showLoading());
          const rawData = {
            doc_id: id
          }
          const data = await Axios.post(Apis.deleteMedicalRecord, rawData, await headers.config());
          if (data?.status == 200) {
            dispatch(getMedicalRecords(data?.data?.data?.medical_record));
            resolve(true)
            dispatch(
              showAlert({
                title: 'Record Deleted',
                message: data?.data?.message,
                type: 'success',
                status: data?.status,
              }),
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'on Delete Record',
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