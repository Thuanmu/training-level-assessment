import axios from 'axios';

const FORM_FACTOR_API_BASE_URL = "http://localhost:8080/api/formFactors";


export default class FormFactorService {

    static getAllFormFactorsByCoachId(coachId){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/coachUser/' + coachId);
    }

    static getAllFormFactorsByAthleteCodeUsed(athleteCodeUsed){
        return axios.get(FORM_FACTOR_API_BASE_URL + '/athleteUser/' + athleteCodeUsed);
    }

    static getFormFactorsByStatusAndCoachId(coachId) {
        return axios.get(FORM_FACTOR_API_BASE_URL + '/status/' + coachId);
    }

    static getFormFactorsByStatusAndAthleteCodeUsed(athleteCodeUsed) {
        return axios.get(FORM_FACTOR_API_BASE_URL + '/status/' + athleteCodeUsed);
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
