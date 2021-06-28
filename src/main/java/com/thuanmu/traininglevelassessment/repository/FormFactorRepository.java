package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.FormFactor;

/**
 * Spring Data JPA repository for the FormFactor entity.
 */
@Repository
public interface FormFactorRepository extends JpaRepository<FormFactor, Long> {
	
	@Query("select f from FormFactor f join Athlete a on f.athlete.id = a.id where a.user.id = ?1 order by f.createAt desc")
	Page<FormFactor> findAllByCoachId(Long coachId, Pageable pageable);
	
	@Query("select f from FormFactor f join Athlete a on f.athlete.id = a.id where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1) order by f.createAt desc")
	Page<FormFactor> findAllByAthleteCodeUsed(String athleteCodeUsed, Pageable pageable);
	
	@Query(value = "select f.* from form_factor f join athlete a on f.athlete_id = a.id where f.status = 0 and a.coach_id = ?1 order by f.athlete_id", nativeQuery = true)
	List<FormFactor> findByStatusAndCoachId(Long coachId);
	
	Optional<FormFactor> findByFormFactorCode(String formFactorCode);
	
	Boolean existsByAthleteId(Long athleteId);

}
