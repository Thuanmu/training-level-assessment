import axios from 'axios';
import AuthenticationService from './authentication-service';

const FORM_FACTOR_API_BASE_URL = "http://localhost:8080/api/formFactors";


export default class FormFactorService {

    static getAllFormFactorsByCoachId(params){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/coachUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getAllFormFactorsByAthleteCodeUsed(params){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/athleteUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getFormFactorsByStatusAndCoachId(coachId) {
        return axios.get(FORM_FACTOR_API_BASE_URL + '/status/' + coachId, { headers: AuthenticationService.getHeader() });
    }

    static createFormFactor(formFactor){
        return axios.post(FORM_FACTOR_API_BASE_URL, formFactor, { headers: AuthenticationService.getHeader() });
    }

    static getFormFactorById(formFactorId){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/' + formFactorId, { headers: AuthenticationService.getHeader() });
    }

    static getFormFactorByFormFactorCode(formFactorCode){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/' + formFactorCode + '/code', { headers: AuthenticationService.getHeader() });
    }

    static updateFormFactor(formFactor, formFactorId){
        return axios.put(FORM_FACTOR_API_BASE_URL + '/' + formFactorId, formFactor, { headers: AuthenticationService.getHeader() });
    }

    static deleteFormFactor(formFactorId){
        return axios.delete(FORM_FACTOR_API_BASE_URL + '/' + formFactorId, { headers: AuthenticationService.getHeader() });
    }
}
