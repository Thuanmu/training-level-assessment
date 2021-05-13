import axios from 'axios';

const PHYSICAL_FACTOR_API_BASE_URL = "http://localhost:8080/api/physicalFactors";

export default class PhysicalFactorService {

    static getAllPhysicalFactorsByCoachId(coachId){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/coachUser/' + coachId);
    }

    static getAllPhysicalFactorsByAthleteCodeUsed(athleteCodeUsed){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/athleteUser/' + athleteCodeUsed);
    }

    static getPhysicalFactorsByStatusAndCoachId(coachId) {
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/status/' + coachId);
    }

    static getPhysicalFactorsByStatusAndAthleteCodeUsed(athleteCodeUsed) {
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/status/' + athleteCodeUsed);
    }

    static createPhysicalFactor(physicalFactor){
        return axios.post(PHYSICAL_FACTOR_API_BASE_URL, physicalFactor);
    }

    static getPhysicalFactorById(physicalFactorId){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorId);
    }

    static getPhysicalFactorByPhysicalFactorCode(physicalFactorCode){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorCode + '/code');
    }

    static updatePhysicalFactor(physicalFactor, physicalFactorId){
        return axios.put(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorId, physicalFactor);
    }

    static deletePhysicalFactor(physicalFactorId){
        return axios.delete(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorId);
    }
}
