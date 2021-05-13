import axios from 'axios';

const TECHNICAL_FACTOR_API_BASE_URL = "http://localhost:8080/api/technicalFactors";

export default class TechnicalFactorService {

    static getAllTechnicalFactorsByCoachId(coachId){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/coachUser/' + coachId);
    }

    static getAllTechnicalFactorsByAthleteCodeUsed(athleteCodeUsed){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/athleteUser/' + athleteCodeUsed);
    }

    static getTechnicalFactorsByStatusAndCoachId(coachId) {
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/status/' + coachId);
    }

    static getTechnicalFactorsByStatusAndAthleteCodeUsed(athleteCodeUsed) {
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/status/' + athleteCodeUsed);
    }

    static createTechnicalFactor(technicalFactor){
        return axios.post(TECHNICAL_FACTOR_API_BASE_URL, technicalFactor);
    }

    static getTechnicalFactorById(technicalFactorId){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorId);
    }

    static getTechnicalFactorByTechnicalFactorCode(technicalFactorCode){
        return axios.get(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorCode + '/code');
    }

    static updateTechnicalFactor(technicalFactor, technicalFactorId){
        return axios.put(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorId, technicalFactor);
    }

    static deleteTechnicalFactor(technicalFactorId){
        return axios.delete(TECHNICAL_FACTOR_API_BASE_URL + '/' + technicalFactorId);
    }
}
