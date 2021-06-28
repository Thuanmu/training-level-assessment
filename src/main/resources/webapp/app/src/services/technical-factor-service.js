import axios from 'axios';
import AuthenticationService from './authentication-service';

const TECHNICAL_FACTOR_API_BASE_URL = "http://localhost:8080/api/technicalFactors";

export default class TechnicalFactorService {

    static getAllTechnicalFactorsByCoachId(params){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/coachUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getAllTechnicalFactorsByAthleteCodeUsed(params){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/athleteUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getTechnicalFactorsByStatusAndCoachId(coachId) {
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/status/' + coachId, {headers: AuthenticationService.getHeader()});
    }

    static createTechnicalFactor(technicalFactor){
        return axios.post(TECHNICAL_FACTOR_API_BASE_URL, technicalFactor, {headers: AuthenticationService.getHeader()});
    }

    static getTechnicalFactorById(technicalFactorId){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorId, {headers: AuthenticationService.getHeader()});
    }

    static getTechnicalFactorByTechnicalFactorCode(technicalFactorCode){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorCode + '/code', {headers: AuthenticationService.getHeader()});
    }

    static updateTechnicalFactor(technicalFactor, technicalFactorId){
        return axios.put(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorId, technicalFactor, {headers: AuthenticationService.getHeader()});
    }

    static deleteTechnicalFactor(technicalFactorId){
        return axios.delete(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorId, {headers: AuthenticationService.getHeader()});
    }
}
