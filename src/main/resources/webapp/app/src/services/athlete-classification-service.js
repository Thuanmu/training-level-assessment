import axios from 'axios';
import AuthenticationService from './authentication-service';

const ATHLETE_CLASSIFICATION_API_BASE_URL = "http://localhost:8080/api/athleteClassifications";

export default class AthleteClassificationService {

    static getAllAthleteClassificationsByCoachId(coachId){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/coachUser/' + coachId, { headers: AuthenticationService.getHeader() });
    }
    
    static getAllAthleteClassificationsByAthleteCodeUsed(athleteCodeUsed){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/athleteUser/' + athleteCodeUsed, { headers: AuthenticationService.getHeader() });
    }

    static getAthleteClassificationsByMonthAndYearAndCoachId(params){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/coachUser', {params, headers: AuthenticationService.getHeader() });
    }

    static getAthleteClassificationsByMonthAndYearAndAthleteCodeUsed(params){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/athleteUser', {params, headers: AuthenticationService.getHeader()});
    }

    static getAthleteClassificationByAthleteCode(athleteCode) {
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/athlete/' + athleteCode, { headers: AuthenticationService.getHeader() });
    }

    static createAthleteClassification(athleteClassification){
        return axios.post(ATHLETE_CLASSIFICATION_API_BASE_URL, athleteClassification, { headers: AuthenticationService.getHeader() });
    }

    // static getAthleteClassificationById(athleteClassificationId){
    //     return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/' + athleteClassificationId, { headers: AuthenticationService.getHeader() });
    // }

    // static updateAthleteClassification(athleteClassification, athleteClassificationId){
    //     return axios.put(ATHLETE_CLASSIFICATION_API_BASE_URL + '/' + athleteClassificationId, athleteClassification, { headers: AuthenticationService.getHeader() });
    // }

    // static deleteAthleteClassification(athleteClassificationId){
    //     return axios.delete(ATHLETE_CLASSIFICATION_API_BASE_URL + '/' + athleteClassificationId, { headers: AuthenticationService.getHeader() });
    // }
}
