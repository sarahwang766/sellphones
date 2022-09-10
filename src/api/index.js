import { message } from "antd";
import axios from "axios";

const signout = function() {
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      message.info("Please log in again!");
      window.location.href="/home";
  }

const http = axios.create({
      // baseURL:"/",
      baseURL:"http://www.sarahwang766.com.cn:80/api/",
});

http.interceptors.request.use(function (config) {
      if(localStorage.getItem("accessToken")){
          config.headers.Authorization = localStorage.getItem("accessToken");
      }
      return config;
}, function(err) {
});

http.interceptors.response.use(function (response) {
      return response;
      
}, function (err) {
      if(err.response.status === 401){
            signout();
      }
})

export default http;