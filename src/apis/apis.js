

const BASE_URL = `http://192.168.2.106:3000`;
// const BASE_URL = `http://192.168.0.178:3000`;



const Apis = {

    signup: `${BASE_URL}/user/api/user-register`,
    login: `${BASE_URL}/user/api/login`,

    getDoctors: `${BASE_URL}/user/api/getDocters`,
    getFavDocters: `${BASE_URL}/user/api/getFavDocters`,

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

}

export default Apis;