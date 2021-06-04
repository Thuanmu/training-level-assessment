package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PsychophysiologyFactor;

@Repository
public interface PsychophysiologyFactorRepository extends JpaRepository<PsychophysiologyFactor, Long> {
	
//	@Query(value = "select ps.* from psychophysiology_factor ps join athlete a on ps.athlete_id = a.id where a.coach_id = ?1 order by ps.create_at desc", nativeQuery = true)
//	List<PsychophysiologyFactor> findAllByCoachId(Long coachId);
//	
//	@Query(value = "select ps.* from psychophysiology_factor ps join athlete a on ps.athlete_id = a.id where a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by ps.create_at desc", nativeQuery = true)
//	List<PsychophysiologyFactor> findAllByAthleteCodeUsed(String athleteCodeUsed);
	
	@Query("select ps from PsychophysiologyFactor ps join Athlete a on ps.athlete.id = a.id where a.user.id = ?1 order by ps.createAt desc")
	Page<PsychophysiologyFactor> findAllByCoachId(Long coachId, Pageable pageable);
	
	@Query("select ps from PsychophysiologyFactor ps join Athlete a on ps.athlete.id = a.id where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1) order by ps.createAt desc")
	Page<PsychophysiologyFactor> findAllByAthleteCodeUsed(String athleteCodeUsed, Pageable pageable);
	
	@Query(value = "select ps.* from psychophysiology_factor ps join athlete a on ps.athlete_id = a.id where ps.status = 0 and a.coach_id = ?1 order by ps.athlete_id", nativeQuery = true)
	List<PsychophysiologyFactor> findByStatusAndCoachId(Long coachId);
	
	@Query(value = "select ps.* from psychophysiology_factor ps join athlete a on ps.athlete_id = a.id where ps.status = 0 and a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by ps.athlete_id", nativeQuery = true)
	List<PsychophysiologyFactor> findByStatusAndAthleteCodeUsed(String athleteCodeUsed);
	
	Optional<PsychophysiologyFactor> findByPsychophysiologyFactorCode(String psychophysiologyFactorCode);
	
//	List<PsychophysiologyFactor> findByAthleteId(Long athleteId);
	
	Boolean existsByAthleteId(Long athleteId);
	
}
