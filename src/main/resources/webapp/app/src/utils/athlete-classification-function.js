export default class AthleteClassificationFunction{
    
    static getAverageValueOfOneCriteria(athletesList, criteriaIndex) {
		var sum = 0;
		let athletesCount = athletesList.length;
		for (var i = 0; i < athletesCount; i++) {
			sum += parseFloat(athletesList[i].criteriasList[criteriaIndex]);
		}
		
		return sum / athletesCount;
    }

    static getStandardDeviationOfOneCriteria(athletesList, criteriaIndex) {
		var averageValue = AthleteClassificationFunction.getAverageValueOfOneCriteria(athletesList, criteriaIndex);
		var sum = 0;
		let athletesCount = athletesList.length;
		for (var i = 0; i < athletesCount; i++) {
			sum += Math.pow(parseFloat(athletesList[i].criteriasList[criteriaIndex]) - averageValue, 2);
		}
		
		return Math.sqrt(sum / athletesCount);
    }
    
    static classifyTrainingLevel(athletesList) {
        
        for (let i = 0; i < athletesList.length; i++) {
            athletesList[i].totalScoresOfCriterias = 0;
        }

        const NUMBER_OF_SELECTED_CRITERIA = 18;
		for (var i = 0; i < NUMBER_OF_SELECTED_CRITERIA; i++) {
			for (var j = 0; j < athletesList.length; j++) {
                var Z = (parseFloat((athletesList[j].criteriasList[i])) - AthleteClassificationFunction.getAverageValueOfOneCriteria(athletesList, i)) / AthleteClassificationFunction.getStandardDeviationOfOneCriteria(athletesList, i);
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
		totalScoresOfCriteriasList.reverse();
		
		let rank = 1;
        for (let i = 0; i < totalScoresOfCriteriasList.length; i++) {
            for (let j = 0; j < athletesList.length; j++) {
                if (athletesList[j].totalScoresOfCriterias === totalScoresOfCriteriasList[i]) {
					if (rank === i) {
						rank += 1;
					}
                    athletesList[j].athleteRank = rank;
                }
            }
        }
	}
}