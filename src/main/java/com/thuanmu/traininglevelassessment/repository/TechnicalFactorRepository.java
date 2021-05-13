package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.TechnicalFactor;

@Repository
public interface TechnicalFactorRepository extends JpaRepository<TechnicalFactor, Long> {
	
	@Query(value = "select t.* from technical_factor t join athlete a on t.athlete_id = a.id where a.coach_id = ?1 order by t.create_at desc", nativeQuery = true)
	List<TechnicalFactor> findAllByCoachId(Long coachId);
	
	@Query(value = "select t.* from technical_factor t join athlete a on t.athlete_id = a.id where a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by t.create_at desc", nativeQuery = true)
	List<TechnicalFactor> findAllByAthleteCodeUsed(String athleteCodeUsed);
	
	@Query(value = "select t.* from technical_factor t join athlete a on t.athlete_id = a.id where t.status = 0 and a.coach_id = ?1 order by t.athlete_id", nativeQuery = true)
	List<TechnicalFactor> findByStatusAndCoachId(Long coachId);
	
	@Query(value = "select t.* from technical_factor t join athlete a on t.athlete_id = a.id where t.status = 0 and a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by t.athlete_id", nativeQuery = true)
	List<TechnicalFactor> findByStatusAndAthleteCodeUsed(String athleteCodeUsed);
	
	Optional<TechnicalFactor> findByTechnicalFactorCode(String technicalFactorCode);

}
