package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PhysicalFactor;

@Repository
public interface PhysicalFactorRepository extends JpaRepository<PhysicalFactor, Long> {
	
	@Query(value = "select p.* from physical_factor p join athlete a on p.athlete_id = a.id where a.coach_id = ?1 order by p.create_at desc", nativeQuery = true)
	List<PhysicalFactor> findAllByCoachId(Long coachId);
	
	@Query(value = "select p.* from physical_factor p join athlete a on p.athlete_id = a.id where a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by p.create_at desc", nativeQuery = true)
	List<PhysicalFactor> findAllByAthleteCodeUsed(String athleteCodeUsed);
	
	@Query(value = "select p.* from physical_factor p join athlete a on p.athlete_id = a.id where p.status = 0 and a.coach_id = ?1 order by p.athlete_id", nativeQuery = true)
	List<PhysicalFactor> findByStatusAndCoachId(Long coachId);
	
	@Query(value = "select p.* from physical_factor p join athlete a on p.athlete_id = a.id where p.status = 0 and a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1) order by p.athlete_id", nativeQuery = true)
	List<PhysicalFactor> findByStatusAndAthleteCodeUsed(String athleteCodeUsed);
	
	Optional<PhysicalFactor> findByPhysicalFactorCode(String physicalFactorCode);

}
