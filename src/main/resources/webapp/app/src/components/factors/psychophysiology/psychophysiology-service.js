import axios from 'axios';

const PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL = "http://localhost:8080/api/psychophysiologyFactors";

export default class PsychophysiologyFactorService {

    static getPsychophysiologyFactors(){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL);
    }

    static createPsychophysiologyFactor(psychophysiologyFactor){
        return axios.post(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL, psychophysiologyFactor);
    }

    static getPsychophysiologyFactorById(psychophysiologyFactorId){
        return axios.get(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId);
    }

    static updatePsychophysiologyFactor(psychophysiologyFactor, psychophysiologyFactorId){
        return axios.put(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId, psychophysiologyFactor);
    }

    static deletePsychophysiologyFactor(psychophysiologyFactorId){
        return axios.delete(PSYCHOPHYSIOLOGY_FACTOR_API_BASE_URL + '/' + psychophysiologyFactorId);
    }
}
