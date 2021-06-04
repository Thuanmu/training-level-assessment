import axios from 'axios';

const FORM_FACTOR_API_BASE_URL = "http://localhost:8080/api/formFactors";


export default class FormFactorService {

    static getAllFormFactorsByCoachId(params){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/coachUser/', {params});
    }

    static getAllFormFactorsByAthleteCodeUsed(params){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/athleteUser/', {params});
    }

    static getFormFactorsByStatusAndCoachId(coachId) {
        return axios.get(FORM_FACTOR_API_BASE_URL + '/status/' + coachId);
    }

    static createFormFactor(formFactor){
        return axios.post(FORM_FACTOR_API_BASE_URL, formFactor);
    }

    static getFormFactorById(formFactorId){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/' + formFactorId);
    }

    static getFormFactorByFormFactorCode(formFactorCode){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/' + formFactorCode + '/code');
    }

    static updateFormFactor(formFactor, formFactorId){
        return axios.put(FORM_FACTOR_API_BASE_URL + '/' + formFactorId, formFactor);
    }

    static deleteFormFactor(formFactorId){
        return axios.delete(FORM_FACTOR_API_BASE_URL + '/' + formFactorId);
    }
}
