

// const BASE_URL = `http://192.168.2.106:3000`;
const BASE_URL = `http://192.168.0.178:3000`;



const Apis = {
    signup: `${BASE_URL}/user/api/user-register`,
    login: `${BASE_URL}/user/api/login`,

    getDoctors: `${BASE_URL}/user/api/getDocters`,

    // Appointments
    bookAppointment: `${BASE_URL}/user/api/book-Appointment`,
    get_my_appointments: `${BASE_URL}/user/api/getAppointment`,
    getDocterAppointment: `${BASE_URL}/user/api/getDocterAppointment`,
    completeAppointment: `${BASE_URL}/user/api/completeAppointment`,

    //Slots
    getDocterSlots: `${BASE_URL}/user/api/getDocterSlots`,

    //Hospital
    createDocter: `${BASE_URL}/hospital/api/createDocter`,
    getHospitalDoctors: `${BASE_URL}/hospital/api/getDocters`,

}

export default Apis;