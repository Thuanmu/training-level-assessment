import axios from 'axios';
import AuthenticationService from './authentication-service';

const ATHLETE_API_BASE_URL = "http://localhost:8080/api/athletes";

export default class AthleteService {

    static getAllAthletes(){
        return axios.get(ATHLETE_API_BASE_URL, { headers: AuthenticationService.getHeader() });
    }

    static getAllAthletesByCoachId(coachId){
        return axios.get(ATHLETE_API_BASE_URL + '/coachUser/' + coachId, { headers: AuthenticationService.getHeader() });
    }

    static getAllAthletesByAthleteCodeUsed(athleteCodeUsed){
        return axios.get(ATHLETE_API_BASE_URL + '/athleteUser/' + athleteCodeUsed, { headers: AuthenticationService.getHeader() });
    }

    static getAllAthletesByCoachIdAndPaging(params){
        return axios.get(ATHLETE_API_BASE_URL + '/coachUser', {params, headers: AuthenticationService.getHeader()});
    }

    static getAllAthletesByAthleteCodeUsedAndPaging(params){
        return axios.get(ATHLETE_API_BASE_URL + '/athleteUser', {params, headers: AuthenticationService.getHeader()});
    }
    
    static createAthlete(athlete){
        return axios.post(ATHLETE_API_BASE_URL, athlete, { headers: AuthenticationService.getHeader() });
    }

    static getAthleteById(athleteId){
        return axios.get(ATHLETE_API_BASE_URL + '/' + athleteId, { headers: AuthenticationService.getHeader() });
    }

    static getAthleteByAthleteCode(athleteCode) {
        return axios.get(ATHLETE_API_BASE_URL + '/' + athleteCode + '/code', { headers: AuthenticationService.getHeader() });
    }

    static updateAthlete(athlete, athleteId){
        return axios.put(ATHLETE_API_BASE_URL + '/' + athleteId, athlete, { headers: AuthenticationService.getHeader() });
    }

    static deleteAthlete(athleteId){
        return axios.delete(ATHLETE_API_BASE_URL + '/' + athleteId, { headers: AuthenticationService.getHeader() });
    }
}
