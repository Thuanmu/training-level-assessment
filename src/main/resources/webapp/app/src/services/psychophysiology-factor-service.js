import axios from 'axios';
import AuthenticationService from './authentication-service';

const PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL = "http://localhost:8080/api/psychophysiologyFactors";

export default class PsychophysiologyFactorService {

    static getAllPsychophysiologyFactorsByCoachId(params){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/coachUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getAllPsychophysiologyFactorsByAthleteCodeUsed(params){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/athleteUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getPsychophysiologyFactorsByStatusAndCoachId(coachId) {
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/status/' + coachId, {headers: AuthenticationService.getHeader()});
    }

    static createPsychophysiologyFactor(psychophysiologyFactor){
        return axios.post(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL, psychophysiologyFactor, {headers: AuthenticationService.getHeader()});
    }

    static getPsychophysiologyFactorById(psychophysiologyFactorId){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId, {headers: AuthenticationService.getHeader()});
    }

    static getPsychophysiologyFactorByPsychophysiologyFactorCode(psychophysiologyFactorCode){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorCode + '/code', {headers: AuthenticationService.getHeader()});
    }

    static updatePsychophysiologyFactor(psychophysiologyFactor, psychophysiologyFactorId){
        return axios.put(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId, psychophysiologyFactor, {headers: AuthenticationService.getHeader()});
    }

    static deletePsychophysiologyFactor(psychophysiologyFactorId){
        return axios.delete(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId, {headers: AuthenticationService.getHeader()});
    }
}
