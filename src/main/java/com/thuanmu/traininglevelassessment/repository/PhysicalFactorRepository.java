package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PhysicalFactor;

/**
 * Spring Data JPA repository for the PhysicalFactor entity.
 */
@Repository
public interface PhysicalFactorRepository extends JpaRepository<PhysicalFactor, Long> {
	
	@Query("select p from PhysicalFactor p join Athlete a on p.athlete.id = a.id where a.user.id = ?1 order by p.createAt desc")
	Page<PhysicalFactor> findAllByCoachId(Long coachId, Pageable pageable);
	
	@Query("select p from PhysicalFactor p join Athlete a on p.athlete.id = a.id where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1) order by p.createAt desc")
	Page<PhysicalFactor> findAllByAthleteCodeUsed(String athleteCodeUsed, Pageable pageable);
	
	@Query(value = "select p.* from physical_factor p join athlete a on p.athlete_id = a.id where p.status = 0 and a.coach_id = ?1 order by p.athlete_id", nativeQuery = true)
	List<PhysicalFactor> findByStatusAndCoachId(Long coachId);
	
	Optional<PhysicalFactor> findByPhysicalFactorCode(String physicalFactorCode);
	
	Boolean existsByAthleteId(Long athleteId);

}
