package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.FormFactor;

@Repository
public interface FormFactorRepository extends JpaRepository<FormFactor, Long> {
	
	@Query(value = "select f.* from form_factor f join athlete a on f.athlete_id = a.id where a.coach_id = ?1 order by f.create_at desc", nativeQuery = true)
	List<FormFactor> findAllByCoachId(Long coachId);
	
	@Query(value = "select f.* from form_factor f join athlete a on f.athlete_id = a.id where a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by f.create_at desc", nativeQuery = true)
	List<FormFactor> findAllByAthleteCodeUsed(String athleteCodeUsed);
	
	@Query(value = "select f.* from form_factor f join athlete a on f.athlete_id = a.id where f.status = 0 and a.coach_id = ?1 order by f.athlete_id", nativeQuery = true)
	List<FormFactor> findByStatusAndCoachId(Long coachId);
	
	@Query(value = "select f.* from form_factor f join athlete a on f.athlete_id = a.id where f.status = 0 and a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by f.athlete_id", nativeQuery = true)
	List<FormFactor> findByStatusAndAthleteCodeUsed(String athleteCodeUsed);
	
	Optional<FormFactor> findByFormFactorCode(String formFactorCode);

}
