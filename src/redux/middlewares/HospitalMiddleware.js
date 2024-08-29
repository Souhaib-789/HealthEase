import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import { getDashbaordData } from '../actions/HospitalActions';

export const HospitalMiddleware = {

    onFetchDashboardData: () => {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await Axios.get(Apis.getDashboard, await headers.config());
                    if (data?.status == 200) {
                        resolve(true)
                        dispatch(getDashbaordData(data?.data?.data));
                    }
                } catch (error) {
                    reject(error);
                    dispatch(
                        showAlert({
                            title: 'Get Dashbaord Data',
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