import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});
api.interceptors.response.use(
    
    response => response,
    error => {
        if(error.response.status >= 401 && error.response.status < 500){
            window.location.href = "/"; 
        }
    }
)
export default api;