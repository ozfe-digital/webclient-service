import axios from 'axios';
import { Promise } from "es6-promise"; 
import tokens from './helper/tokens'; 

export const interceptor =  function(excludeUrl, cb) {  
  console.log('interceptor init');
  axios.interceptors.request.use((request) => {
    cb({loaderIsHide:false, redirectTo:''})
   // const urlObj = new URL(request.url);
    //if(excludeUrl.indexOf(urlObj.pathname)<0){
      const token = tokens.get('token');
      const authuser = tokens.get('userType'); 
      request.headers['Authorization'] = `Bearer ${token}`;
      request.headers['Authorization-authuser'] = `${authuser}`;
      // console.error('urlObj.pathname  ',urlObj.pathname, );
    //}
   // else{
      
   // }
    // Return a successful response back to the calling service
    return request;
  });
  
  axios.interceptors.response.use(
    (response) => {
      // Return a successful response back to the calling service
      cb({loaderIsHide:true, redirectTo:''})
      return response;
    },
    (error) => { 
      // Return any error which is not due to authentication back to the calling service
      if(error.response === undefined) {
        cb({loaderIsHide:true, redirectTo:''})
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if(error.response !== 403 ) {
        cb({loaderIsHide:true, redirectTo:''})
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      
      if (error.response.status !== 401) {
        cb({loaderIsHide:true, redirectTo:''})
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      else {
        let redirectTo = ''
        if(error.response.data.path.indexOf("api/auth/signin") < 0){ 
          redirectTo = '/signin';
        }
        cb({loaderIsHide:true, redirectTo})
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      
    });
  }