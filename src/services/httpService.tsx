import axios from 'axios';
import { redirect } from "react-router";

// Create Axios instance

const axiosInstance = axios.create({adapter: 'fetch'});
// Add a response interceptor

axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    
    console.log(error);
    
    if (error.status === 401) {
        console.log("401");
        // const navigate = useNavigate();
        console.log("after");
        window.location.pathname = '/login';  // Redirect to login for 401 Unauthorized
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosInstance;