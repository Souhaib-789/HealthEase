import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import { clearAllDoctors, getAllDoctors, getHospitalDoctors, updateHospitalDoctors } from '../actions/DoctorsActions';
import RNFetchBlob from 'rn-fetch-blob';

export const DoctorsMiddleware = {

  // doctor list for patient
  getAllDoctorsData: (params) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          // if(params?.search && params?.category){
          //   dispatch(clearAllDoctors());
          // }

          const rawData = { name: params?.search, category: params?.category };
          console.log('rawData ->>>>>>>>>>>>>>>', JSON.stringify(rawData, null, 8));

          const data = await Axios.post(Apis.getDoctors, rawData, await headers.config());
          if (data?.status == 200) {
            dispatch(getAllDoctors(data?.data?.data));
            resolve(true);
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Get All Doctors',
              message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
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
          dispatch(showAlert({ title: 'Get Hospital Doctors', message: 'Something went wrong', type: 'Error', }));
        }
      });
    };
  },

  // create doctor by hospital
  onCreateDoctor: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let responseData = []
          for (const [index, item] of params?.availability?.entries()) {
            let day = {
              name: `slots[${index}][day]`,
              data: item?.day,
            }
            responseData.push(day)
            let shift_start_Time = {
              name: `slots[${index}][shift_start_Time]`,
              data: String(item?.shift_start_Time),
            }
            responseData.push(shift_start_Time)
            let shift_end_Time = {
              name: `slots[${index}][shift_end_Time]`,
              data: String(item?.shift_end_Time),
            }
            responseData.push(shift_end_Time)
          }

          let duration = params?.duration ? {
            name: "duration",
            data: params?.duration,
          } : null

          await RNFetchBlob
            // .config({ timeout: 60 * 60 })
            .fetch("POST", Apis.createDocter,
              await headers.docHeader(),
              [
                {
                  name: "docter_name",
                  data: params?.name,
                },
                {
                  name: "specialization",
                  data: params?.specialization?.name,
                },
                {
                  name: "experience",
                  data: params?.experience.toString(),
                },
                {
                  name: "fee",
                  data: params?.fee.toString(),
                },
                {
                  name: "about",
                  data: params?.about,
                },
                {
                  name: "email",
                  data: params?.email,
                },
                {
                  name: "password",
                  data: params?.password,
                },
                
                

                {
                  name: 'image',
                  filename: params?.image?.name,
                  data: RNFetchBlob.wrap(params?.image?.uri),
                  // data: Platform.OS == 'android' ? RNFetchBlob.wrap(userData?.media?.uri) : RNFetchBlob.wrap(decodeURIComponent(userData?.media?.uri.replace("file://", ""))),
                  type: params?.image?.type,

                },
                ...responseData,
                duration
              ])
            .then((value) => {
              let data = JSON.parse(value?.data)

              // console.log("checking----", JSON.stringify(data, null, 8))
              if (data?.status == true) {
                resolve(true)
                dispatch(updateHospitalDoctors(data?.data));
              } else {
                reject(value)
                dispatch(showAlert({ title: 'create doctor', message: data?.message, type: 'Error', }));
              }
            }).catch((reason) => {
              reject(reason)
            })


        } catch (error) {
          console.log(error);
          reject(error);
          dispatch(
            showAlert({
              title: 'create doctor',
              message: error?.message ? error?.message : 'Something went wrong!',
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


  getTimeSlots: params => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = {
            doctor_id: params?.id,
            date: params?.date,
            startTime: params?.startTime,
            endTime: params?.endTime,
            duration: params?.duration,
          }
console.log('====================================');
console.log(rawData);
console.log('====================================');
          const data = await Axios.post(Apis.getDocterSlots, rawData, await headers.config());
          if (data?.status == 200) {
            resolve(data?.data?.data);
          }
        } catch (error) {
          reject(error);
          dispatch(hideLoading());
          dispatch(
            showAlert({
              title: 'get Time Slots',
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