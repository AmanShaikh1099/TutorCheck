import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});
api.interceptors.response.use(
    
    response => response,
    error => {
        if(error.response){
            window.location.href = "/"; 
        }
    }
)
export default api;