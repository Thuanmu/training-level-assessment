package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.TechnicalFactor;

@Repository
public interface TechnicalFactorRepository extends JpaRepository<TechnicalFactor, Long> {
	
	List<TechnicalFactor> findAllByOrderByCreateAtDesc();
	
	@Query(value = "select t.* from technical_factor t where t.status = 0 order by t.athlete_id", nativeQuery = true)
	List<TechnicalFactor> findByStatus();
	
	Optional<TechnicalFactor> findByTechnicalFactorCode(String technicalFactorCode);

}
