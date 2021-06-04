import axios from 'axios';
// import AuthenticationService from './authentication-service';

const USER_API_BASE_URL = "http://localhost:8080/api/users";

export default class UserService {

    static getAllUsers(params){
        return axios.get(USER_API_BASE_URL, {params});
    }
    
    static createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    static getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    static updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    static deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}
