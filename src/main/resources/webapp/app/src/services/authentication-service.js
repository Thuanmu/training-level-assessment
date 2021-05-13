import axios from "axios";

const AUTHENTICATION_API_BASE_URL = "http://localhost:8080/api/auth/";

export default class AuthenticationService {

    static register(username, email, password) {
        return axios.post(AUTHENTICATION_API_BASE_URL + "signup", {
          username,
          email,
          password,
        });
    }
      
    static login(username, password) {
        return axios
          .post(AUTHENTICATION_API_BASE_URL + "signin", {
            username,
            password,
          })
          .then((response) => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
      
            return response.data;
          });
    }
      
    static logout() {
        localStorage.removeItem("user");
    }
      
    static getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    static getHeader() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.accessToken) {
          return { Authorization: 'Bearer ' + user.accessToken };
        } else {
          return {};
        }
    }
}