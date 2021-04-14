package com.thuanmu.traininglevelassessment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PhysicalFactor;

@Repository
public interface PhysicalFactorRepository extends JpaRepository<PhysicalFactor, Long> {
	
	List<PhysicalFactor> findAllByOrderByCreateAtDesc();
	
	@Query(value = "select p.* from physical_factor p where p.status = 0 order by p.athlete_id", nativeQuery = true)
	List<PhysicalFactor> findByStatus();
	
	Optional<PhysicalFactor> findByPhysicalFactorCode(String physicalFactorCode);

}
