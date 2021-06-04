import axios from 'axios';

const PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL = "http://localhost:8080/api/psychophysiologyFactors";

export default class PsychophysiologyFactorService {

    static getAllPsychophysiologyFactorsByCoachId(params){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/coachUser/', {params});
    }

    static getAllPsychophysiologyFactorsByAthleteCodeUsed(params){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/athleteUser/', {params});
    }

    static getPsychophysiologyFactorsByStatusAndCoachId(coachId) {
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/status/' + coachId);
    }

    static createPsychophysiologyFactor(psychophysiologyFactor){
        return axios.post(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL, psychophysiologyFactor);
    }

    static getPsychophysiologyFactorById(psychophysiologyFactorId){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId);
    }

    static getPsychophysiologyFactorByPsychophysiologyFactorCode(psychophysiologyFactorCode){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorCode + '/code');
    }

    static updatePsychophysiologyFactor(psychophysiologyFactor, psychophysiologyFactorId){
        return axios.put(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId, psychophysiologyFactor);
    }

    static deletePsychophysiologyFactor(psychophysiologyFactorId){
        return axios.delete(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId);
    }
}
