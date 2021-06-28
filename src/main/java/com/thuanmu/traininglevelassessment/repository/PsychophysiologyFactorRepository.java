package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PsychophysiologyFactor;

/**
 * Spring Data JPA repository for the PsychophysiologyFactor entity.
 */
@Repository
public interface PsychophysiologyFactorRepository extends JpaRepository<PsychophysiologyFactor, Long> {
	
	@Query("select ps from PsychophysiologyFactor ps join Athlete a on ps.athlete.id = a.id where a.user.id = ?1 order by ps.createAt desc")
	Page<PsychophysiologyFactor> findAllByCoachId(Long coachId, Pageable pageable);
	
	@Query("select ps from PsychophysiologyFactor ps join Athlete a on ps.athlete.id = a.id where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1) order by ps.createAt desc")
	Page<PsychophysiologyFactor> findAllByAthleteCodeUsed(String athleteCodeUsed, Pageable pageable);
	
	@Query(value = "select ps.* from psychophysiology_factor ps join athlete a on ps.athlete_id = a.id where ps.status = 0 and a.coach_id = ?1 order by ps.athlete_id", nativeQuery = true)
	List<PsychophysiologyFactor> findByStatusAndCoachId(Long coachId);
	
	Optional<PsychophysiologyFactor> findByPsychophysiologyFactorCode(String psychophysiologyFactorCode);
	
	Boolean existsByAthleteId(Long athleteId);
	
}
