import axios from 'axios';

const ATHLETE_CLASSIFICATION_API_BASE_URL = "http://localhost:8080/api/athleteClassifications";

export default class AthleteClassificationService {

    static getAthleteClassifications(){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL);
    }

    static getAthleteClassificationByLastDateOfMonth() {
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/lastDateOfMonth');
    }

    static getRankingsByMonthAndYear(month, year){
        return axios.get(ATHLETE_CLASSIFICATION_API_BASE_URL + '/' + month + '/' + year);
    }

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
