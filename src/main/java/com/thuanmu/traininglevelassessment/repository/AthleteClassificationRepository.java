package com.thuanmu.traininglevelassessment.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.AthleteClassification;

@Repository
public interface AthleteClassificationRepository extends JpaRepository<AthleteClassification, Long> {
	
	@Query(value = "select ac.* from athlete_classification ac join athlete a on ac.athlete_id = a.id where a.coach_id = ?1 group by ac.create_at order by ac.create_at desc", nativeQuery = true)
	List<AthleteClassification> findAllByCoachId(Long coachId);
	
	@Query(value = "select ac.* from athlete_classification ac join athlete a on ac.athlete_id = a.id where a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) group by ac.create_at order by ac.create_at desc", nativeQuery = true)
	List<AthleteClassification> findAllByAthleteCodeUsed(String athleteCodeUsed);
	
//	@Query(value = "select ac.* from athlete_classification ac join athlete a on ac.athlete_id = a.id where month(ac.create_at) = ?1 and year(ac.create_at) = ?2 and a.coach_id = ?3 order by ac.athlete_rank", nativeQuery = true)
//	List<AthleteClassification> findByMonthAndYearAndCoachId(int month, int year, Long coachId);
//	
//	@Query(value = "select ac.* from athlete_classification ac join athlete a on ac.athlete_id = a.id where month(ac.create_at) = ?1 and year(ac.create_at) = ?2 and a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?3) order by ac.athlete_rank", nativeQuery = true)
//	List<AthleteClassification> findByMonthAndYearAndAthleteCodeUsed(int month, int year, String athleteCodeUsed);
	
	@Query("select ac from AthleteClassification ac join Athlete a on ac.athlete.id = a.id where month(ac.createAt) = ?1 and year(ac.createAt) = ?2 and a.user.id = ?3 order by ac.athleteRank")
	Page<AthleteClassification> findByMonthAndYearAndCoachId(int month, int year, Long coachId, Pageable pageable);
	
	@Query("select ac from AthleteClassification ac join Athlete a on ac.athlete.id = a.id where month(ac.createAt) = ?1 and year(ac.createAt) = ?2 and a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?3) order by ac.athleteRank")
	Page<AthleteClassification> findByMonthAndYearAndAthleteCodeUsed(int month, int year, String athleteCodeUsed, Pageable pageable);	
	
	@Query(value = "select ac.* from athlete_classification ac join athlete a on ac.athlete_id = a.id where ac.athlete_id = (select a.id from athlete a where a.athlete_code = ?1) group by ac.create_at order by ac.create_at", nativeQuery = true)
	List<AthleteClassification> findByAthleteCode(String athleteCode);

}
