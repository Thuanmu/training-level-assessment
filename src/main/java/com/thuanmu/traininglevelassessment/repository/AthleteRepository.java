package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.Athlete;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
	
	@Query(value = "select a.* from athlete a where a.coach_id = ?1", nativeQuery = true)
	List<Athlete> findAllByCoachId(Long coachId);
	
	@Query(value = "select a.* from athlete a where a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1)", nativeQuery = true)
	List<Athlete> findAllByAthleteCodeUsed(String athleteCodeUsed);
	
	Optional<Athlete> findByAthleteCode(String athleteCode);

}
