

// const BASE_URL = `http://192.168.2.106:3000`;
const BASE_URL = `http://192.168.0.178:3000`;



const Apis = {

    signup: `${BASE_URL}/user/api/user-register`,
    login: `${BASE_URL}/user/api/login`,
    update_profile: `${BASE_URL}/user/api/update-profile`,

    //Doctors
    getDoctors: `${BASE_URL}/user/api/getDocters`,
    getFavDocters: `${BASE_URL}/user/api/getFavDocters`,
    deleteDocters: `${BASE_URL}/hospital/api/deleteDocters`,

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

}

export default Apis;