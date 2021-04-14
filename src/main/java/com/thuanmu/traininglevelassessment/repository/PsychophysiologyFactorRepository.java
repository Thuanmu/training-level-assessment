package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PsychophysiologyFactor;

@Repository
public interface PsychophysiologyFactorRepository extends JpaRepository<PsychophysiologyFactor, Long> {
	
	List<PsychophysiologyFactor> findAllByOrderByCreateAtDesc();
	
	@Query(value = "select ps.* from psychophysiology_factor ps where ps.status = 0 order by ps.athlete_id", nativeQuery = true)
	List<PsychophysiologyFactor> findByStatus();
	
	Optional<PsychophysiologyFactor> findByPsychophysiologyFactorCode(String psychophysiologyFactorCode);
	
}
