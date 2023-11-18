import axios from 'axios';
import { Promise } from "es6-promise"; 
import tokens from './helper/tokens'; 

export const interceptor = function (excludeUrl, cb) {
  console.log('interceptor init');
  let isRefreshing = false;
  let refreshTokenRequestQueue = [];

  axios.interceptors.request.use((request) => {
    cb({ loaderIsHide: false, redirectTo: '' });

    const token = tokens.get('token');
    const authuser = tokens.get('userType');
    request.headers['Authorization'] = `Bearer ${token}`;
    request.headers['Authorization-authuser'] = `${authuser}`;

    // Return a successful response back to the calling service
    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      // Return a successful response back to the calling service
      cb({ loaderIsHide: true, redirectTo: '' });
      return response;
    },
    async (error) => {
      if (!isRefreshing && error.response.status === 401) {
        isRefreshing = true;
        try {
          const refreshedToken = await refreshToken();
          // Update the token in tokens helper or wherever it is stored
          tokens.set('token', refreshedToken);

          // Retry the original request with the new token
          error.config.headers['Authorization'] = `Bearer ${refreshedToken}`;
          return axios.request(error.config);
        } catch (refreshError) {
          // Handle refresh token failure or any other errors
          isRefreshing = false;

          // Optionally, you can redirect the user to a login page or display an error message
          cb({ loaderIsHide: true, redirectTo: '/signin' });
          
          return Promise.reject(refreshError);
        } finally {
          // Once the token is refreshed, release all the queued requests
          refreshTokenRequestQueue.forEach((request) => {
            request.resolve(axios(request.config));
          });
          refreshTokenRequestQueue = [];
        }
      }

      // Return any other errors back to the calling service
      cb({ loaderIsHide: true, redirectTo: '' });
      return Promise.reject(error);
    }
  );

  function refreshToken() {
    // Implement the logic to refresh the token.
    // This might involve making a request to the authentication server and obtaining a new token.
    return new Promise((resolve, reject) => {
      // Make the request to refresh the token
      // Resolve the promise with the new token on success
      // Reject the promise with an error on failure
    });
  }
};