
// Home
// const BASE_URL = `http://192.168.2.106:3000`;

// Phone
const BASE_URL = `http://192.168.181.165:3000`;

// Fasih Phone
// const BASE_URL = `http://192.168.62.165:3000`;

// const BASE_URL = `http://192.168.0.178:3000`;
// const BASE_URL = `http://192.168.201.165:3000`;
// export const IMAGE_URL = `http://192.168.201.165:3000/images/`;
// export const IMAGE_URL = `http://192.168.2.106:3000/images/`;


const Apis = {

    signup: `${BASE_URL}/user/api/user-register`,
    login: `${BASE_URL}/user/api/login`,
    update_profile: `${BASE_URL}/user/api/update-profile`,

    //Doctors
    getDoctors: `${BASE_URL}/user/api/getDocters`,
    getFavDocters: `${BASE_URL}/user/api/getFavDocters`,
    deleteDocters: `${BASE_URL}/hospital/api/deleteDocters`,
    getReviews: `${BASE_URL}/user/api/getReviews`,

    // Appointments
    bookAppointment: `${BASE_URL}/user/api/book-Appointment`,
    get_my_appointments: `${BASE_URL}/user/api/getAppointment`,
    getDocterAppointment: `${BASE_URL}/user/api/getDocterAppointment`,
    completeAppointment: `${BASE_URL}/user/api/completeAppointment`,

    //Prescription
    writePrescription: `${BASE_URL}/user/api/writePrescription`,

    //Slots
    getDocterSlots: `${BASE_URL}/user/api/getDocterSlots`,

    //Hospital
    createDocter: `${BASE_URL}/hospital/api/createDocter`,
    updateDocter: `${BASE_URL}/hospital/api/updateDocter`,
    getHospitalDoctors: `${BASE_URL}/hospital/api/getDocters`,

    //add remove favorite
    addAndRemoveFavDoctors: `${BASE_URL}/user/api/addAndRemoveFavDoctors`,

    //Review
    addReview: `${BASE_URL}/user/api/addReview`,

    //Info Pages
    about: `${BASE_URL}/user/api/about`,
    privacy_policy: `${BASE_URL}/user/api/privacy-policy`,
    get_support: `${BASE_URL}/user/api/get-support`,

    //Hospital
    getDashboard: `${BASE_URL}/hospital/api/getDashboard`,

    //Medical Records
    uploadMedicalRecord: `${BASE_URL}/user/api/uploadMedicalRecord`,
    getMedicalRecord: `${BASE_URL}/user/api/getMedicalRecord`,
    deleteMedicalRecord: `${BASE_URL}/user/api/deleteMedicalRecord`,

}

export default Apis;