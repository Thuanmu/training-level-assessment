import axios from 'axios';

const ATHLETE_API_BASE_URL = "http://localhost:8080/api/athletes";

export default class AthleteService {

    static getAthletes(){
        return axios.get(ATHLETE_API_BASE_URL);
    }

    static createAthlete(athlete){
        return axios.post(ATHLETE_API_BASE_URL, athlete);
    }

    static getAthleteById(athleteId){
        return axios.get(ATHLETE_API_BASE_URL + '/' + athleteId);
    }

    static updateAthlete(athlete, athleteId){
        return axios.put(ATHLETE_API_BASE_URL + '/' + athleteId, athlete);
    }

    static deleteAthlete(athleteId){
        return axios.delete(ATHLETE_API_BASE_URL + '/' + athleteId);
    }
}
