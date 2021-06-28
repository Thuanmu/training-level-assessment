import axios from 'axios';
import AuthenticationService from './authentication-service';

const PHYSICAL_FACTOR_API_BASE_URL = "http://localhost:8080/api/physicalFactors";

export default class PhysicalFactorService {

    static getAllPhysicalFactorsByCoachId(params){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/coachUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getAllPhysicalFactorsByAthleteCodeUsed(params){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/athleteUser/', {params, headers: AuthenticationService.getHeader()});
    }

    static getPhysicalFactorsByStatusAndCoachId(coachId) {
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/status/' + coachId, {headers: AuthenticationService.getHeader()});
    }

    static createPhysicalFactor(physicalFactor){
        return axios.post(PHYSICAL_FACTOR_API_BASE_URL, physicalFactor, {headers: AuthenticationService.getHeader()});
    }

    static getPhysicalFactorById(physicalFactorId){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorId, {headers: AuthenticationService.getHeader()});
    }

    static getPhysicalFactorByPhysicalFactorCode(physicalFactorCode){
        return axios.get(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorCode + '/code', {headers: AuthenticationService.getHeader()});
    }

    static updatePhysicalFactor(physicalFactor, physicalFactorId){
        return axios.put(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorId, physicalFactor, {headers: AuthenticationService.getHeader()});
    }

    static deletePhysicalFactor(physicalFactorId){
        return axios.delete(PHYSICAL_FACTOR_API_BASE_URL + '/' + physicalFactorId, {headers: AuthenticationService.getHeader()});
    }
}
