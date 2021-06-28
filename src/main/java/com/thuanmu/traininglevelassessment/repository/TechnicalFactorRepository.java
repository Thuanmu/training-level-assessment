package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.TechnicalFactor;

/**
 * Spring Data JPA repository for the TechnicalFactor entity.
 */
@Repository
public interface TechnicalFactorRepository extends JpaRepository<TechnicalFactor, Long> {
	
	@Query("select t from TechnicalFactor t join Athlete a on t.athlete.id = a.id where a.user.id = ?1 order by t.createAt desc")
	Page<TechnicalFactor> findAllByCoachId(Long coachId, Pageable pageable);
	
	@Query("select t from TechnicalFactor t join Athlete a on t.athlete.id = a.id where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1) order by t.createAt desc")
	Page<TechnicalFactor> findAllByAthleteCodeUsed(String athleteCodeUsed, Pageable pageable);
	
	@Query(value = "select t.* from technical_factor t join athlete a on t.athlete_id = a.id where t.status = 0 and a.coach_id = ?1 order by t.athlete_id", nativeQuery = true)
	List<TechnicalFactor> findByStatusAndCoachId(Long coachId);
	
	Optional<TechnicalFactor> findByTechnicalFactorCode(String technicalFactorCode);
	
	Boolean existsByAthleteId(Long athleteId);

}
