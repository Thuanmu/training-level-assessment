import axios from 'axios';
import AuthenticationService from './authentication-service';
// import AuthenticationService from './authentication-service';

const USER_API_BASE_URL = "http://localhost:8080/api/users";

export default class UserService {

    static getAllUsers(params){
        return axios.get(USER_API_BASE_URL, {params, headers: AuthenticationService.getHeader()});
    }
    
    static createUser(user){
        return axios.post(USER_API_BASE_URL, user, {headers: AuthenticationService.getHeader()});
    }

    static getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId, {headers: AuthenticationService.getHeader()});
    }

    static updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user, {headers: AuthenticationService.getHeader()});
    }

    static deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId, {headers: AuthenticationService.getHeader()});
    }
}
