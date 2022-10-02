import axios from "axios";

let token = window.localStorage.getItem('token')

const axiosBaseURL = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { 
        'Authorization': 'Bearer ' + token,
    }
})

export default axiosBaseURL