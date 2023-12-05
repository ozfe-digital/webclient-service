import axios from 'axios';
// import { ApiUrlService } from 'services';
import { Promise } from 'es6-promise';
import {  appConfig  } from './configs/app.config'
import { jwtDecode } from 'jwt-decode';


const baseUrl = appConfig.baseUrl;
export class TokenStorage {

  static LOCAL_STORAGE_TOKEN = 'token';
  static LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';

  

  static isAuthenticated() {
    return this.getToken() !== null;
  }

  static getAuthentication()  {
    return {
      headers: { 'Authorization': 'Bearer ' + this.getToken() }
    };
  }

  static getNewToken() {
    return new Promise((resolve, reject) => {
      axios
        // .post(ApiUrlService.refreshToken(), { refresh_token: this.getRefreshToken() })
        .get(`${baseUrl}/tokens`, { refresh_token: this.getRefreshToken() })
        .then(response => {

          this.storeToken(response.data.token);
          this.storeRefreshToken(response.data.refresh_token);
          // check expire
          const decodedToken = jwtDecode(TokenStorage.LOCAL_STORAGE_TOKEN);
          console.log(decodedToken);
         if(decodedToken.exp*1000 < Date.newDate().getTime()) 
          {
            this.clear();
          }
          // check expire
          resolve(response.data.token);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static storeToken(token) {

    localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
  }

  static storeRefreshToken(refreshToken )  {
    localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
  }

  static clear() {
    localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  static getRefreshToken() {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  static getToken()  {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
  }
}
