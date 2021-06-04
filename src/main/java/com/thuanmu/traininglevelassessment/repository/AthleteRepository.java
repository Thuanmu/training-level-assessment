package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.Athlete;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
	
//	@Query(value = "select a.* from athlete a where a.coach_id = ?1", nativeQuery = true)
//	Page<Athlete> findAllByCoachId(Long coachId, Pageable pageable);
//	
//	@Query(value = "select a.* from athlete a where a.coach_id = (select a.coach_id from athlete a where a.athlete_code = ?1)", nativeQuery = true)
//	Page<Athlete> findAllByAthleteCodeUsed(String athleteCodeUsed, Pageable pageable);
	
	List<Athlete> findAllByOrderByAthleteCode();
	
	@Query("select a from Athlete a where a.user.id = ?1")
	List<Athlete> findAllByCoachId(Long coachId);
	
	@Query("select a from Athlete a where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1)")
	List<Athlete> findAllByAthleteCodeUsed(String athleteCodeUsed);
	
	@Query("select a from Athlete a where a.user.id = ?1")
	Page<Athlete> findAllByCoachIdAndPaging(Long coachId, Pageable pageable);
	
	@Query("select a from Athlete a where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1)")
	Page<Athlete> findAllByAthleteCodeUsed(String athleteCodeUsed, Pageable pageable);
	
	@Query("select a from Athlete a where a.user.id = ?1 and a.athleteName like %?2%")
	Page<Athlete> findByCoachIdAndAthleteNameContaining(Long coachId, String athleteName, Pageable pageable);
	
	@Query("select a from Athlete a where a.user.id = (select a.user.id from Athlete a where a.athleteCode = ?1) and a.athleteName like %?2%")
	Page<Athlete> findByAthleteCodeUsedAndAthleteNameContaining(String athleteCodeUsed, String athleteName, Pageable pageable);
	
	Optional<Athlete> findByAthleteCode(String athleteCode);

}
