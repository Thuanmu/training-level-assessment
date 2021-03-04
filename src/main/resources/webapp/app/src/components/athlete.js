export default class Athlete {
    
    constructor (id, name)  {
        // this.id = id;
        this.name = name;
        this.totalScoresOfCriterias = 0;
        this.grade = null;
        this.rank = null;
        this.criteriasList = [];
    }

    // get id() {
    //     return this.id;
    // }
 
    // set id(id) {
    //     this.id = id;
    // }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }


    get totalScoresOfCriterias() {
        return this.totalScoresOfCriterias;
    }

    set totalScoresOfCriterias(totalScoresOfCriterias) {
        this.totalScoresOfCriterias = totalScoresOfCriterias;
    }

    get grade() {
        return this.grade;
    }

    set grade(grade) {
        this.grade = grade;
    }

    get rank() {
        return this.rank;
    }

    set rank(rank) {
        this.rank = rank;
    }

    get criteriasList() {
        return this.criteriasList;
    }

    set criteriasList(criteriasList) {
        this.criteriasList = criteriasList;
    }

    static getAverageValueOfOneCriteria(athletesList, athletesCount, criteriaIndex) {
		var sum = 0;
		for (var i = 0; i < athletesCount.length; i++) {
			sum += parseFloat(athletesList[i].criteriasList[criteriaIndex]);
		}
		
		return sum / athletesCount;
    }

    static getStandardDeviationOfOneCriteria(athletesList, athletesCount, criteriaIndex) {
		var averageValue = Athlete.getAverageValueOfOneCriteria(athletesList, athletesCount, criteriaIndex);
		var sum = 0;
		for (var i = 0; i < athletesCount; i++) {
			sum += Math.pow(parseFloat(athletesList[i].criteriasList[criteriaIndex]) - averageValue, 2);
		}
		
		return Math.sqrt(sum / athletesCount);
    }
    
    static classifyTrainingLevel() {

        let newAthletesList = JSON.parse(localStorage.getItem("newAthletesList"));
        let athletesList = JSON.parse(localStorage.getItem("athletesList"));
        if (localStorage.getItem("athletesList") === null) {
            localStorage.setItem("athletesList", JSON.stringify(newAthletesList));
            athletesList = JSON.parse(localStorage.getItem("athletesList"));
        }
        // else {
        //     for (let i = 0; i < newAthletesList.length; i++) {
        //         athletesList = JSON.parse(localStorage.getItem("athletesList"));
        //         // if (athletesList.indexOf(newAthletesList[i].name) === -1) {
        //             athletesList.push(newAthletesList[i]);
        //         // }
        //     }
        // }
        else {
            for (let i = 0; i < newAthletesList.length; i++) {
                if (athletesList.indexOf(newAthletesList[i].name) === -1) {
                    athletesList.push(newAthletesList[i]);
                }
            }
        }

        for (let i = 0; i < athletesList.length; i++) {
            athletesList[i].totalScoresOfCriterias = 0;
        }

        const NUMBER_OF_SELECTED_CRITERIA = 18;
		for (var i = 0; i < NUMBER_OF_SELECTED_CRITERIA; i++) {
			for (var j = 0; j < athletesList.length; j++) {
                var Z = (parseFloat((athletesList[j].criteriasList[i])) - Athlete.getAverageValueOfOneCriteria(athletesList, athletesList.length, i)) / Athlete.getStandardDeviationOfOneCriteria(athletesList, athletesList.length, i);
				var C = 5 + 2 * Z;
                athletesList[j].totalScoresOfCriterias += C;
                athletesList[j].totalScoresOfCriterias = +athletesList[j].totalScoresOfCriterias.toFixed(2);
			}
		}
		
		for (let i = 0; i < athletesList.length; i++) {
			if (athletesList[i].totalScoresOfCriterias >= 0 && athletesList[i].totalScoresOfCriterias <= 36) {
				athletesList[i].grade = "Kém";
			}
			else if (athletesList[i].totalScoresOfCriterias <= 72) {
				athletesList[i].grade = "Yếu";
			}
			else if (athletesList[i].totalScoresOfCriterias <= 108) {
				athletesList[i].grade = "Trung bình";
			}
			else if (athletesList[i].totalScoresOfCriterias <= 144) {
				athletesList[i].grade = "Khá";
			}
			else if (athletesList[i].totalScoresOfCriterias <= 180) {
			 athletesList[i].grade = "Giỏi";
			}
        }

        let totalScoresOfCriteriasList = [];
        for (let i = 0; i < athletesList.length; i++) {
            totalScoresOfCriteriasList.push(athletesList[i].totalScoresOfCriterias);
        }
        totalScoresOfCriteriasList.sort();
        
        for (let i = totalScoresOfCriteriasList.length - 1; i >= 0; i--) {
            for (let j = 0; j < athletesList.length; j++) {
                if (athletesList[j].totalScoresOfCriterias === totalScoresOfCriteriasList[i]) {
                    athletesList[j].rank = totalScoresOfCriteriasList.length - i;
                }
            }
        }

        localStorage.setItem("athletesList", JSON.stringify(athletesList));
	}

 
}