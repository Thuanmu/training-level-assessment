import axios from 'axios';

const ATHLETE_CLASSIFICATION_API_BASE_URL = "http://localhost:8080/api/athleteClassifications";

export default class AthleteClassificationService {

    static getAllAthleteClassificationsByCoachId(coachId){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/coachUser/' + coachId);
    }
    
    static getAllAthleteClassificationsByAthleteCodeUsed(athleteCodeUsed){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/athleteUser/' + athleteCodeUsed);
    }

    static getAthleteClassificationsByMonthAndYearAndCoachId(params){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/coachUser', {params});
    }

    static getAthleteClassificationsByMonthAndYearAndAthleteCodeUsed(params){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/athleteUser', {params});
    }

    static getAthleteClassificationByAthleteCode(athleteCode) {
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/athlete/' + athleteCode);
    }

    // static getAthleteClassificationByLastDateOfMonth() {
    //     return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/lastDateOfMonth');
    // }

    static createAthleteClassification(athleteClassification){
        return axios.post(ATHLETE_CLASSIFICATION_API_BASE_URL, athleteClassification);
    }

    static getAthleteClassificationById(athleteClassificationId){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/' + athleteClassificationId);
    }

    static updateAthleteClassification(athleteClassification, athleteClassificationId){
        return axios.put(ATHLETE_CLASSIFICATION_API_BASE_URL + '/' + athleteClassificationId, athleteClassification);
    }

    static deleteAthleteClassification(athleteClassificationId){
        return axios.delete(ATHLETE_CLASSIFICATION_API_BASE_URL + '/' + athleteClassificationId);
    }
}
