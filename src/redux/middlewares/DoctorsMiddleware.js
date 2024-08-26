import Axios from 'axios';
import Apis from '../../apis/apis';
import { hideLoading, showAlert, showLoading } from '../actions/GeneralAction';
import { headers } from '../../utilities/Utilities';
import { addDocToFavorites, addHospitalDoctors, clearAllDoctors, getAllDoctors, getFavDoctors, getHospitalDoctors, removeDocFromFavorites, updateHospitalDoctors, } from '../actions/DoctorsActions';
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
          // console.log('rawData ->>>>>>>>>>>>>>>', JSON.stringify(rawData, null, 8));

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

  // doctor list for patient
  getFavDoctorsData: (params) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.getFavDocters, await headers.config());
          if (data?.status == 200) {
            dispatch(getFavDoctors(data?.data?.data));
            resolve(true);
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Get Fav Doctors',
              message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        }
      });
    };
  },

  // doctors list for hospital
  getHospitalDoctorsData: (params) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const rawData = { name: params?.search, category: params?.category };
          // console.log('rawData ->>>>>>>>>>>>>>>', JSON.stringify(rawData, null, 8));
          const data = await Axios.post(Apis.getHospitalDoctors, rawData, await headers.config());
          if (data?.status == 200) {
            resolve(true);
            dispatch(getHospitalDoctors(data?.data?.data));
          }

        } catch (error) {
          reject(error);
          dispatch(showAlert({ title: 'Get Hospital Doctors', message: error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong!', type: 'Error', }));

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

          let dataToSend = [
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
          ]

          if (duration) {
            dataToSend.push(duration)
          }

          // console.log('====================================');
          // console.log(JSON.stringify(dataToSend, null, 8));
          // console.log('====================================');


          await RNFetchBlob
            // .config({ timeout: 60 * 60 })
            .fetch("POST", Apis.createDocter,
              await headers.docHeader(),
              dataToSend
            )
            .then((value) => {
              let data = JSON.parse(value?.data)

              if (data?.status == true) {
                resolve(true)
                dispatch(addHospitalDoctors(data?.data?.details));
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

  onUpdateDoctor: params => {
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
              data: item?.shift_start_Time,
            }
            responseData.push(shift_start_Time)
            let shift_end_Time = {
              name: `slots[${index}][shift_end_Time]`,
              data: item?.shift_end_Time,
            }
            responseData.push(shift_end_Time)
          }


          let dataToSend = [
            {
              name: "doctor_id",
              data: params?.id,
            },
            params?.name ?
              {
                name: "docter_name",
                data: params?.name,
              } : {},
            params?.specialization ?
              {
                name: "specialization",
                data: params?.specialization?.name,
              } : {},
            params?.experience ?
              {
                name: "experience",
                data: params?.experience.toString(),
              } : {},
            params?.fee ?
              {
                name: "fee",
                data: params?.fee.toString(),
              } : {},

            params?.about ?
              {
                name: "about",
                data: params?.about,
              } : {},



            params?.duration ? {
              name: "duration",
              data: params?.duration.toString(),
            } : {},


          ]

          if (params?.password) {
            dataToSend.push(
              {
                name: "password",
                data: params?.password,
              })
          }

          if (params?.image?.uri) {
            dataToSend.push({
              name: 'image',
              filename: params?.image?.name,
              data: RNFetchBlob.wrap(params?.image?.uri),
              // data: Platform.OS == 'android' ? RNFetchBlob.wrap(userData?.media?.uri) : RNFetchBlob.wrap(decodeURIComponent(userData?.media?.uri.replace("file://", ""))),
              type: params?.image?.type,

            })
          }

          if (params?.availability) {
            dataToSend.push(...responseData)
          }

          await RNFetchBlob
            // .config({ timeout: 60 * 60 })
            .fetch("POST", Apis.updateDocter,
              await headers.docHeader(),
              dataToSend
            )
            .then((value) => {
              let data = JSON.parse(value?.data)
              console.log('----------------------------');
              console.log(JSON.stringify(data.data, null, 8));
              console.log('----------------------------');
              if (data?.status == true) {
                resolve(true)
                dispatch(updateHospitalDoctors(data?.data));
              } else {
                reject(value)
                dispatch(showAlert({ title: 'update doctor', message: data?.message ? data?.message : 'seomthing went wrong!', type: 'Error', }));
              }
            }).catch((reason) => {
              reject(reason)
            })


        } catch (error) {
          console.log(error);
          reject(error);
          dispatch(
            showAlert({
              title: 'update doctor',
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

  onFavoritePress: params => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(showLoading());
          const rawData = { doctor_id: params?.id , info: params?.docInfo }
          const data = await Axios.post(Apis.addAndRemoveFavDoctors, rawData, await headers.config());
          if (data?.status == 200) {
            if (params.check) {
              dispatch(removeDocFromFavorites(params?.id));
            } else {
              dispatch(addDocToFavorites(params?.docInfo));
            }
            dispatch(showAlert({ title: 'action to favorite', message: data?.data?.message, type: 'Success', }));
            resolve(true);
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'action to favorite',
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